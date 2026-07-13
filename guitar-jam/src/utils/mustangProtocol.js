/* ═══════════════════════════════════════════════════════════════
   FENDER MUSTANG GEN-1 USB PROTOCOL
   Byte layout sourced from the open-source PLUG project
   (github.com/offa/plug, GPL) — 64-byte HID interrupt packets.
   Header = bytes 0-15, payload = bytes 16-63.

   Ported verbatim from the standalone "Mustang Preset Loader" web app
   into an ES module so the guitar-jam React UI can drive it.
   ═══════════════════════════════════════════════════════════════ */

export const FENDER_VID = 0x1ed8;
export const GEN1_PIDS = {
  0x0004: 'Mustang I/II (v1)', 0x0005: 'Mustang III/IV/V (v1)',
  0x000a: 'Mustang Bronco', 0x0010: 'Mustang Mini', 0x0012: 'Mustang Floor',
  0x0014: 'Mustang I/II (v2)', 0x0016: 'Mustang III/IV/V (v2)',
};

/* Amp models: fuse/packet model ID → name + amp-specific bytes
   asBytes land at payload[28,29,30,34,38]; unk = payload[24,27,37] */
export const AMPS = {
  0x67: { name: "Fender '57 Deluxe", as: [0x01, 0x01, 0x01, 0x01, 0x53] },
  0x64: { name: "Fender '59 Bassman", as: [0x02, 0x02, 0x02, 0x02, 0x67] },
  0x7c: { name: "Fender '57 Champ", as: [0x0c, 0x0c, 0x0c, 0x0c, 0x00] },
  0x53: { name: "Fender '65 Deluxe Reverb", as: [0x03, 0x03, 0x03, 0x03, 0x6a], unk: [0x00, 0x00, 0x01] },
  0x6a: { name: "Fender '65 Princeton", as: [0x04, 0x04, 0x04, 0x04, 0x61] },
  0x75: { name: "Fender '65 Twin Reverb", as: [0x05, 0x05, 0x05, 0x05, 0x72] },
  0x72: { name: 'Fender Super-Sonic', as: [0x06, 0x06, 0x06, 0x06, 0x79] },
  0x61: { name: "British '60s", as: [0x07, 0x07, 0x07, 0x07, 0x5e] },
  0x79: { name: "British '70s", as: [0x0b, 0x0b, 0x0b, 0x0b, 0x7c] },
  0x5e: { name: "British '80s", as: [0x09, 0x09, 0x09, 0x09, 0x5d] },
  0x5d: { name: "American '90s", as: [0x0a, 0x0a, 0x0a, 0x0a, 0x6d] },
  0x6d: { name: 'Metal 2000', as: [0x08, 0x08, 0x08, 0x08, 0x75] },
  /* v2-only models */
  0xf1: { name: 'Studio Preamp', as: [0x0d, 0x0d, 0x0d, 0x0d, 0xf6], v2: 1 },
  0xf6: { name: "Fender '57 Twin", as: [0x0e, 0x0e, 0x0e, 0x0e, 0xf9], v2: 1 },
  0xf9: { name: "Fender '60s Thrift", as: [0x0f, 0x0f, 0x0f, 0x0f, 0xfc], v2: 1 },
  0xfc: { name: 'British Colour', as: [0x10, 0x10, 0x10, 0x10, 0xff], v2: 1 },
  0xff: { name: 'British Watts', as: [0x11, 0x11, 0x11, 0x11, 0x00], v2: 1 },
};

/* Effects: model ID → {name, dsp (6 stomp / 7 mod / 8 delay / 9 reverb),
   unk = payload[3,4,5], clamps} */
