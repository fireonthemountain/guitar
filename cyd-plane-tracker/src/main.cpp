// Live plane radar for the ELEGOO CYD 2.8" ESP32-32E (E32R28T).
//
// Every REFRESH_SECONDS a background task asks adsb.fi for the aircraft within
// the current range of HOME_LAT/HOME_LON and the radar redraws with a rotating
// sweep. Tap a plane for its details, tap the range button to zoom.
//
// Display: ILI9341 on HSPI via TFT_eSPI. Touch: XPT2046 on its own VSPI bus.
// Touch calibration is shared with cyd-touch-demo (same NVS key), and can be
// redone by holding a finger on the splash screen.

#include <Arduino.h>
#include <ArduinoJson.h>
#include <HTTPClient.h>
#include <Preferences.h>
#include <SPI.h>
#include <TFT_eSPI.h>
#include <WiFi.h>
#include <WiFiClientSecure.h>
#include <XPT2046_Touchscreen.h>
#include <time.h>

#if __has_include("config.h")
#include "config.h"
#else
#error "Copy include/config.example.h to include/config.h and fill in your Wi-Fi and location"
#endif
#include "certs.h"

#if !defined(CYD_TOUCH_SCLK) || !defined(CYD_TOUCH_CS) || !defined(CYD_ROTATION)
#error "Board pins are defined in platformio.ini build_flags"
#endif

TFT_eSPI tft;
TFT_eSprite radar(&tft);
SPIClass touchSpi(VSPI);
XPT2046_Touchscreen ts(CYD_TOUCH_CS, CYD_TOUCH_IRQ);
Preferences prefs;

// ------------------------------------------------------------ plane data ---

constexpr int32_t kOnGround = INT32_MIN;
constexpr int32_t kAltUnknown = INT32_MIN + 1;
constexpr int kMaxPlanes = 80;

struct Plane {
  char hex[7];
  char callsign[9];
  char reg[11];
  char type[5];
  int32_t altFt;     // or kOnGround / kAltUnknown
  int16_t speedKt;
  int16_t trackDeg;  // -1 when unknown
  int16_t climbFpm;
  float distNm;
  float bearingDeg;
};

// Written by the fetch task, read by the UI; guarded by dataLock.
SemaphoreHandle_t dataLock;
Plane sharedPlanes[kMaxPlanes];
int sharedCount = 0;
uint32_t sharedUpdatedMs = 0;  // millis() of the last good fetch, 0 = never
char sharedStatus[24] = "Starting";

constexpr int kRanges[] = {5, 10, 25, 50};
constexpr int kRangeCount = sizeof(kRanges) / sizeof(kRanges[0]);
volatile int rangeNm = DEFAULT_RANGE_NM;
volatile bool fetchNow = false;

void setStatus(const char *fmt, ...) {
  char buf[sizeof(sharedStatus)];
  va_list args;
  va_start(args, fmt);
  vsnprintf(buf, sizeof(buf), fmt, args);
  va_end(args);
  xSemaphoreTake(dataLock, portMAX_DELAY);
  strcpy(sharedStatus, buf);
  xSemaphoreGive(dataLock);
}

void copyTrimmed(char *dst, size_t size, const char *src) {
  while (*src == ' ') src++;
  strlcpy(dst, src, size);
  for (int i = strlen(dst) - 1; i >= 0 && dst[i] == ' '; i--) dst[i] = '\0';
}

