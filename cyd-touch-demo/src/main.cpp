// Three-button background colour demo for the ELEGOO CYD 2.8" ESP32-32E (E32R28T).
//
// Display: ILI9341 on HSPI via TFT_eSPI (pins set in platformio.ini).
// Touch:   XPT2046 on its own VSPI bus via XPT2046_Touchscreen.
//
// Touch calibration: hold a finger on the screen while the splash screen is
// showing to run a 2-point calibration. The result is saved to flash (NVS).

#include <Arduino.h>
#include <Preferences.h>
#include <SPI.h>
#include <TFT_eSPI.h>
#include <XPT2046_Touchscreen.h>

#if !defined(CYD_TOUCH_SCLK) || !defined(CYD_TOUCH_CS) || !defined(CYD_ROTATION)
#error "Board pins are defined in platformio.ini build_flags"
#endif

TFT_eSPI tft;
SPIClass touchSpi(VSPI);
XPT2046_Touchscreen ts(CYD_TOUCH_CS, CYD_TOUCH_IRQ);
Preferences prefs;

// Raw XPT2046 readings at the screen edges. Typical CYD values; the
// calibration routine replaces them with measurements from your panel.
struct TouchCal {
  int16_t xMin = 300, xMax = 3800, yMin = 300, yMax = 3800;
};
TouchCal cal;

struct Button {
  int16_t x, y, w, h;
  uint16_t color;
  const char *label;
};

constexpr int kButtonCount = 3;
Button buttons[kButtonCount];
uint16_t background = TFT_BLACK;

// ---------------------------------------------------------------- touch ---

// Returns true and fills screen coordinates while the panel is pressed.
bool readTouch(int16_t &sx, int16_t &sy, TS_Point *rawOut = nullptr) {
  if (!ts.touched()) return false;
  TS_Point p = ts.getPoint();
  if (rawOut) *rawOut = p;
  sx = constrain(map(p.x, cal.xMin, cal.xMax, 0, tft.width() - 1), 0, tft.width() - 1);
  sy = constrain(map(p.y, cal.yMin, cal.yMax, 0, tft.height() - 1), 0, tft.height() - 1);
  return true;
}

void waitForRelease() {
  while (ts.touched()) delay(10);
  delay(50);
}

// Averages raw readings while a target is held down.
TS_Point sampleRaw() {
  while (!ts.touched()) delay(10);
  delay(100);  // let the finger settle
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
  const int16_t m = 20;  // target inset from the screen edge
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
  drawCross(w - 1 - m, h - 1 - m, TFT_BLACK);

  // Extrapolate from the inset targets out to the screen edges.
  float xPerPx = float(b.x - a.x) / float(w - 1 - 2 * m);
  float yPerPx = float(b.y - a.y) / float(h - 1 - 2 * m);
  cal.xMin = a.x - xPerPx * m;
  cal.xMax = b.x + xPerPx * m;
  cal.yMin = a.y - yPerPx * m;
  cal.yMax = b.y + yPerPx * m;

  prefs.putBytes("cal", &cal, sizeof(cal));
  Serial.printf("Calibration saved: xMin=%d xMax=%d yMin=%d yMax=%d\n",
                cal.xMin, cal.xMax, cal.yMin, cal.yMax);
}

// -------------------------------------------------------------------- UI ---

void layoutButtons() {
  const int16_t margin = 16, gap = 12, top = 44;
  const int16_t w = tft.width() - 2 * margin;
  const int16_t h = (tft.height() - top - margin - 2 * gap) / kButtonCount;
  const uint16_t colors[kButtonCount] = {TFT_RED, TFT_DARKGREEN, TFT_BLUE};
  const char *labels[kButtonCount] = {"RED", "GREEN", "BLUE"};
  for (int i = 0; i < kButtonCount; i++) {
    buttons[i] = {margin, int16_t(top + i * (h + gap)), w, h, colors[i], labels[i]};
  }
}

void drawButton(const Button &b, bool pressed) {
  uint16_t fill = pressed ? TFT_WHITE : b.color;
  uint16_t text = pressed ? b.color : TFT_WHITE;
  tft.fillRoundRect(b.x, b.y, b.w, b.h, 12, fill);
  tft.drawRoundRect(b.x, b.y, b.w, b.h, 12, TFT_WHITE);
  tft.setTextColor(text, fill);
  tft.setTextDatum(MC_DATUM);
  tft.drawString(b.label, b.x + b.w / 2, b.y + b.h / 2, 4);
}

void drawScreen() {
  tft.fillScreen(background);
  uint16_t titleColor = background == TFT_BLACK ? TFT_WHITE : TFT_BLACK;
  tft.setTextColor(titleColor, background);
  tft.setTextDatum(TC_DATUM);
  tft.drawString("Tap a button", tft.width() / 2, 12, 4);
  for (const Button &b : buttons) drawButton(b, false);
}

