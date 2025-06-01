import { createI18nClient } from "../lib/i18n/client";

const i18n = createI18nClient();

export function useTranslations(language = "en") {
  i18n.changeLanguage(language);
  
  return function t(key: string): string {
    const keys = key.split(".");
    let value: any = i18n.getResourceBundle(language, "translation");
    
    for (const k of keys) {
      if (!value || !value[k]) return key;
      value = value[k];
    }
    
    return value;
  };
}