// Fills p from one adsb.fi aircraft object. Returns false if it has no position.
bool parsePlane(JsonDocument &doc, Plane &p) {
  float dist = doc["dst"] | NAN;
  float bearing = doc["dir"] | NAN;
  if (isnan(dist) || isnan(bearing)) {
    // Older responses lack dst/dir: work them out from lat/lon instead.
    float lat = doc["lat"] | NAN, lon = doc["lon"] | NAN;
    if (isnan(lat) || isnan(lon)) return false;
    float dyNm = (lat - HOME_LAT) * 60.0f;
    float dxNm = (lon - HOME_LON) * 60.0f * cosf(HOME_LAT * DEG_TO_RAD);
    dist = sqrtf(dxNm * dxNm + dyNm * dyNm);
    bearing = fmodf(atan2f(dxNm, dyNm) * RAD_TO_DEG + 360.0f, 360.0f);
  }

  copyTrimmed(p.hex, sizeof(p.hex), doc["hex"] | "");
  copyTrimmed(p.callsign, sizeof(p.callsign), doc["flight"] | "");
  copyTrimmed(p.reg, sizeof(p.reg), doc["r"] | "");
  copyTrimmed(p.type, sizeof(p.type), doc["t"] | "");
  if (!p.callsign[0]) strlcpy(p.callsign, p.reg[0] ? p.reg : p.hex, sizeof(p.callsign));

  if (doc["alt_baro"].is<const char *>()) {
    p.altFt = kOnGround;  // the API sends the string "ground"
  } else {
    float alt = doc["alt_baro"] | (doc["alt_geom"] | NAN);
    p.altFt = isnan(alt) ? kAltUnknown : int32_t(alt);
  }
  p.speedKt = int16_t(doc["gs"] | 0.0f);
  p.trackDeg = int16_t(doc["track"] | (doc["true_heading"] | -1.0f));
  p.climbFpm = int16_t(doc["baro_rate"] | (doc["geom_rate"] | 0));
  p.distNm = dist;
  p.bearingDeg = bearing;
  return true;
}

// Adds p, keeping only the kMaxPlanes closest.
void insertClosest(Plane *list, int &count, const Plane &p) {
  if (count < kMaxPlanes) {
    list[count++] = p;
    return;
  }
  int far = 0;
  for (int i = 1; i < count; i++)
    if (list[i].distNm > list[far].distNm) far = i;
  if (p.distNm < list[far].distNm) list[far] = p;
}

void fetchOnce(WiFiClientSecure &client) {
  static Plane incoming[kMaxPlanes];
  const int range = rangeNm;
  char url[112];
  snprintf(url, sizeof(url), "https://opendata.adsb.fi/api/v2/lat/%.4f/lon/%.4f/dist/%d",
           HOME_LAT, HOME_LON, range);

  uint32_t start = millis();
  HTTPClient http;
  http.useHTTP10(true);  // no chunked encoding, so the body can be parsed as it streams in
  http.setTimeout(10000);
  http.setUserAgent("cyd-plane-tracker/1.0");
  if (!http.begin(client, url)) {
    setStatus("Bad URL");
    return;
  }
  int code = http.GET();
  if (code != HTTP_CODE_OK) {
    if (code < 0) setStatus("%s", http.errorToString(code).c_str());
    else setStatus("HTTP %d", code);
    Serial.printf("Fetch failed: %d %s\n", code, http.errorToString(code).c_str());
    http.end();
    return;
  }

  // Parse one aircraft object at a time, so memory use doesn't grow with traffic.
  JsonDocument filter;
  for (const char *key : {"hex", "flight", "r", "t", "alt_baro", "alt_geom", "gs", "track",
                          "true_heading", "baro_rate", "geom_rate", "lat", "lon", "dst", "dir"})
    filter[key] = true;

  Stream &body = http.getStream();
  int count = 0;
  bool ok = body.find("\"aircraft\":[");
  if (ok) {
    JsonDocument doc;
    do {
      DeserializationError err = deserializeJson(doc, body, DeserializationOption::Filter(filter));
      if (err == DeserializationError::IncompleteInput) ok = false;  // timed out mid-object
      // With a filter, the "]" of an empty list parses as Ok + null, so stop at any non-object.
      if (err || !doc.is<JsonObject>()) break;
      Plane p;
      if (parsePlane(doc, p)) insertClosest(incoming, count, p);
    } while (body.findUntil(",", "]"));
  }
  http.end();

  if (!ok) {
    setStatus("Bad response");
    return;
  }
  if (range != rangeNm) return;  // range changed mid-fetch; the next fetch replaces this

  xSemaphoreTake(dataLock, portMAX_DELAY);
  memcpy(sharedPlanes, incoming, sizeof(Plane) * count);
  sharedCount = count;
  sharedUpdatedMs = millis();
  strcpy(sharedStatus, "OK");
  xSemaphoreGive(dataLock);
  Serial.printf("Fetched %d planes within %d nm in %lu ms, free heap %u\n", count, range,
                (unsigned long)(millis() - start), ESP.getFreeHeap());
}

