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

export interface ClauseText {
  /** Each clause as its phrases; a clause ends after 、 or 。. */
  clauses: string[][];
  /** Whether every clause is short enough to stay on one line of a lead. */
  fits: boolean;
}

const clauseEnd = /[、。！？]$/u;
// Longest clause, in full-width characters, that still fits one line of a
// lead paragraph on a wide screen.
const maxClauseWidth = 34;
const noBreakSpace = "\u00A0";

function displayWidth(text: string): number {
  let width = 0;
  for (const char of text) {
    width += (char.codePointAt(0) ?? 0) < 0x2000 ? 0.55 : 1;
  }
  return width;
}

/**
 * Splits Japanese text into clauses, and each clause into phrases. A lead
 * paragraph rendered from the result (see ClauseText.astro) breaks after 、
 * and 。 where the line is long enough, instead of between a subject and its
 * predicate. Spaces inside Latin names ("Cooling Insight") become no-break
 * spaces. Returns null for text that needs no treatment.
 */
export function splitJapaneseClauses(
  lang: string,
  text: string,
): ClauseText | null {
  if (lang !== "ja" || !japaneseTextPattern.test(text)) {
    return null;
  }

  const phrases = parser.parse(
    text
      .replaceAll(zeroWidthSpace, "")
      .replace(/(?<=[A-Za-z]) (?=[A-Za-z])/g, noBreakSpace),
  );
  const clauses: string[][] = [];
  let current: string[] = [];
  for (const phrase of phrases) {
    current.push(phrase);
    if (clauseEnd.test(phrase)) {
      clauses.push(current);
      current = [];
    }
  }
  if (current.length) clauses.push(current);

  return {
    clauses,
    fits: clauses.every(
      (clause) => displayWidth(clause.join("")) <= maxClauseWidth,
    ),
  };
}
