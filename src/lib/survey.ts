/**
 * User survey (Tally) configuration.
 *
 * The survey is an external Tally form embedded on `/survey` (English) and
 * `/ja/survey` (Japanese) — one form per language. Both the website and the
 * desktop app link to these pages and pass non-identifying context as URL query
 * params (see {@link SURVEY_FORWARDED_PARAMS}). The survey page forwards those
 * params into the Tally iframe so they land in the form's hidden fields.
 *
 * To go live, create the two Tally forms, add hidden fields whose keys match
 * {@link SURVEY_FORWARDED_PARAMS} exactly, then drop the form IDs below. Until a
 * form ID is filled in, the matching survey page shows a "preparing" notice
 * instead of a broken iframe.
 */
export type SurveyLang = "en" | "ja";

/**
 * Tally form IDs per language (the part after `tally.so/r/` / `tally.so/embed/`).
 * Set a language's value to embed that form; leave it as an empty string to
 * disable the embed (the page then falls back to a "preparing" notice).
 */
export const surveyFormIds: Record<SurveyLang, string> = {
  en: "kdr0Dj",
  ja: "MeGrxX",
};

/**
 * Non-identifying context forwarded from the page URL into the Tally form as
 * hidden fields. Keep these keys in sync with the Tally form's hidden fields.
 * - `app_version`: app release the responder is on (e.g. `1.8.1`)
 * - `os`: `windows` | `macos` | `linux`
 * - `source`: entry point — `app` or `web`
 * - `locale`: UI language — `en` | `ja`
 */
export const SURVEY_FORWARDED_PARAMS = [
  "app_version",
  "os",
  "source",
  "locale",
] as const;

export function getSurveyFormId(lang: SurveyLang): string {
  return surveyFormIds[lang];
}

export function isSurveyConfigured(lang: SurveyLang): boolean {
  return surveyFormIds[lang].trim().length > 0;
}

/**
 * Base Tally embed URL. The per-response context params are appended
 * client-side from the page URL (see the survey page's inline script).
 */
export function buildSurveyEmbedSrc(formId: string): string {
  const params = new URLSearchParams({
    alignLeft: "1",
    hideTitle: "1",
    transparentBackground: "1",
    dynamicHeight: "1",
  });
  return `https://tally.so/embed/${formId}?${params.toString()}`;
}
