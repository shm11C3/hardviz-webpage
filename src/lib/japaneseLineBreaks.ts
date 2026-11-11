import { loadDefaultJapaneseParser } from "budoux";

const parser = loadDefaultJapaneseParser();
const japaneseTextPattern = /[ぁ-んァ-ヶ一-龠々]/u;
const zeroWidthSpace = "\u200B";

const clausePunctuation = /[、。]/u;
// Opening brackets keep what follows them on the same line.
const noBreakAfter = /[（「『【〔(]/u;
// A boundary never falls inside a Latin word or a number.
const latin = /[A-Za-z0-9]/;
// Characters that must not start a line, so no boundary is put before them:
// closing punctuation, the long-vowel mark, and small kana.
const noBreakBefore =
  /[\s、。，．・：；！？!?,.）」』】〕ー々ぁぃぅぇぉっゃゅょゎァィゥェォッャュョヮヵヶ]/u;

/**
 * The offsets in `text` where a line may break: between BudouX phrases, and
 * after 、 or 。 even where BudouX keeps the two sides together.
 */
export function japanesePhraseBoundaries(text: string): Set<number> {
  const boundaries = new Set<number>();
  let offset = 0;
  for (const phrase of parser.parse(text)) {
    offset += phrase.length;
    boundaries.add(offset);
  }
  for (let index = 1; index < text.length; index += 1) {
    if (
      clausePunctuation.test(text[index - 1]) &&
      !noBreakBefore.test(text[index])
    ) {
      boundaries.add(index);
    }
  }
  for (const index of boundaries) {
    if (
      index >= text.length ||
      noBreakBefore.test(text[index]) ||
      noBreakAfter.test(text[index - 1]) ||
      (latin.test(text[index - 1]) && latin.test(text[index]))
    ) {
      boundaries.delete(index);
    }
  }
  boundaries.delete(0);
  return boundaries;
}

export function addJapaneseLineBreaks(lang: string, text: string): string {
  if (lang !== "ja" || !japaneseTextPattern.test(text)) {
    return text;
  }

  const plain = text.replaceAll(zeroWidthSpace, "");
  const boundaries = japanesePhraseBoundaries(plain);
  let out = "";
  for (let index = 0; index < plain.length; index += 1) {
    out += plain[index];
    if (boundaries.has(index + 1)) out += zeroWidthSpace;
  }
  return out;
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
