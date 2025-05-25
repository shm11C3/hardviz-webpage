// Define supported languages
export const languages = ['en', 'ja'] as const;
export type Language = typeof languages[number];

// Default language
export const defaultLanguage = 'en';

// Function to get the valid language from a string
export function getLanguage(lang: string | undefined): Language {
  if (lang && languages.includes(lang as Language)) {
    return lang as Language;
  }
  return defaultLanguage;
}

// Helper to generate alternative language URLs
export function getAlternateLanguageURL(currentURL: URL, newLang: Language): string {
  const url = new URL(currentURL);
  const pathSegments = url.pathname.split('/').filter(Boolean);
  
  // If the first segment is a language code, replace it
  if (languages.includes(pathSegments[0] as Language)) {
    pathSegments[0] = newLang;
  } else {
    // Otherwise insert the language at the beginning
    pathSegments.unshift(newLang);
  }
  
  return `/${pathSegments.join('/')}${url.search}`;
}