// Runs on core 0 so network waits never stall the animation.
void fetchTask(void *) {
  WiFiClientSecure client;
  client.setCACert(kAdsbFiRootCAs);

  // TLS checks certificate dates, so wait (briefly) for the clock to be set.
  for (int i = 0; i < 100 && time(nullptr) < 1700000000; i++) vTaskDelay(pdMS_TO_TICKS(100));

  for (;;) {
    if (WiFi.status() == WL_CONNECTED) {
      fetchOnce(client);
    } else {
      setStatus("No Wi-Fi");
    }
    uint32_t start = millis();
    while (millis() - start < REFRESH_SECONDS * 1000UL && !fetchNow) vTaskDelay(pdMS_TO_TICKS(50));
    fetchNow = false;
  }
}

// ---------------------------------------------------------------- touch ---

struct TouchCal {
  int16_t xMin = 300, xMax = 3800, yMin = 300, yMax = 3800;
};
TouchCal cal;

bool readTouch(int16_t &sx, int16_t &sy) {
  if (!ts.touched()) return false;
  TS_Point p = ts.getPoint();
  sx = constrain(map(p.x, cal.xMin, cal.xMax, 0, tft.width() - 1), 0, tft.width() - 1);
  sy = constrain(map(p.y, cal.yMin, cal.yMax, 0, tft.height() - 1), 0, tft.height() - 1);
  return true;
}

void waitForRelease() {
  while (ts.touched()) delay(10);
  delay(50);
}

TS_Point sampleRaw() {
  while (!ts.touched()) delay(10);
  delay(100);
  long sx = 0, sy = 0;
  int n = 0;
  while (ts.touched() && n < 32) {
    TS_Point p = ts.getPoint();
    sx += p.x;
    sy += p.y;
    n++;
    delay(10);
  }
  waitForRelease();
  if (n == 0) return TS_Point(0, 0, 0);
  return TS_Point(sx / n, sy / n, 0);
}

void drawCross(int16_t x, int16_t y, uint16_t color) {
  tft.drawLine(x - 12, y, x + 12, y, color);
  tft.drawLine(x, y - 12, x, y + 12, color);
  tft.drawCircle(x, y, 6, color);
}

void calibrateTouch() {
  const int16_t m = 20;
  const int16_t w = tft.width(), h = tft.height();
  tft.fillScreen(TFT_BLACK);
  tft.setTextColor(TFT_WHITE, TFT_BLACK);
  tft.setTextDatum(MC_DATUM);
  tft.drawString("Touch calibration", w / 2, h / 2 - 12, 4);
  tft.drawString("Tap and hold each cross", w / 2, h / 2 + 16, 2);

  drawCross(m, m, TFT_YELLOW);
  TS_Point a = sampleRaw();
  drawCross(m, m, TFT_BLACK);
  drawCross(w - 1 - m, h - 1 - m, TFT_YELLOW);
  TS_Point b = sampleRaw();

  float xPerPx = float(b.x - a.x) / float(w - 1 - 2 * m);
  float yPerPx = float(b.y - a.y) / float(h - 1 - 2 * m);
  cal.xMin = a.x - xPerPx * m;
  cal.xMax = b.x + xPerPx * m;
  cal.yMin = a.y - yPerPx * m;
  cal.yMax = b.y + yPerPx * m;
  prefs.putBytes("cal", &cal, sizeof(cal));
  Serial.printf("Calibration saved: xMin=%d xMax=%d yMin=%d yMax=%d\n", cal.xMin, cal.xMax,
                cal.yMin, cal.yMax);
}

// ---------------------------------------------------------------- radar ---

constexpr int16_t kRadarSize = 240;  // left square of the 320x240 screen
constexpr int16_t kCx = kRadarSize / 2, kCy = kRadarSize / 2, kRadius = 112;
constexpr int16_t kPanelX = kRadarSize, kPanelW = 320 - kRadarSize;
constexpr uint16_t kRingColor = 0x0320;   // dark green
constexpr uint16_t kSweepColor = 0x07E0;  // bright green

Plane planes[kMaxPlanes];  // UI's copy of sharedPlanes
int planeCount = 0;
char selectedHex[7] = "";
float sweepDeg = 0;

uint16_t altColor(int32_t alt) {
  if (alt == kOnGround) return TFT_DARKGREY;
  if (alt == kAltUnknown || alt < 5000) return TFT_YELLOW;
  if (alt < 20000) return TFT_GREEN;
  return TFT_CYAN;
}

void planeXY(const Plane &p, int16_t &x, int16_t &y) {
  float r = p.distNm / rangeNm * kRadius;
  float b = p.bearingDeg * DEG_TO_RAD;
  x = kCx + int16_t(r * sinf(b));
  y = kCy - int16_t(r * cosf(b));
}

