import { parseFuse } from '../utils/mustangProtocol';

/* Bundled .fuse preset collections, loaded raw at build time and parsed on
   first use. Each collection folder under ./presets/ becomes a "source" tag. */
const rawFiles = import.meta.glob('./presets/**/*.fuse', {
  query: '?raw',
  import: 'default',
  eager: true,
});

const SOURCE_LABELS = {
  'blues-jam-picks': 'Blues Jam',
  'full-collection': 'Full Collection',
};

let cache = null;

/* Returns [{ ...parsedPreset, source, sourceLabel, bundled:true }] for every
   bundled .fuse that parses. Unparseable files are skipped (logged once). */
export function loadBundledPresets() {
  if (cache) return cache;
  const out = [];
  for (const [path, xml] of Object.entries(rawFiles)) {
    // path e.g. "./presets/blues-jam-picks/M2_00 Liquid Solo.fuse"
    const parts = path.split('/');
    const source = parts[parts.length - 2];
    const fileName = parts[parts.length - 1].replace(/\.(fuse|xml)$/i, '');
    try {
      const preset = parseFuse(xml, fileName);
      preset.source = source;
      preset.sourceLabel = SOURCE_LABELS[source] || source;
      preset.bundled = true;
      out.push(preset);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.warn(`Skipped bundled preset ${path}: ${err.message}`);
    }
  }
  out.sort((a, b) => a.name.localeCompare(b.name));
  cache = out;
  return out;
}

export const BUNDLED_SOURCES = SOURCE_LABELS;
