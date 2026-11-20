# CYD 2.8" ESP32-32E touch demo

PlatformIO + Arduino demo for the **ELEGOO 2.8-inch ESP32-32E touchscreen display**
(vendor model **E32R28T**; ESP32-WROOM-32E, 4 MB flash, ILI9341 240×320, XPT2046 resistive touch).

Three large buttons — RED, GREEN, BLUE — change the background colour. On boot it also prints
the board's pin configuration and flash size over serial, cycles through solid colours as a
display self-test, and logs every raw touch reading, so you can confirm the pinout on your unit.

```
cyd-touch-demo/
├── platformio.ini   ← every board pin is defined here, nowhere else
└── src/main.cpp     ← demo, display self-test, touch calibration
```

## 1. Verify the pinout

This board is **not** assumed to be the common ESP32-2432S028R "Cheap Yellow Display". The pins
below come from the board vendor's documentation (ELEGOO's E32R28T is the LCDWIKI / Elecrow
design), not from generic CYD guides.

### Pins used by this project

| Function | ESP32 GPIO | Notes | Source |
|---|---|---|---|
| LCD SCLK | 14 | HSPI bus | LCDWIKI E32R28T demo instructions |
| LCD MOSI (SDI) | 13 | | 〃 |
| LCD MISO (SDO) | 12 | | 〃 |
| LCD CS | 15 | | 〃 |
| LCD DC (RS) | 2 | | 〃 |
| LCD RESET | — | tied to ESP32 EN, so `TFT_RST=-1` | 〃 |
| LCD backlight | 21 | high = on | LCDWIKI pin table; robotics.org.za E32R28T setup |
| Touch SCLK (TP_SCK) | 25 | **separate** SPI bus from the LCD | LCDWIKI E32R28T / E32R28T-1 IO table |
| Touch MOSI (TP_DIN) | 32 | | 〃 |
| Touch MISO (TP_DOUT) | 39 | input-only GPIO | 〃 |
| Touch CS (TP_CS) | 33 | | 〃 |
| Touch IRQ (TP_IRQ) | 36 | goes low on touch; input-only GPIO | 〃 |

What the documentation shows:

