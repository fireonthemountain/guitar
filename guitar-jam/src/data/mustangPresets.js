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

/* The Fender FUSE community backup (2017 snapshot of the discontinued FUSE
   cloud): 1,333 .fuse files → 1,107 unique presets after de-duping, pre-parsed
   to compact JSON at prep time (mirrors parseFuse). Source archive:
   dan-r95.github.io/misc/2020/04/14/fuse.html (Google Drive backup).
   Lazy-loaded (dynamic import → its own chunk) so it only costs the Amp tab,
   not the initial app load. */
export async function loadCommunityPresets() {
  const mod = await import('./communityPresets.json');
  return mod.default.map((p) => ({
    ...p, source: 'fuse-community', sourceLabel: 'Community', bundled: true,
  }));
}

/* A hand-tuned lens over the community backup: near-duplicate variants
   collapsed, junk names dropped, and each preset tagged by artist or genre.
   ~280 "greatest hits" — the browsable cream of the 1,107. */
export async function loadCuratedPresets() {
  const mod = await import('./curatedPresets.json');
  return mod.default.map((p) => ({
    ...p, source: 'curated', sourceLabel: 'Curated', bundled: true,
  }));
}