export const FX = {
  0x3c: { n: 'Overdrive', d: 6 }, 0x49: { n: 'Wah', d: 6, u: [1, 8, 1] },
  0x4a: { n: 'Touch Wah', d: 6, u: [1, 8, 1] }, 0x1a: { n: 'Fuzz', d: 6 },
  0x1c: { n: 'Fuzz Touch Wah', d: 6 }, 0x88: { n: 'Simple Comp', d: 6, u: [8, 8, 1], clamp: { 1: 3 } },
  0x07: { n: 'Compressor', d: 6 },
  0x103: { n: 'Ranger Boost', d: 6, v2: 1 }, 0xba: { n: 'Greenbox', d: 6, v2: 1 },
  0x110: { n: 'Orangebox', d: 6, v2: 1 }, 0x111: { n: 'Blackbox', d: 6, v2: 1 },
  0x10f: { n: 'Big Fuzz', d: 6, v2: 1 },
  0x12: { n: 'Sine Chorus', d: 7, u: [1, 1, 1] }, 0x13: { n: 'Triangle Chorus', d: 7, u: [1, 1, 1] },
  0x18: { n: 'Sine Flanger', d: 7, u: [1, 1, 1] }, 0x19: { n: 'Triangle Flanger', d: 7, u: [1, 1, 1] },
  0x2d: { n: 'Vibratone', d: 7, u: [1, 1, 1] }, 0x40: { n: 'Vintage Tremolo', d: 7, u: [1, 1, 1] },
  0x41: { n: 'Sine Tremolo', d: 7, u: [1, 1, 1] }, 0x22: { n: 'Ring Modulator', d: 7, u: [1, 8, 1], clamp: { 4: 1 } },
  0x29: { n: 'Step Filter', d: 7, u: [1, 1, 1] }, 0x4f: { n: 'Phaser', d: 7, u: [1, 1, 1], clamp: { 5: 1 } },
  0x1f: { n: 'Pitch Shifter', d: 7, u: [1, 8, 1] },
  0xf4: { n: 'Wah (Mod)', d: 7, u: [1, 8, 1], v2: 1 }, 0xf5: { n: 'Touch Wah (Mod)', d: 7, u: [1, 8, 1], v2: 1 },
  0x11f: { n: 'Diatonic Pitch Shift', d: 7, u: [0, 8, 1], v2: 1 },
  0x16: { n: 'Mono Delay', d: 8, u: [2, 1, 1] }, 0x43: { n: 'Mono Echo Filter', d: 8, u: [2, 1, 1] },
  0x48: { n: 'Stereo Echo Filter', d: 8, u: [2, 1, 1] }, 0x44: { n: 'Multitap Delay', d: 8, u: [2, 1, 1], clamp: { 5: 3 } },
  0x45: { n: 'Ping Pong Delay', d: 8, u: [2, 1, 1] }, 0x15: { n: 'Ducking Delay', d: 8, u: [2, 1, 1] },
  0x46: { n: 'Reverse Delay', d: 8, u: [2, 1, 1] }, 0x2b: { n: 'Tape Delay', d: 8, u: [2, 1, 1] },
  0x2a: { n: 'Stereo Tape Delay', d: 8, u: [2, 1, 1] },
  0x24: { n: 'Small Hall Reverb', d: 9 }, 0x3a: { n: 'Large Hall Reverb', d: 9 },
  0x26: { n: 'Small Room Reverb', d: 9 }, 0x3b: { n: 'Large Room Reverb', d: 9 },
  0x4e: { n: 'Small Plate Reverb', d: 9 }, 0x4b: { n: 'Large Plate Reverb', d: 9 },
  0x4c: { n: 'Ambient Reverb', d: 9 }, 0x4d: { n: 'Arena Reverb', d: 9 },
  0x21: { n: "'63 Spring Reverb", d: 9 }, 0x0b: { n: "'65 Spring Reverb", d: 9 },
};

/* ── Packet builders ─────────────────────────── */
export const pkt = () => new Uint8Array(64);

