import { afterEach, beforeEach, vi } from 'vitest';

class MemoryStorage {
  constructor() { this.data = new Map(); }
  get length() { return this.data.size; }
  clear() { this.data.clear(); }
  getItem(key) { return this.data.has(String(key)) ? this.data.get(String(key)) : null; }
  key(index) { return [...this.data.keys()][index] ?? null; }
  removeItem(key) { this.data.delete(String(key)); }
  setItem(key, value) { this.data.set(String(key), String(value)); }
}

const memoryStorage = new MemoryStorage();

Object.defineProperty(globalThis, 'localStorage', {
  configurable: true,
  value: memoryStorage,
});
if (typeof window !== 'undefined') {
  Object.defineProperty(window, 'localStorage', {
    configurable: true,
    value: memoryStorage,
  });
}

beforeEach(() => {
  memoryStorage.clear();
});

afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
  vi.useRealTimers();
});
