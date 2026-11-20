// Copy this file to config.h (same folder) and fill it in.
// config.h is git-ignored, so your Wi-Fi password and location stay on your machine.
#pragma once

// 2.4 GHz Wi-Fi only: the ESP32 can't join 5 GHz networks.
#define WIFI_SSID     "your-network-name"
#define WIFI_PASSWORD "your-wifi-password"

// Centre of the radar, in decimal degrees (right-click your house in Google
// Maps to copy them). West longitudes and south latitudes are negative.
#define HOME_LAT  47.4502
#define HOME_LON -122.3088

// POSIX timezone string for the clock. Examples:
//   US Pacific  "PST8PDT,M3.2.0,M11.1.0"     US Mountain "MST7MDT,M3.2.0,M11.1.0"
//   US Central  "CST6CDT,M3.2.0,M11.1.0"     US Eastern  "EST5EDT,M3.2.0,M11.1.0"
//   UK          "GMT0BST,M3.5.0/1,M10.5.0"   Central EU  "CET-1CEST,M3.5.0,M10.5.0/3"
#define TIMEZONE "PST8PDT,M3.2.0,M11.1.0"

// Starting radar radius in nautical miles. Tap the range button to cycle 5/10/25/50.
#define DEFAULT_RANGE_NM 25

// Seconds between updates. adsb.fi's public API is for light personal use; keep this >= 5.
#define REFRESH_SECONDS 10