export function pktInit() { // two handshake packets
  const a = pkt(); a[1] = 0xc3;
  const b = pkt(); b[0] = 0x1a; b[1] = 0x03;
  return [a, b];
}
export function pktRequestState() { const p = pkt(); p[0] = 0xff; p[1] = 0xc1; return p; }
export function pktExecute() { const p = pkt(); p[0] = 0x1c; p[1] = 0x03; return p; }
export function pktSelectBank(slot) {
  const p = pkt(); p[0] = 0x1c; p[1] = 0x01; p[2] = 0x01; p[4] = slot; p[6] = 0x01; return p;
}
export function pktSaveName(slot, name) {
  const p = pkt(); p[0] = 0x1c; p[1] = 0x01; p[2] = 0x03; p[4] = slot; p[6] = 0x01; p[7] = 0x01;
  for (let i = 0; i < Math.min(name.length, 32); i++) p[16 + i] = name.charCodeAt(i) & 0x7f;
  return p;
}
export function pktAmp(a) { // a = parsed amp settings object
  const m = AMPS[a.model]; if (!m) throw new Error('Unknown amp model 0x' + a.model.toString(16));
  const p = pkt();
  p[0] = 0x1c; p[1] = 0x03; p[2] = 0x05; p[6] = 0x01; p[7] = 0x01; // header
  const P = 16; // payload base
  p[P + 0] = a.model & 0xff;
  p[P + 16] = a.volume; p[P + 17] = a.gain; p[P + 18] = a.gain2; p[P + 19] = a.master;
  p[P + 20] = a.treble; p[P + 21] = a.middle; p[P + 22] = a.bass; p[P + 23] = a.presence;
  p[P + 26] = a.bias;
  p[P + 31] = Math.min(a.noiseGate, 5);
  if (a.noiseGate === 5) { p[P + 32] = Math.min(a.threshold, 9); p[P + 25] = a.depth; }
  else p[P + 25] = 0x80;
  p[P + 33] = Math.min(a.cabinet, 0x0c);
  p[P + 35] = Math.min(a.sag, 2);
  p[P + 36] = a.brightness ? 1 : 0;
  const unk = m.unk || [0x80, 0x80, 0x01];
  p[P + 24] = unk[0]; p[P + 27] = unk[1]; p[P + 37] = unk[2];
  const s = m.as; p[P + 28] = s[0]; p[P + 29] = s[1]; p[P + 30] = s[2]; p[P + 34] = s[3]; p[P + 38] = s[4];
  return p;
}
export function pktUsbGain(v) {
  const p = pkt(); p[0] = 0x1c; p[1] = 0x03; p[2] = 0x0d; p[6] = 0x01; p[7] = 0x01; p[16] = v; return p;
}
export function pktEffect(fx) { // fx = {model, pos, knobs[6]} ; model 0 → clear packet for dsp
  const p = pkt(); const P = 16;
  p[0] = 0x1c; p[1] = 0x03; p[2] = fx.dsp; p[6] = 0x01; p[7] = 0x01;
  const meta = fx.model ? FX[fx.model] : null;
  const u = meta?.u || [0, 8, 1];
  p[P + 3] = u[0]; p[P + 4] = u[1]; p[P + 5] = u[2];
  if (meta) {
    p[P + 0] = fx.model & 0xff; p[P + 1] = (fx.model >> 8) & 0xff;
    p[P + 2] = fx.pos;
    const k = fx.knobs.slice();
    if (meta.clamp) for (const [idx, max] of Object.entries(meta.clamp)) k[idx - 1] = Math.min(k[idx - 1], max);
    if (fx.model === 0x88) { k[1] = k[2] = k[3] = k[4] = 0; } // simple comp: only knob1
    for (let i = 0; i < 6; i++) p[P + 16 + i] = k[i] || 0;
  }
  return p;
}

