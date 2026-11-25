import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { BookOpen, Camera, FileImage, Library, Pencil, Plus, Save, ScanLine, Search, ShieldCheck, Trash2, Upload } from 'lucide-react';
import TabBlock from '../components/guitar/TabBlock';
import { parseTab } from '../utils/tabParser';
import { EMPTY_TAB, normalizeOcrTab } from '../utils/tabOcr';
import { deleteImportedExercise, IMPORTED_EXERCISES_EVENT, listImportedExercises, saveImportedExercise } from '../utils/importedExercises';

const MAX_IMAGE_BYTES = 15 * 1024 * 1024;

function StoredImage({ blob, alt, className = '' }) {
  const [url, setUrl] = useState('');
  useEffect(() => {
    if (!(blob instanceof Blob)) { setUrl(''); return undefined; }
    const next = URL.createObjectURL(blob);
    setUrl(next);
    return () => URL.revokeObjectURL(next);
  }, [blob]);
  return url ? <img src={url} alt={alt} className={className} /> : null;
}

function confidenceLabel(value) {
  if (value >= 0.8) return ['Strong candidate', 'text-emerald-400'];
  if (value >= 0.45) return ['Needs review', 'text-amber-400'];
  return ['Manual entry needed', 'text-rose-400'];
}

function createDraft() {
  return { id: '', title: '', tab: EMPTY_TAB, bpm: 70, notes: '', sourceName: '', sourceImage: null, extraction: null };
}

function SavedMaterial({ records, loading, query, error, message, onQueryChange, onEdit, onRemove, onAdd }) {
  const filtered = useMemo(() => {
    const needle = query.trim().toLocaleLowerCase();
    return needle ? records.filter((item) => `${item.title} ${item.notes} ${item.sourceName}`.toLocaleLowerCase().includes(needle)) : records;
  }, [query, records]);

  return (
    <section id="library-saved-panel" role="tabpanel" aria-labelledby="library-saved-tab" className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div><h2 className="text-xl font-bold text-gray-100">Saved lesson material</h2><p className="mt-1 text-sm text-gray-400">Your personal exercises, ready to edit or practice.</p></div>
        <div className="flex flex-col gap-2 sm:flex-row">
          {records.length > 0 && <label className="relative block"><span className="sr-only">Search saved lesson material</span><Search aria-hidden="true" size={17} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" /><input type="search" value={query} onChange={(event) => onQueryChange(event.target.value)} placeholder="Search your library" className="w-full rounded-lg border-gray-600 bg-gray-900 py-2 pl-9 pr-3 text-sm text-gray-100 placeholder:text-gray-500 sm:w-64" /></label>}
          <button type="button" onClick={onAdd} className="inline-flex items-center justify-center gap-2 rounded-lg bg-teal-600 px-4 py-2 text-sm font-bold text-white hover:bg-teal-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-400"><Plus aria-hidden="true" size={17} /> Add material</button>
        </div>
      </div>
      {error && <div role="alert" className="rounded-lg border border-rose-800 bg-rose-950/40 px-3 py-2 text-sm text-rose-300">{error}</div>}
      {message && <div role="status" className="rounded-lg border border-teal-800 bg-teal-950/40 px-3 py-2 text-sm text-teal-200">{message}</div>}
      {loading ? <div role="status" className="rounded-xl border border-gray-700 bg-gray-800 p-8 text-center text-gray-400">Loading your practice library…</div> : records.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-gray-600 bg-gray-800/60 p-8 text-center sm:p-12">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-teal-950 text-teal-300"><FileImage aria-hidden="true" size={27} /></div>
          <h3 className="mt-4 text-lg font-bold text-gray-100">Build your personal lesson library</h3>
          <p className="mx-auto mt-2 max-w-lg text-sm text-gray-400">Add a screenshot or captured PDF page, correct the recognized tab, and save it as a playable exercise on this device.</p>
          <button type="button" onClick={onAdd} className="mt-5 inline-flex items-center gap-2 rounded-lg bg-teal-600 px-4 py-2.5 font-bold text-white hover:bg-teal-500"><Plus aria-hidden="true" size={18} /> Add your first exercise</button>
        </div>
      ) : filtered.length === 0 ? (
        <div className="rounded-xl border border-gray-700 bg-gray-800 p-8 text-center"><Search aria-hidden="true" className="mx-auto text-gray-500" /><h3 className="mt-3 font-bold text-gray-200">No matching material</h3><p className="mt-1 text-sm text-gray-500">Try another title, note, or source filename.</p></div>
      ) : (
        <div className="grid gap-4 xl:grid-cols-2">{filtered.map((record) => (
          <article key={record.id} className="min-w-0 rounded-xl border border-gray-700 bg-gray-800 p-4">
            <div className="flex gap-3">
              <div className="flex h-20 w-24 flex-shrink-0 items-center justify-center overflow-hidden rounded-lg bg-gray-900 text-gray-600">{record.sourceImage ? <StoredImage blob={record.sourceImage} alt="" className="h-full w-full object-cover" /> : <BookOpen aria-hidden="true" />}</div>
              <div className="min-w-0 flex-1"><h3 className="truncate font-bold text-gray-100">{record.title}</h3><div className="mt-1 text-xs text-gray-500">{record.bpm} BPM · saved {new Date(record.updatedAt).toLocaleDateString()}</div>{record.notes && <p className="mt-2 line-clamp-2 text-xs text-gray-400">{record.notes}</p>}</div>
              <div className="flex items-start gap-1"><button type="button" onClick={() => onEdit(record)} className="rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-teal-300" title="Edit exercise" aria-label={`Edit ${record.title}`}><Pencil aria-hidden="true" size={17} /></button><button type="button" onClick={() => onRemove(record)} className="rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-rose-300" title="Delete exercise" aria-label={`Delete ${record.title}`}><Trash2 aria-hidden="true" size={17} /></button></div>
            </div>
            <TabBlock label="Practice now" tab={record.tab} />
          </article>
        ))}</div>
      )}
    </section>
  );
}