int hitTest(int16_t x, int16_t y) {
  for (int i = 0; i < kButtonCount; i++) {
    const Button &b = buttons[i];
    if (x >= b.x && x < b.x + b.w && y >= b.y && y < b.y + b.h) return i;
  }
  return -1;
}

// Pastel backgrounds keep the black title and white button borders readable.
uint16_t backgroundFor(int i) {
  switch (i) {
    case 0: return tft.color565(255, 120, 120);
    case 1: return tft.color565(120, 220, 120);
    default: return tft.color565(120, 150, 255);
  }
}

// ----------------------------------------------------------------- setup ---

void printBoardInfo() {
  Serial.println();
  Serial.println("=== ELEGOO CYD 2.8\" ESP32-32E touch demo ===");
  Serial.printf("Chip: %s rev %d, %d cores, %lu MHz\n", ESP.getChipModel(),
                ESP.getChipRevision(), ESP.getChipCores(), (unsigned long)ESP.getCpuFreqMHz());
  Serial.printf("Flash: %lu bytes (expect 4194304)\n", (unsigned long)ESP.getFlashChipSize());
  Serial.printf("LCD   SCLK=%d MOSI=%d MISO=%d CS=%d DC=%d RST=%d BL=%d\n",
                TFT_SCLK, TFT_MOSI, TFT_MISO, TFT_CS, TFT_DC, TFT_RST, TFT_BL);
  Serial.printf("Touch SCLK=%d MOSI=%d MISO=%d CS=%d IRQ=%d\n", CYD_TOUCH_SCLK,
                CYD_TOUCH_MOSI, CYD_TOUCH_MISO, CYD_TOUCH_CS, CYD_TOUCH_IRQ);
}

// Solid R/G/B/W/K frames: a quick check of driver, colour order and inversion.
void colorSelfTest() {
  const uint16_t frames[] = {TFT_RED, TFT_GREEN, TFT_BLUE, TFT_WHITE, TFT_BLACK};
  const char *names[] = {"RED", "GREEN", "BLUE", "WHITE", "BLACK"};
  for (int i = 0; i < 5; i++) {
    tft.fillScreen(frames[i]);
    Serial.printf("Self-test: screen should be %s\n", names[i]);
    delay(400);
  }
}

void setup() {
  Serial.begin(115200);
  delay(200);
  printBoardInfo();

  tft.init();  // also switches the TFT_BL backlight on
  tft.setRotation(CYD_ROTATION);
  colorSelfTest();

  touchSpi.begin(CYD_TOUCH_SCLK, CYD_TOUCH_MISO, CYD_TOUCH_MOSI, CYD_TOUCH_CS);
  ts.begin(touchSpi);
  ts.setRotation(CYD_ROTATION);

  prefs.begin("cyd-demo", false);
  if (prefs.getBytesLength("cal") == sizeof(cal)) {
    prefs.getBytes("cal", &cal, sizeof(cal));
    Serial.println("Loaded saved touch calibration");
  }

  // Splash: hold a finger down here to (re)calibrate.
  tft.fillScreen(TFT_BLACK);
  tft.setTextColor(TFT_WHITE, TFT_BLACK);
  tft.setTextDatum(MC_DATUM);
  tft.drawString("CYD Touch Demo", tft.width() / 2, tft.height() / 2 - 14, 4);
  tft.drawString("Hold screen now to calibrate touch", tft.width() / 2, tft.height() / 2 + 18, 2);
  uint32_t start = millis();
  bool wantCal = false;
  while (millis() - start < 2000) {
    if (ts.touched()) {
      wantCal = true;
      break;
    }
    delay(20);
  }
  if (wantCal) {
    waitForRelease();
    calibrateTouch();
  }

  layoutButtons();
  drawScreen();
  Serial.println("Ready. Raw touch readings are logged below.");
}

// ------------------------------------------------------------------ loop ---

int pressedButton = -1;

void loop() {
  int16_t x, y;
  TS_Point raw;
  bool down = readTouch(x, y, &raw);

  if (down) {
    int hit = hitTest(x, y);
    if (pressedButton == -1) {
      Serial.printf("Touch raw=(%d,%d) z=%d -> screen=(%d,%d) button=%d\n",
                    raw.x, raw.y, raw.z, x, y, hit);
    }
    if (hit != pressedButton) {
      if (pressedButton >= 0) drawButton(buttons[pressedButton], false);
      if (hit >= 0) drawButton(buttons[hit], true);
      pressedButton = hit;
    }
  } else if (pressedButton >= 0) {
    // Act on release, like a normal button.
    Serial.printf("Button %s -> background\n", buttons[pressedButton].label);
    background = backgroundFor(pressedButton);
    pressedButton = -1;
    drawScreen();
  }

  delay(15);
}
