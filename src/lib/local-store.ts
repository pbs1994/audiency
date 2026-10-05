"use client";

type Listener = () => void;

/** A tiny localStorage-backed external store, safe to read via useSyncExternalStore. */
export function createLocalStore<T>(key: string, defaultValue: T) {
  let value: T = defaultValue;
  let hydrated = false;
  const listeners = new Set<Listener>();

  function hydrate() {
    if (hydrated || typeof window === "undefined") return;
    hydrated = true;
    try {
      const raw = localStorage.getItem(key);
      if (raw !== null) value = JSON.parse(raw) as T;
    } catch {
      // ignore corrupted storage
    }
  }

  function getSnapshot() {
    hydrate();
    return value;
  }

  function getServerSnapshot() {
    return defaultValue;
  }

  function subscribe(listener: Listener) {
    listeners.add(listener);
    return () => listeners.delete(listener);
  }

  function setValue(next: T | ((prev: T) => T)) {
    hydrate();
    value = typeof next === "function" ? (next as (prev: T) => T)(value) : next;
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // ignore quota errors
    }
    listeners.forEach((listener) => listener());
  }

  return { getSnapshot, getServerSnapshot, subscribe, setValue };
}
