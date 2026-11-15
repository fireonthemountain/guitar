import 'fake-indexeddb/auto';
import { Blob as NodeBlob } from 'node:buffer';
import { beforeEach, describe, expect, it } from 'vitest';
import { deleteImportedExercise, listImportedExercises, resetImportedExercisesForTests, saveImportedExercise } from './importedExercises';

beforeEach(async () => resetImportedExercisesForTests());

describe('imported exercise storage', () => {
  it('saves image data and updates an existing exercise', async () => {
    // fake-indexeddb uses Node's structuredClone, so use its native Blob here.
    // Browsers store the equivalent browser Blob through the same code path.
    const image = new NodeBlob(['image'], { type: 'image/png' });
    const first = await saveImportedExercise({ title: 'Riff', tab: 'e|--3--|', sourceImage: image });
    const storedImage = (await listImportedExercises())[0].sourceImage;
    expect(storedImage).toBeInstanceOf(NodeBlob);
    expect(await storedImage.text()).toBe('image');
    await saveImportedExercise({ ...first, title: 'Updated riff' });
    const records = await listImportedExercises();
    expect(records).toHaveLength(1);
    expect(records[0].title).toBe('Updated riff');
  });

  it('deletes an imported exercise', async () => {
    const record = await saveImportedExercise({ title: 'Delete me', tab: 'E|--0--|' });
    await deleteImportedExercise(record.id);
    expect(await listImportedExercises()).toEqual([]);
  });
});