void formatRange(char *buf, size_t size, float nm) {
  if (nm == int(nm)) snprintf(buf, size, "%d", int(nm));
  else snprintf(buf, size, "%.1f", nm);
}

void drawRadar() {
  radar.fillSprite(TFT_BLACK);

  for (int i = 1; i <= 4; i++) radar.drawCircle(kCx, kCy, kRadius * i / 4, kRingColor);
  radar.drawFastHLine(kCx - kRadius, kCy, 2 * kRadius, kRingColor);
  radar.drawFastVLine(kCx, kCy - kRadius, 2 * kRadius, kRingColor);

  radar.setTextColor(kRingColor);
  radar.setTextDatum(BL_DATUM);
  char buf[8];
  formatRange(buf, sizeof(buf), rangeNm / 2.0f);
  radar.drawString(buf, kCx + 7, kCy - kRadius / 2, 1);
  formatRange(buf, sizeof(buf), rangeNm);
  radar.drawString(buf, kCx + 7, kCy - kRadius, 1);

  radar.setTextColor(TFT_DARKGREEN);
  radar.setTextDatum(MC_DATUM);
  radar.drawString("N", kCx, kCy - kRadius - 4, 1);
  radar.drawString("S", kCx, kCy + kRadius + 4, 1);
  radar.drawString("E", kCx + kRadius + 4, kCy, 1);
  radar.drawString("W", kCx - kRadius - 4, kCy, 1);

  // Sweep with a fading tail.
  for (int t = 0; t < 4; t++) {
    float a = (sweepDeg - t * 4) * DEG_TO_RAD;
    uint8_t g = 63 - t * 14;  // green channel of RGB565
    radar.drawLine(kCx, kCy, kCx + kRadius * sinf(a), kCy - kRadius * cosf(a), g << 5);
  }

  radar.drawFastHLine(kCx - 3, kCy, 7, TFT_WHITE);
  radar.drawFastVLine(kCx, kCy - 3, 7, TFT_WHITE);

  const bool labelAll = planeCount <= 20;
  for (int i = 0; i < planeCount; i++) {
    const Plane &p = planes[i];
    if (p.distNm > rangeNm) continue;
    int16_t x, y;
    planeXY(p, x, y);

    // Blips flash white just after the sweep passes over them.
    float behind = fmodf(sweepDeg - p.bearingDeg + 360.0f, 360.0f);
    uint16_t color = behind < 25 ? TFT_WHITE : altColor(p.altFt);

    if (p.altFt == kOnGround || p.trackDeg < 0) {
      radar.fillCircle(x, y, 2, color);
    } else {
      float t = p.trackDeg * DEG_TO_RAD;
      float l = t + 2.5f, r = t - 2.5f;  // back corners, about 143 degrees off the nose
      radar.fillTriangle(x + 7 * sinf(t), y - 7 * cosf(t), x + 5 * sinf(l), y - 5 * cosf(l),
                         x + 5 * sinf(r), y - 5 * cosf(r), color);
    }

    bool selected = selectedHex[0] && strcmp(p.hex, selectedHex) == 0;
    if (selected) radar.drawCircle(x, y, 10, TFT_WHITE);
    if (selected || (labelAll && p.altFt != kOnGround)) {
      radar.setTextColor(selected ? TFT_WHITE : altColor(p.altFt));
      radar.setTextDatum(ML_DATUM);
      radar.drawString(p.callsign, x + 8, y - 6, 1);
    }
  }

  radar.pushSprite(0, 0);
}

// ---------------------------------------------------------------- panel ---

constexpr int16_t kRangeBtnY = 56, kRangeBtnH = 30;

void panelLine(const char *text, int16_t y, uint8_t font, uint16_t color) {
  tft.setTextColor(color, TFT_BLACK);
  tft.setTextDatum(TL_DATUM);
  tft.setTextPadding(kPanelW - 6);  // overwrite the old text without clearing (no flicker)
  tft.drawString(text, kPanelX + 4, y, font);
}

// The plane to describe: the selected one, else the nearest airborne one.
const Plane *featuredPlane(bool &isSelected) {
  isSelected = false;
  const Plane *best = nullptr;
  for (int i = 0; i < planeCount; i++) {
    const Plane &p = planes[i];
    if (selectedHex[0] && strcmp(p.hex, selectedHex) == 0) {
      isSelected = true;
      return &p;
    }
    if (p.altFt != kOnGround && p.distNm <= rangeNm && (!best || p.distNm < best->distNm))
      best = &p;
  }
  return best;
}

