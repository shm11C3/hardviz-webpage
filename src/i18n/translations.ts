import { Language } from './utils';
import enTranslations from './locales/en.json';
import jaTranslations from './locales/ja.json';

// Store translations in a map for easy access
const translations = {
  en: enTranslations,
  ja: jaTranslations,
};

export type TranslationKey = keyof typeof enTranslations;

// Function to get translations for a specific language
export function getTranslations(lang: Language) {
  return translations[lang] ?? translations.en;
}

// Access a nested translation key using dot notation
export function t(lang: Language, key: string): string {
  const keys = key.split('.');
  let value: any = getTranslations(lang);
  
  for (const k of keys) {
    if (value === undefined) return key;
    value = value[k];
  }
  
  if (typeof value !== 'string') return key;
  return value;
}