- **Display and touch are on two separate SPI buses.** The LCD uses 14/13/12 and the touch
  controller uses 25/32/39. That's why the project drives touch through its own `SPIClass(VSPI)`
  rather than TFT_eSPI's built-in touch support, which expects one shared bus. Some sibling
  boards (LCDWIKI's 3.5" E32R35T and 4.0" E32R40T) *do* share the LCD bus for touch, so don't
  copy pins between sizes.
- **There are two revisions with different display drivers.** The original **E32R28T uses
  ILI9341**. The newer **E32R28T-1 uses ST7789**. The pins match, but the driver flag doesn't.
- One older E32R28T schematic PDF appears to show RTP_DOUT on IO19 in its extracted text. That
  text is garbled and the vendor demo docs say IO39, so this project uses 39. Check the schematic
  for your revision if touch doesn't respond.
- The SD card, RGB LED, speaker and battery-sense pins are **not used** by this demo and I
  haven't verified them. Check the IO table before using them.

### Check these against your board

1. **Find your revision.** Look at the PCB silkscreen, the sticker, the box, or the ELEGOO
   listing for `E32R28T` vs `E32R28T-1`. If it's `-1` (or the listing says ST7789), change
   `-D ILI9341_DRIVER=1` to `-D ST7789_DRIVER=1` in `platformio.ini`.
2. **Compare with the vendor files.** Download the vendor resources for your revision:
   - ELEGOO wiki: <https://wiki.elegoo.com/oshw-parts-&-accessories/esp32-dispaly-introduction>
   - LCDWIKI product page: <https://www.lcdwiki.com/2.8inch_ESP32-32E_Display>, especially the
     *ESP32 IO resource allocation table* and the *schematic* PDF.
   - The vendor's Arduino demo bundle includes a pre-configured TFT_eSPI `User_Setup.h`.
     Compare its `TFT_*` and `TOUCH_*` defines with `platformio.ini`.

   Check each net in the schematic: `LCD_CS`, `LCD_RS`, `LCD_SCK`, `LCD_SDI`, `LCD_SDO`,
   `LCD_BL`, `RTP_SCK`, `RTP_DIN`, `RTP_DOUT`, `RTP_CS`, `RTP_IRQ`.
3. **Confirm on the hardware.** Flash the demo (below) and open the serial monitor:
   - `Flash: 4194304 bytes` confirms the 4 MB flash.
   - The self-test should show **red → green → blue → white → black**. See troubleshooting if
     it doesn't.
   - Each tap logs a line like `Touch raw=(1834,2011) z=1200 -> screen=(160,120) button=1`.
     If tapping logs nothing at all, the touch pins are wrong.

## 2. Mac setup

You need macOS 12 or later and a **USB-A to USB-C data cable**. Many CYD-style boards don't
enumerate on a USB-C to USB-C cable, and charge-only cables never work.

**Option A: VS Code (easiest)**
1. Install [VS Code](https://code.visualstudio.com/).
2. Extensions → search **PlatformIO IDE** → Install, then restart VS Code.
3. File → Open Folder… → select this `cyd-touch-demo` folder. PlatformIO downloads the ESP32
   toolchain and the libraries on first build, which takes a few minutes.

**Option B: command line**
```bash
brew install platformio          # or: python3 -m pip install --user platformio
pio --version
```

**USB serial driver.** The board's USB-serial chip (usually a WCH CH340) is supported by macOS's
built-in driver. Plug the board in and check:
```bash
pio device list                  # or: ls /dev/cu.*
```
You should see something like `/dev/cu.usbserial-110` or `/dev/cu.wchusbserial110`. If nothing
appears:
- try another cable or port (avoid unpowered hubs)
- install the WCH driver from <https://www.wch-ic.com/downloads/CH34XSER_MAC_ZIP.html>
- approve it under System Settings → Privacy & Security, then replug

## 3. Build and upload

```bash
cd cyd-touch-demo
pio run                          # build
pio run -t upload                # build + flash (port is auto-detected)
```
In VS Code, use the ✓ (Build) and → (Upload) buttons in the blue status bar.

If more than one serial device is connected, set the port explicitly:
`pio run -t upload --upload-port /dev/cu.usbserial-110`, or add `upload_port = ...` to
`platformio.ini`.

If the upload stalls at `Connecting.....`: hold **BOOT**, tap **RST**, release **BOOT**, then
upload again. If it fails partway, lower `upload_speed` to `460800`.

## 4. Serial monitor

```bash
pio device monitor               # 115200 baud from platformio.ini; Ctrl+C to quit
pio run -t upload -t monitor     # flash, then open the monitor straight away
```
In VS Code, use the 🔌 (Serial Monitor) button. **Close the monitor before uploading**, because
only one program can hold the port. Press **RST** on the board to see the boot output again.

## 5. Touch calibration

The default raw-to-screen mapping is a typical CYD range. To fit it to your panel, **hold a finger
on the screen while the "CYD Touch Demo" splash is showing** (for 2 s after reset). Then tap and
hold the two crosses. The calibration is saved to flash and printed to serial. Calibration also
fixes mirrored or inverted axes.

## Troubleshooting

| Symptom | Likely cause | Fix in `platformio.ini` |
|---|---|---|
| Backlight on, screen white/blank | wrong driver or LCD pins | try `ST7789_DRIVER`; recheck LCD pins in the IO table |
| Completely dark | backlight pin | confirm `TFT_BL=21` against the schematic |
| Self-test colours wrong (red shows blue) | colour order | add `-D TFT_RGB_ORDER=TFT_BGR` (or `TFT_RGB`) |
| Black/white swapped | inversion | uncomment `-D TFT_INVERSION_ON=1` |
| Taps never logged | touch pins / IRQ | recheck `CYD_TOUCH_*` against the IO table |
| Taps logged but land in the wrong place | calibration / rotation | run the calibration above |
| Image garbled or flickering | SPI too fast | `SPI_FREQUENCY=27000000` |
