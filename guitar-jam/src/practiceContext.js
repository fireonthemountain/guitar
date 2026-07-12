import { createContext, useContext } from 'react';

// Global tab-playback settings, set once in the day view and applied to every
// tab's Play button. Defaults = play once, no count-in, steady tempo.
export const PracticeContext = createContext({ loops: 1, countIn: false, tempoStep: 0, click: true });

export const usePractice = () => useContext(PracticeContext);