void drawPanel(const char *status, uint32_t updatedMs) {
  char buf[24];

  struct tm now;
  if (time(nullptr) > 1700000000 && getLocalTime(&now, 0)) strftime(buf, sizeof(buf), "%H:%M", &now);
  else strcpy(buf, "--:--");
  panelLine(buf, 4, 4, TFT_WHITE);

  int inRange = 0;
  for (int i = 0; i < planeCount; i++)
    if (planes[i].distNm <= rangeNm) inRange++;
  snprintf(buf, sizeof(buf), "%d plane%s", inRange, inRange == 1 ? "" : "s");
  panelLine(buf, 34, 2, TFT_LIGHTGREY);

  tft.setTextPadding(0);
  tft.fillRoundRect(kPanelX + 4, kRangeBtnY, kPanelW - 8, kRangeBtnH, 6, TFT_DARKGREEN);
  tft.setTextColor(TFT_WHITE, TFT_DARKGREEN);
  tft.setTextDatum(MC_DATUM);
  snprintf(buf, sizeof(buf), "%d nm", (int)rangeNm);
  tft.drawString(buf, kPanelX + kPanelW / 2, kRangeBtnY + kRangeBtnH / 2, 2);

  bool isSelected;
  const Plane *p = featuredPlane(isSelected);
  int16_t y = 94;
  panelLine(p ? (isSelected ? "SELECTED" : "NEAREST") : "", y, 1, TFT_DARKGREY);
  y += 10;
  if (p) {
    panelLine(p->callsign, y, 2, TFT_WHITE);
    snprintf(buf, sizeof(buf), "%s", p->type[0] ? p->type : "?");
    panelLine(buf, y += 16, 2, TFT_LIGHTGREY);
    if (p->altFt == kOnGround) strcpy(buf, "ground");
    else if (p->altFt == kAltUnknown) strcpy(buf, "alt ?");
    else snprintf(buf, sizeof(buf), "%ldft%s", (long)p->altFt,
                  p->climbFpm > 300 ? " ^" : p->climbFpm < -300 ? " v" : "");
    panelLine(buf, y += 16, 2, altColor(p->altFt));
    snprintf(buf, sizeof(buf), "%dkt", p->speedKt);
    panelLine(buf, y += 16, 2, TFT_LIGHTGREY);
    if (p->trackDeg >= 0) snprintf(buf, sizeof(buf), "hdg %d", p->trackDeg);
    else buf[0] = '\0';
    panelLine(buf, y += 16, 2, TFT_LIGHTGREY);
    snprintf(buf, sizeof(buf), "%.1fnm", p->distNm);
    panelLine(buf, y += 16, 2, TFT_LIGHTGREY);
  } else {
    for (int i = 0; i < 6; i++) panelLine("", y + i * 16, 2, TFT_BLACK);
  }

  if (strcmp(status, "OK") == 0 && updatedMs) {
    snprintf(buf, sizeof(buf), "updated %lus", (unsigned long)((millis() - updatedMs) / 1000));
    panelLine(buf, 212, 1, TFT_DARKGREY);
  } else {
    panelLine(status, 212, 1, TFT_ORANGE);
  }
  panelLine("data: adsb.fi", 226, 1, TFT_DARKGREY);
}

// ---------------------------------------------------------------- setup ---

void splash(const char *line1, const char *line2) {
  tft.fillScreen(TFT_BLACK);
  tft.setTextPadding(0);
  tft.setTextColor(TFT_GREEN, TFT_BLACK);
  tft.setTextDatum(MC_DATUM);
  tft.drawString(line1, tft.width() / 2, tft.height() / 2 - 14, 4);
  tft.setTextColor(TFT_LIGHTGREY, TFT_BLACK);
  tft.drawString(line2, tft.width() / 2, tft.height() / 2 + 18, 2);
}

