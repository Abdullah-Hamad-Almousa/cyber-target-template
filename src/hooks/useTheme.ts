import { useCallback, useEffect } from 'react';
import { useLocalStorage } from './useLocalStorage';
import type { Theme } from '@/types';

const themes: Theme[] = ['light', 'company', 'dark'];

export function useTheme(): [Theme, () => void] {
  const [theme, setTheme] = useLocalStorage<Theme>('theme', 'company');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const cycleTheme = useCallback(() => {
    setTheme((prev) => {
      const idx = themes.indexOf(prev);
      return themes[(idx + 1) % themes.length];
    });
  }, [setTheme]);

  return [theme, cycleTheme];
}
