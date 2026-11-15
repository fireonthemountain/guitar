const DB_NAME = 'guitar-jam-library';
const DB_VERSION = 1;
const STORE = 'exercises';

export const IMPORTED_EXERCISES_EVENT = 'guitar-jam-imported-exercises';

function openDatabase() {
  if (!globalThis.indexedDB) return Promise.reject(new Error('IndexedDB is not available in this browser.'));
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE)) {
        const store = db.createObjectStore(STORE, { keyPath: 'id' });
        store.createIndex('updatedAt', 'updatedAt');
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error || new Error('Could not open the practice library.'));
    request.onblocked = () => reject(new Error('Database practice-library tabs are blocking a storage upgrade.'));
  });
}

async function transact(mode, operation) {
  const db = await openDatabase();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE, mode);
    const request = operation(transaction.objectStore(STORE));
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error || new Error('Practice-library operation failed.'));
    transaction.oncomplete = () => db.close();
    transaction.onerror = () => { db.close(); reject(transaction.error || new Error('Practice-library transaction failed.')); };
    transaction.onabort = () => { db.close(); reject(transaction.error || new Error('Practice-library transaction was aborted.')); };
  });
}

// Images are stored as raw bytes + MIME type, not as Blob objects. Blobs in
// IndexedDB are unreliable on iOS/Safari (and are lost by structured-clone
// shims), while an ArrayBuffer round-trips everywhere.
export async function blobToArrayBuffer(blob) {
  if (typeof blob.arrayBuffer === 'function') return blob.arrayBuffer();
  if (typeof FileReader !== 'undefined') {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = () => reject(reader.error || new Error('Could not read the image.'));
      reader.readAsArrayBuffer(blob);
    });
  }
  return new Response(blob).arrayBuffer();
}

const isBlob = (value) => typeof Blob !== 'undefined' && value instanceof Blob;

// Stored record → the shape the UI uses (sourceImage is always a Blob or null).
function hydrate(record) {
  if (!record) return record;
  const { sourceImageData, sourceImageType, ...rest } = record;
  if (sourceImageData && typeof Blob !== 'undefined') {
    return { ...rest, sourceImage: new Blob([sourceImageData], { type: sourceImageType || 'application/octet-stream' }) };
  }
  // Records saved before this change kept the Blob itself.
  return { ...rest, sourceImage: isBlob(rest.sourceImage) ? rest.sourceImage : null };
}

const notify = () => globalThis.dispatchEvent?.(new CustomEvent(IMPORTED_EXERCISES_EVENT));

export async function listImportedExercises() {
  const records = await transact('readonly', (store) => store.getAll());
  return records.map(hydrate).sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
}

export async function saveImportedExercise(input) {
  const now = new Date().toISOString();
  const record = {
    schemaVersion: 1,
    id: input.id || globalThis.crypto?.randomUUID?.() || `exercise-${Date.now()}-${Math.random().toString(16).slice(2)}`,
    title: String(input.title || 'Imported exercise').trim() || 'Imported exercise',
    tab: String(input.tab || '').trim(),
    bpm: Math.max(40, Math.min(200, Number(input.bpm) || 70)),
    notes: String(input.notes || '').trim(),
    sourceName: String(input.sourceName || ''),
    extraction: input.extraction || null,
    createdAt: input.createdAt || now,
    updatedAt: now,
  };
  if (isBlob(input.sourceImage)) {
    record.sourceImageData = await blobToArrayBuffer(input.sourceImage);
    record.sourceImageType = input.sourceImage.type || 'application/octet-stream';
  }
  await transact('readwrite', (store) => store.put(record));
  notify();
  return hydrate(record);
}

export async function deleteImportedExercise(id) {
  await transact('readwrite', (store) => store.delete(id));
  notify();
}

export async function resetImportedExercisesForTests() {
  if (!globalThis.indexedDB) return;
  await new Promise((resolve, reject) => {
    const request = indexedDB.deleteDatabase(DB_NAME);
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
    request.onblocked = () => reject(new Error('Practice-library database deletion was blocked.'));
  });
}
