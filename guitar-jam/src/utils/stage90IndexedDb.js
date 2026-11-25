const DB_NAME = 'guitar-practice';
const DB_VERSION = 1;
const SNAPSHOTS = 'snapshots';
const PENDING_SYNC = 'pending-sync';
const STAGE90_ID = 'stage90';

let databasePromise = null;
let writeQueue = Promise.resolve();

function openDatabase() {
  if (!globalThis.indexedDB) return Promise.reject(new Error('IndexedDB is not available'));
  if (databasePromise) return databasePromise;

  databasePromise = new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = () => {
      const database = request.result;
      if (!database.objectStoreNames.contains(SNAPSHOTS)) database.createObjectStore(SNAPSHOTS, { keyPath: 'id' });
      if (!database.objectStoreNames.contains(PENDING_SYNC)) database.createObjectStore(PENDING_SYNC, { keyPath: 'id' });
    };
    request.onsuccess = () => {
      const database = request.result;
      database.onversionchange = () => {
        database.close();
        databasePromise = null;
      };
      resolve(database);
    };
    request.onerror = () => {
      databasePromise = null;
      reject(request.error || new Error('Could not open IndexedDB'));
    };
    request.onblocked = () => {
      databasePromise = null;
      reject(new Error('IndexedDB upgrade is blocked by another app tab'));
    };
  });

  return databasePromise;
}

async function transact(storeName, mode, operation) {
  const database = await openDatabase();
  return new Promise((resolve, reject) => {
    const transaction = database.transaction(storeName, mode);
    const store = transaction.objectStore(storeName);
    let result;
    try {
      result = operation(store);
    } catch (error) {
      transaction.abort();
      reject(error);
      return;
    }
    transaction.oncomplete = () => resolve(result?.result);
    transaction.onerror = () => reject(transaction.error || result?.error || new Error('IndexedDB transaction failed'));
    transaction.onabort = () => reject(transaction.error || new Error('IndexedDB transaction was aborted'));
  });
}

export async function readStage90Snapshot() {
  return (await transact(SNAPSHOTS, 'readonly', (store) => store.get(STAGE90_ID)))?.state || null;
}

export async function readPendingStage90Sync() {
  return (await transact(PENDING_SYNC, 'readonly', (store) => store.get(STAGE90_ID)))?.state || null;
}

async function persistSnapshot(state, pending) {
  await transact(SNAPSHOTS, 'readwrite', (store) => store.put({ id: STAGE90_ID, state }));
  if (pending) await transact(PENDING_SYNC, 'readwrite', (store) => store.put({ id: STAGE90_ID, state }));
  return state;
}

export function queueStage90Snapshot(state, { pending = true } = {}) {
  const snapshot = structuredClone(state);
  const queued = writeQueue.then(() => persistSnapshot(snapshot, pending));
  writeQueue = queued.catch(() => {});
  return queued;
}

export async function clearPendingStage90Sync(upToRevision = null) {
  const pending = await readPendingStage90Sync();
  if (!pending) return false;
  if (upToRevision !== null && (pending._revision || 0) > upToRevision) return false;
  await transact(PENDING_SYNC, 'readwrite', (store) => store.delete(STAGE90_ID));
  return true;
}

export async function initializeStage90IndexedDb(localState, applyLocalState) {
  try {
    const indexedState = await readStage90Snapshot();
    if (!indexedState) {
      await queueStage90Snapshot(localState, { pending: false });
      return { status: 'migrated-local', state: localState };
    }

    const indexedUpdated = Number(indexedState._updatedAt) || 0;
    const localUpdated = Number(localState._updatedAt) || 0;
    const indexedRevision = Number(indexedState._revision) || 0;
    const localRevision = Number(localState._revision) || 0;
    const indexedIsNewer = indexedUpdated > localUpdated
      || (indexedUpdated === localUpdated && indexedRevision > localRevision);

    if (indexedIsNewer) {
      const applied = applyLocalState(indexedState);
      return { status: applied.ok ? 'restored-indexeddb' : 'local-write-error', state: applied.state };
    }

    if (localUpdated > indexedUpdated || localRevision > indexedRevision) {
      await queueStage90Snapshot(localState, { pending: false });
      return { status: 'updated-indexeddb', state: localState };
    }

    return { status: 'current', state: localState };
  } catch (error) {
    return { status: 'unavailable', state: localState, error };
  }
}

export async function resetStage90IndexedDbForTests() {
  if (databasePromise) {
    const database = await databasePromise.catch(() => null);
    database?.close();
  }
  databasePromise = null;
  writeQueue = Promise.resolve();
  if (!globalThis.indexedDB) return;
  await new Promise((resolve, reject) => {
    const request = indexedDB.deleteDatabase(DB_NAME);
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
    request.onblocked = () => reject(new Error('IndexedDB deletion blocked'));
  });
}