export default function ImportPracticePage({ libraryLayout = false }) {
  const [section, setSection] = useState(libraryLayout ? 'saved' : 'add');
  const [draft, setDraft] = useState(createDraft);
  const [records, setRecords] = useState([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [dirty, setDirty] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [ocr, setOcr] = useState({ running: false, progress: 0, status: '' });
  const fileInput = useRef(null);
  const titleInput = useRef(null);

  const refresh = useCallback(async () => {
    try { setRecords(await listImportedExercises()); }
    catch (cause) { setError(cause?.message || 'Could not load imported exercises.'); }
    finally { setLoading(false); }
  }, []);
  useEffect(() => {
    refresh(); globalThis.addEventListener(IMPORTED_EXERCISES_EVENT, refresh);
    return () => globalThis.removeEventListener(IMPORTED_EXERCISES_EVENT, refresh);
  }, [refresh]);

  const parsed = useMemo(() => parseTab(draft.tab), [draft.tab]);
  const confidence = confidenceLabel(draft.extraction?.structureConfidence || 0);
  const change = (field, value) => { setDraft((current) => ({ ...current, [field]: value })); setDirty(true); setMessage(''); setError(''); };

  const chooseFile = (file) => {
    setError(''); setMessage('');
    if (!file) return;
    if (!file.type.startsWith('image/')) { setError('Choose a screenshot, photo, or image captured from a PDF page.'); return; }
    if (file.size > MAX_IMAGE_BYTES) { setError('That image is larger than 15 MB. Crop or resize it and try again.'); return; }
    setDraft((current) => ({ ...current, title: current.title || file.name.replace(/\.[^.]+$/, '').replace(/[-_]+/g, ' '), sourceName: file.name, sourceImage: file, extraction: null }));
    setDirty(true);
  };

  const runOcr = async () => {
    if (!(draft.sourceImage instanceof Blob)) { setError('Upload a screenshot before running tab recognition.'); return; }
    setError(''); setMessage(''); setOcr({ running: true, progress: 0, status: 'Loading private on-device OCR…' });
    let worker;
    try {
      const { createWorker } = await import('tesseract.js');
      worker = await createWorker('eng', 1, { logger: (event) => setOcr({ running: true, progress: Number.isFinite(event.progress) ? Math.round(event.progress * 100) : 0, status: event.status || 'Recognizing tablature…' }) });
      await worker.setParameters({ preserve_interword_spaces: '1', tessedit_char_whitelist: 'eEBGDA0123456789|-—_hHpPbBrR/xX\\ ' });
      const result = await worker.recognize(draft.sourceImage);
      const normalized = normalizeOcrTab(result.data.text);
      setDraft((current) => ({ ...current, tab: normalized.tab, extraction: { engine: 'tesseract.js', engineConfidence: Math.max(0, Math.min(1, (result.data.confidence || 0) / 100)), structureConfidence: normalized.confidence, warnings: normalized.warnings, rawText: result.data.text, recognizedAt: new Date().toISOString() } }));
      setDirty(true);
      setMessage(normalized.confidence > 0 ? 'Recognition finished. Compare every fret with the source before saving.' : 'No reliable tab grid was found. Use the editable six-string template below.');
    } catch (cause) { setError(`Recognition could not finish: ${cause?.message || 'unknown OCR error'}. You can still enter or paste tab manually.`); }
    finally { await worker?.terminate().catch(() => {}); setOcr({ running: false, progress: 0, status: '' }); }
  };

  const save = async () => {
    setError(''); setMessage('');
    if (!draft.title.trim()) { setError('Give this exercise a title before saving.'); titleInput.current?.focus(); return; }
    if (!parsed.playable) { setError('The editor needs at least one fret number on a labeled guitar string before it can be saved.'); return; }
    try { const saved = await saveImportedExercise(draft); setDraft(saved); setDirty(false); setMessage('Saved locally in your private practice library.'); }
    catch (cause) { setError(cause?.message || 'The exercise could not be saved.'); }
  };

  const edit = (record) => { setDraft(record); setDirty(false); setSection('add'); setMessage(`Editing “${record.title}”.`); setError(''); window.scrollTo({ top: 0, behavior: 'smooth' }); };
  const remove = async (record) => {
    if (!window.confirm(`Delete “${record.title}” and its locally stored source image?`)) return;
    try { await deleteImportedExercise(record.id); if (draft.id === record.id) { setDraft(createDraft()); setDirty(false); } setMessage('Imported exercise deleted from this browser.'); }
    catch (cause) { setError(cause?.message || 'The exercise could not be deleted.'); }
  };
  const reset = () => {
    if (dirty && !window.confirm('Start a new import and discard unsaved editor changes?')) return false;
    setDraft(createDraft()); setDirty(false); setMessage(''); setError(''); if (fileInput.current) fileInput.current.value = '';
    return true;
  };
  const switchSection = (next) => { setSection(next); setError(''); setMessage(''); };
  const beginAdd = () => { if (reset()) setSection('add'); };
  const moveTabFocus = (event) => {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    const tabs = [...event.currentTarget.parentElement.querySelectorAll('[role="tab"]')];
    const current = tabs.indexOf(event.currentTarget);
    const next = event.key === 'Home' ? 0 : event.key === 'End' ? tabs.length - 1 : (current + (event.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length;
    tabs[next]?.focus();
    tabs[next]?.click();
  };

  const savedPanel = <SavedMaterial records={records} loading={loading} query={query} error={error} message={message} onQueryChange={setQuery} onEdit={edit} onRemove={remove} onAdd={beginAdd} />;

  return (
    <div className="space-y-6">
      {libraryLayout && <header className="overflow-hidden rounded-2xl border border-gray-700 bg-gradient-to-br from-gray-800 to-gray-800/70">
        <div className="flex flex-col gap-5 p-5 sm:p-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl"><div className="flex items-center gap-2 text-teal-400"><Library aria-hidden="true" size={24} /><p className="text-sm font-bold uppercase tracking-[0.16em]">My Library</p></div><h1 className="mt-2 text-2xl font-black text-gray-50 sm:text-3xl">Your lesson material, ready to practice</h1><p className="mt-2 text-sm leading-6 text-gray-400">Keep your own lesson screenshots and PDF page captures together. Recognize tablature on this device, correct it, and save a playable exercise.</p></div>
          <div className="flex items-start gap-3 rounded-xl border border-emerald-900/70 bg-emerald-950/30 p-3 text-sm text-emerald-100 lg:max-w-sm"><ShieldCheck aria-hidden="true" className="mt-0.5 flex-shrink-0 text-emerald-400" size={20} /><div><span className="font-bold">Private and local.</span> Saved exercises and source images stay in this browser on this device.</div></div>
        </div>
        <div role="tablist" aria-label="Library sections" className="flex gap-1 border-t border-gray-700 bg-gray-900/40 px-3 pt-2 sm:px-5">
          {[['saved', BookOpen, 'Saved material'], ['add', Plus, 'Add material']].map(([id, Icon, label]) => <button key={id} id={`library-${id}-tab`} type="button" role="tab" tabIndex={section === id ? 0 : -1} aria-selected={section === id} aria-controls={`library-${id}-panel`} onKeyDown={moveTabFocus} onClick={() => switchSection(id)} className={`flex min-h-11 flex-1 items-center justify-center gap-2 rounded-t-lg px-3 py-2 text-sm font-bold sm:flex-none sm:px-5 ${section === id ? 'bg-gray-800 text-teal-300' : 'text-gray-400 hover:bg-gray-800/60 hover:text-gray-200'}`}><Icon aria-hidden="true" size={18} /> {label}{id === 'saved' && <span className="rounded-full bg-gray-700 px-2 py-0.5 text-xs text-gray-300">{records.length}</span>}</button>)}
        </div>
      </header>}

      {libraryLayout && section === 'saved' && savedPanel}
      {(!libraryLayout || section === 'add') && <div id={libraryLayout ? 'library-add-panel' : undefined} role={libraryLayout ? 'tabpanel' : undefined} aria-labelledby={libraryLayout ? 'library-add-tab' : undefined} className="space-y-6">
        <section className="rounded-2xl border border-gray-700 bg-gray-800 p-4 sm:p-5">
          <div className="flex flex-wrap items-start justify-between gap-4"><div><div className="flex items-center gap-2 text-teal-400"><ScanLine aria-hidden="true" size={22} /><h2 className="text-xl font-bold">{draft.id ? 'Edit practice exercise' : 'Screenshot to practice'}</h2></div><p className="mt-1 max-w-3xl text-sm text-gray-400">Import a clear guitar-tab image, recognize it privately in your browser, correct the result, then save a playable exercise.</p></div><button type="button" onClick={reset} className="rounded-lg bg-gray-700 px-3 py-2 text-sm font-semibold text-gray-100 hover:bg-gray-600">New import</button></div>
          <div className="mt-5 grid gap-5 lg:grid-cols-2">
            <div className="space-y-3">
              <button type="button" onClick={() => fileInput.current?.click()} onDragOver={(event) => event.preventDefault()} onDrop={(event) => { event.preventDefault(); chooseFile(event.dataTransfer.files?.[0]); }} className="flex min-h-48 w-full flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-gray-600 bg-gray-900/50 p-4 text-gray-300 hover:border-teal-500">{draft.sourceImage ? <StoredImage blob={draft.sourceImage} alt="Uploaded lesson source" className="max-h-80 w-full rounded-lg object-contain" /> : <><Upload aria-hidden="true" size={32} className="text-teal-400" /><span className="font-semibold">Choose or drop a lesson image</span><span className="text-xs text-gray-500">Screenshot, photo, or captured PDF page · up to 15 MB</span></>}</button>
              <input ref={fileInput} type="file" accept="image/*" capture="environment" className="sr-only" aria-label="Choose lesson image" onChange={(event) => chooseFile(event.target.files?.[0])} />
              <button type="button" onClick={runOcr} disabled={!draft.sourceImage || ocr.running} className="flex w-full items-center justify-center gap-2 rounded-lg bg-teal-600 px-4 py-2.5 font-bold text-white hover:bg-teal-500 disabled:cursor-not-allowed disabled:bg-gray-700 disabled:text-gray-500"><Camera aria-hidden="true" size={18} /> {ocr.running ? `${ocr.status} ${ocr.progress}%` : 'Recognize guitar tab'}</button>
              {ocr.running && <div role="progressbar" aria-label="Tab recognition progress" aria-valuemin="0" aria-valuemax="100" aria-valuenow={ocr.progress} className="h-2 overflow-hidden rounded-full bg-gray-700"><div className="h-full bg-teal-500 transition-all" style={{ width: `${ocr.progress}%` }} /></div>}
              <p className="text-[11px] leading-5 text-gray-500">Recognition runs on this device. The OCR language model may be downloaded on first use; your lesson image is not sent to an app server.</p>
            </div>
            <div className="space-y-3">
              <label className="block"><span className="text-xs font-bold text-gray-400">Exercise title</span><input ref={titleInput} value={draft.title} onChange={(event) => change('title', event.target.value)} placeholder="Example: Blues turnaround — bars 1–4" className="mt-1 w-full rounded-lg border-gray-600 bg-gray-900 text-gray-100" /></label>
              <div className="grid gap-3 sm:grid-cols-[120px_1fr]"><label><span className="text-xs font-bold text-gray-400">Starting BPM</span><input type="number" min="40" max="200" value={draft.bpm} onChange={(event) => change('bpm', event.target.value)} className="mt-1 w-full rounded-lg border-gray-600 bg-gray-900 text-gray-100" /></label><label><span className="text-xs font-bold text-gray-400">Practice notes</span><input value={draft.notes} onChange={(event) => change('notes', event.target.value)} placeholder="Fingering, goal, source page…" className="mt-1 w-full rounded-lg border-gray-600 bg-gray-900 text-gray-100" /></label></div>
              <label className="block"><span className="flex items-center justify-between gap-2 text-xs font-bold text-gray-400"><span>Editable ASCII tab</span>{draft.extraction && <span className={confidence[1]}>{confidence[0]}</span>}</span><textarea value={draft.tab} onChange={(event) => change('tab', event.target.value)} spellCheck="false" rows="10" className="mt-1 w-full rounded-lg border-gray-600 bg-gray-950 font-mono text-sm leading-relaxed text-gray-100" /></label>
              <div className="text-xs text-gray-500">Format each line as <code className="text-amber-300">e|--0--2--|</code>. Uppercase E is the lowest string; lowercase e is the highest.</div>
              {draft.extraction?.warnings?.map((warning) => <div key={warning} className="rounded-lg border border-amber-800/50 bg-amber-950/30 px-3 py-2 text-xs text-amber-300">{warning}</div>)}
              {error && <div role="alert" className="rounded-lg border border-rose-800 bg-rose-950/40 px-3 py-2 text-sm text-rose-300">{error}</div>}
              {message && <div role="status" className="rounded-lg border border-teal-800 bg-teal-950/40 px-3 py-2 text-sm text-teal-200">{message}</div>}
              <button type="button" onClick={save} disabled={ocr.running} className="flex w-full items-center justify-center gap-2 rounded-lg bg-amber-500 px-4 py-2.5 font-bold text-stone-950 hover:bg-amber-400 disabled:cursor-not-allowed disabled:bg-gray-700 disabled:text-gray-500"><Save aria-hidden="true" size={18} /> Save private practice exercise</button>
            </div>
          </div>
        </section>
        <section className="rounded-2xl border border-gray-700 bg-gray-800 p-4 sm:p-5"><h2 className="font-bold text-gray-100">Playable preview</h2><p className="mt-1 text-xs text-gray-500">Play this and visually compare it with the source image before saving.</p>{parsed.playable ? <TabBlock label={draft.title || 'Imported exercise preview'} tab={draft.tab} /> : <div className="mt-3 rounded-xl bg-gray-900 p-5 text-sm text-gray-500">Add at least one fret number to preview the exercise.</div>}</section>
      </div>}
      {!libraryLayout && savedPanel}
    </div>
  );
}
