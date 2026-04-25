import { useCallback, useEffect } from 'react';
import { useLocalStorage } from './useLocalStorage';
import type { Language } from '@/types';

export function useLanguage(): [Language, () => void] {
  const [language, setLanguage] = useLocalStorage<Language>('language', 'en');

  useEffect(() => {
    const html = document.documentElement;
    html.setAttribute('lang', language);
    html.setAttribute('dir', language === 'ar' ? 'rtl' : 'ltr');
  }, [language]);

  const toggleLanguage = useCallback(() => {
    setLanguage((prev) => (prev === 'en' ? 'ar' : 'en'));
  }, [setLanguage]);

  return [language, toggleLanguage];
}
