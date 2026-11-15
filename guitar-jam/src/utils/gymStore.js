// Train-tab state lives under `gym` inside the Stage Ready blob, so it gets
// the same verified local writes, backup recovery, export/import and cloud
// sync as the rest of the app's progress — no second storage system.

import { loadStage90, saveStage90 } from './stage90';
import { normalizeGym } from './practiceEngine';

export const loadGym = () => normalizeGym(loadStage90().gym);

// Read-modify-write against the latest stored blob, so a Train update can never
// overwrite progress another page saved a moment ago.
export function updateGym(change) {
  const state = loadStage90();
  const gym = normalizeGym(change(normalizeGym(state.gym)));
  const result = saveStage90({ ...state, gym });
  return { gym, ok: result.ok };
}
