import i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import en from './en.json';
import ja from './ja.json';

const resources = {
  en: {
    translation: en
  },
  ja: {
    translation: ja
  }
};

let i18nInstance: typeof i18next | null = null;

export function createI18nClient() {
  if (i18nInstance) return i18nInstance;

  i18nInstance = i18next.createInstance();
  i18nInstance
    .use(LanguageDetector)
    .init({
      resources,
      fallbackLng: 'en',
      interpolation: {
        escapeValue: false,
      },
      detection: {
        order: ['localStorage', 'navigator'],
        caches: ['localStorage'],
      }
    });

  return i18nInstance;
}