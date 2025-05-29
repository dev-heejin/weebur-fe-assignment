'use client';
import { useEffect, useState } from 'react';

type ViewMode = 'grid' | 'list';

const VIEW_MODE_KEY = 'viewMode';
const EXPIRE_TIME = 5; // 24 hours in milliseconds

interface ViewModeStorage {
  mode: ViewMode;
  expireAt: number;
}

function setRandomViewMode() {
  return Math.random() < 0.5 ? 'grid' : 'list';
}

export function useViewMode() {
  const [viewMode, setViewMode] = useState<ViewMode | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem(VIEW_MODE_KEY);
    const now = Date.now();
    const expireAt = now + EXPIRE_TIME * 60 * 1000;

    if (stored) {
      try {
        const prevViewMode: ViewModeStorage = JSON.parse(stored);
        if (prevViewMode.expireAt > now) {
          setViewMode(prevViewMode.mode);
          return;
        }
      } catch {
        localStorage.setItem(
          VIEW_MODE_KEY,
          JSON.stringify({ mode: setRandomViewMode(), expireAt }),
        );
      }
    } else {
      localStorage.setItem(VIEW_MODE_KEY, JSON.stringify({ mode: setRandomViewMode(), expireAt }));
    }
  }, []);

  return { viewMode };
}