/* ── .fuse XML parsing ───────────────────────── */
export function parseFuse(xmlText, fallbackName) {
  const doc = new DOMParser().parseFromString(xmlText, 'text/xml');
  if (doc.querySelector('parsererror')) throw new Error('Not valid XML');
  const preset = { name: fallbackName, amp: null, effects: [], usbGain: null };
  const info = doc.querySelector('FUSE Info, Info');
  if (info?.getAttribute('name')) preset.name = info.getAttribute('name').trim();

  const ampEl = doc.querySelector('Amplifier');
  if (ampEl) {
    const mod = ampEl.querySelector('Module');
    const a = {
      model: parseInt(mod?.getAttribute('ID') || '0'),
      volume: 0, gain: 0, gain2: 0, master: 0, treble: 0, middle: 0, bass: 0, presence: 0,
      depth: 0x80, bias: 0x80, noiseGate: 0, threshold: 0, cabinet: 0, sag: 1, brightness: 0,
    };
    const map8 = { 0: 'volume', 1: 'gain', 2: 'gain2', 3: 'master', 4: 'treble', 5: 'middle', 6: 'bass', 7: 'presence', 9: 'depth', 10: 'bias' };
    const mapRaw = { 15: 'noiseGate', 16: 'threshold', 17: 'cabinet', 19: 'sag', 20: 'brightness' };
    ampEl.querySelectorAll('Param').forEach((pa) => {
      const ci = parseInt(pa.getAttribute('ControlIndex'));
      const v = parseInt(pa.textContent);
      if (ci in map8) a[map8[ci]] = (v >> 8) & 0xff;
      else if (ci in mapRaw) a[mapRaw[ci]] = v;
    });
    if (AMPS[a.model]) preset.amp = a;
  }
  doc.querySelectorAll('FX Module').forEach((mod) => {
    const id = parseInt(mod.getAttribute('ID') || '0');
    if (!id || !FX[id]) return;
    const fx = { model: id, dsp: FX[id].d, pos: parseInt(mod.getAttribute('POS') || '0'), knobs: [0, 0, 0, 0, 0, 0] };
    mod.querySelectorAll('Param').forEach((pa) => {
      const ci = parseInt(pa.getAttribute('ControlIndex'));
      if (ci >= 0 && ci <= 5) fx.knobs[ci] = (parseInt(pa.textContent) >> 8) & 0xff;
    });
    preset.effects.push(fx);
  });
  const ug = doc.querySelector('UsbGain');
  if (ug) preset.usbGain = parseInt(ug.textContent) & 0xff;
  if (!preset.amp) throw new Error('No recognizable Amplifier block');
  return preset;
}

/* Export back to .fuse XML for sharing */
export function toFuseXml(p) {
  const ampParams = [['0', p.amp.volume], ['1', p.amp.gain], ['2', p.amp.gain2], ['3', p.amp.master],
    ['4', p.amp.treble], ['5', p.amp.middle], ['6', p.amp.bass], ['7', p.amp.presence],
    ['9', p.amp.depth], ['10', p.amp.bias]].map(([ci, v]) =>
    `      <Param ControlIndex="${ci}">${(v & 0xff) << 8}</Param>`).join('\n') + '\n' +
    [['15', p.amp.noiseGate], ['16', p.amp.threshold], ['17', p.amp.cabinet], ['19', p.amp.sag], ['20', p.amp.brightness ? 1 : 0]]
      .map(([ci, v]) => `      <Param ControlIndex="${ci}">${v}</Param>`).join('\n');
  const fxBlocks = p.effects.map((fx) =>
    `    <Module ID="${fx.model}" POS="${fx.pos}" BypassState="1">\n` +
    fx.knobs.map((k, i) => `      <Param ControlIndex="${i}">${(k & 0xff) << 8}</Param>`).join('\n') +
    '\n    </Module>').join('\n');
  return `<?xml version="1.0" encoding="utf-8"?>
<Preset amplifier="Mustang II" ProductId="1">
  <FUSE><Info name="${p.name.replace(/[<>&"]/g, '')}" author="" /></FUSE>
  <Amplifier>
    <Module ID="${p.amp.model}" POS="0" BypassState="1">
${ampParams}
    </Module>
  </Amplifier>
  <FX>
${fxBlocks}
  </FX>${p.usbGain != null ? `\n  <UsbGain>${p.usbGain}</UsbGain>` : ''}
</Preset>`;
}

export const hex = (u8) => [...u8].map((b) => b.toString(16).padStart(2, '0')).join(' ');