void setup() {
  Serial.begin(115200);
  delay(200);
  Serial.println("\n=== CYD plane tracker ===");

  dataLock = xSemaphoreCreateMutex();
  for (int r : kRanges)
    if (r <= DEFAULT_RANGE_NM) rangeNm = r;

  tft.init();
  tft.setRotation(CYD_ROTATION);
  touchSpi.begin(CYD_TOUCH_SCLK, CYD_TOUCH_MISO, CYD_TOUCH_MOSI, CYD_TOUCH_CS);
  ts.begin(touchSpi);
  ts.setRotation(CYD_ROTATION);

  prefs.begin("cyd-demo", false);  // same calibration as cyd-touch-demo
  if (prefs.getBytesLength("cal") == sizeof(cal)) prefs.getBytes("cal", &cal, sizeof(cal));

  splash("Plane Tracker", "Hold screen now to calibrate touch");
  uint32_t start = millis();
  while (millis() - start < 2000) {
    if (ts.touched()) {
      waitForRelease();
      calibrateTouch();
      break;
    }
    delay(20);
  }

  radar.setColorDepth(8);  // 8-bit sprite: 57 KB instead of 115 KB, leaves room for TLS
  if (!radar.createSprite(kRadarSize, kRadarSize)) {
    splash("Out of memory", "Could not allocate the radar buffer");
    Serial.println("createSprite failed");
    for (;;) delay(1000);
  }

  splash("Connecting", WIFI_SSID);
  WiFi.mode(WIFI_STA);
  WiFi.setAutoReconnect(true);
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  start = millis();
  while (WiFi.status() != WL_CONNECTED && millis() - start < 20000) delay(250);
  if (WiFi.status() == WL_CONNECTED) {
    Serial.printf("Wi-Fi connected, IP %s\n", WiFi.localIP().toString().c_str());
  } else {
    Serial.println("Wi-Fi not connected yet; will keep trying");
  }
  configTzTime(TIMEZONE, "pool.ntp.org", "time.nist.gov");

  tft.fillScreen(TFT_BLACK);
  xTaskCreatePinnedToCore(fetchTask, "fetch", 12288, nullptr, 1, nullptr, 0);
}

// ------------------------------------------------------------------ loop ---

void handleTap(int16_t x, int16_t y) {
  if (x >= kPanelX) {
    if (y >= kRangeBtnY && y < kRangeBtnY + kRangeBtnH) {
      int next = 0;
      for (int i = 0; i < kRangeCount; i++)
        if (kRanges[i] == rangeNm) next = (i + 1) % kRangeCount;
      rangeNm = kRanges[next];
      fetchNow = true;
      Serial.printf("Range -> %d nm\n", (int)rangeNm);
    }
    return;
  }

  // Select the plane nearest the tap, if one is close enough to the finger.
  int best = -1;
  int32_t bestD2 = 18 * 18;
  for (int i = 0; i < planeCount; i++) {
    if (planes[i].distNm > rangeNm) continue;
    int16_t px, py;
    planeXY(planes[i], px, py);
    int32_t d2 = int32_t(px - x) * (px - x) + int32_t(py - y) * (py - y);
    if (d2 < bestD2) {
      bestD2 = d2;
      best = i;
    }
  }
  if (best >= 0) {
    strlcpy(selectedHex, planes[best].hex, sizeof(selectedHex));
    Serial.printf("Selected %s (%s)\n", planes[best].callsign, planes[best].hex);
  } else {
    selectedHex[0] = '\0';
  }
}

void loop() {
  static bool wasTouched = false;
  static uint32_t lastPanelMs = 0;
  static uint32_t seenUpdateMs = 0;
  static int seenRange = 0;

  char status[sizeof(sharedStatus)];
  uint32_t updatedMs;
  xSemaphoreTake(dataLock, portMAX_DELAY);
  bool fresh = sharedUpdatedMs != seenUpdateMs;
  if (fresh) {
    memcpy(planes, sharedPlanes, sizeof(Plane) * sharedCount);
    planeCount = sharedCount;
    seenUpdateMs = sharedUpdatedMs;
  }
  strcpy(status, sharedStatus);
  updatedMs = sharedUpdatedMs;
  xSemaphoreGive(dataLock);

  int16_t x, y;
  bool touched = readTouch(x, y);
  bool tapped = touched && !wasTouched;
  wasTouched = touched;
  if (tapped) handleTap(x, y);

  sweepDeg = fmodf(sweepDeg + 6.0f, 360.0f);
  drawRadar();

  if (fresh || tapped || rangeNm != seenRange || millis() - lastPanelMs > 1000) {
    seenRange = rangeNm;
    lastPanelMs = millis();
    drawPanel(status, updatedMs);
  }

  delay(20);
}
