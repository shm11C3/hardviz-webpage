import { loadDefaultJapaneseParser } from "budoux";

const parser = loadDefaultJapaneseParser();
const japaneseTextPattern = /[ぁ-んァ-ヶ一-龠々]/u;
const zeroWidthSpace = "\u200B";

export function addJapaneseLineBreaks(lang: string, text: string): string {
  if (lang !== "ja" || !japaneseTextPattern.test(text)) {
    return text;
  }

  return parser.parse(text.replaceAll(zeroWidthSpace, "")).join(zeroWidthSpace);
}
