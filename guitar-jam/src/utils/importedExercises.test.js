import 'fake-indexeddb/auto';
import { beforeEach, describe, expect, it } from 'vitest';
import { blobToArrayBuffer, deleteImportedExercise, listImportedExercises, resetImportedExercisesForTests, saveImportedExercise } from './importedExercises';

beforeEach(async () => resetImportedExercisesForTests());

const textOf = async (blob) => new TextDecoder().decode(await blobToArrayBuffer(blob));

// Read the raw stored record, bypassing the module's hydration.
const rawRecords = () => new Promise((resolve, reject) => {
  const open = indexedDB.open('guitar-jam-library', 1);
  open.onerror = () => reject(open.error);
  open.onsuccess = () => {
    const request = open.result.transaction('exercises', 'readonly').objectStore('exercises').getAll();
    request.onsuccess = () => { open.result.close(); resolve(request.result); };
    request.onerror = () => reject(request.error);
  };
});

describe('imported exercise storage', () => {
  it('round-trips a browser Blob image as bytes plus MIME type', async () => {
    // The environment's own Blob (jsdom here, the browser in production) —
    // the exact case that used to come back as {} from IndexedDB.
    const image = new Blob(['image-bytes'], { type: 'image/png' });
    const saved = await saveImportedExercise({ title: 'Riff', tab: 'e|--3--|', sourceImage: image });
    expect(saved.sourceImage).toBeInstanceOf(Blob);

    const [raw] = await rawRecords();
    expect(raw.sourceImage).toBeUndefined();
    expect(raw.sourceImageType).toBe('image/png');
    expect(raw.sourceImageData.byteLength).toBe(11);

    const [stored] = await listImportedExercises();
    expect(stored.sourceImage).toBeInstanceOf(Blob);
    expect(stored.sourceImage.type).toBe('image/png');
    expect(await textOf(stored.sourceImage)).toBe('image-bytes');
    expect(stored.sourceImageData).toBeUndefined();
  });

  it('keeps the image when an existing exercise is edited and re-saved', async () => {
    const first = await saveImportedExercise({ title: 'Riff', tab: 'e|--3--|', sourceImage: new Blob(['abc'], { type: 'image/jpeg' }) });
    await saveImportedExercise({ ...first, title: 'Updated riff' });
    const records = await listImportedExercises();
    expect(records).toHaveLength(1);
    expect(records[0].title).toBe('Updated riff');
    expect(records[0].sourceImage.type).toBe('image/jpeg');
    expect(await textOf(records[0].sourceImage)).toBe('abc');
  });

  it('stores exercises without an image', async () => {
    await saveImportedExercise({ title: 'No picture', tab: 'E|--0--|' });
    expect((await listImportedExercises())[0].sourceImage).toBeNull();
  });

  it('deletes an imported exercise', async () => {
    const record = await saveImportedExercise({ title: 'Delete me', tab: 'E|--0--|' });
    await deleteImportedExercise(record.id);
    expect(await listImportedExercises()).toEqual([]);
  });
});
