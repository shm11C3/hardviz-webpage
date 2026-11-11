import { japanesePhraseBoundaries } from "./japaneseLineBreaks";

const zeroWidthSpace = "​";
const japaneseText = /[ぁ-んァ-ヶ一-龠々]/u;

/** Elements whose text is left alone and that end a run of text. */
const skippedElements = new Set(["astro-island", "pre", "svg"]);
/** Elements whose content is not markup and is copied through as it is. */
const rawTextElements = new Set(["script", "style", "textarea", "title"]);
/**
 * Inline elements: text on both sides of their tags belongs to one run, so a
 * phrase that continues across a link or an emphasis is kept together.
 */
const inlineElements = new Set([
  "a",
  "abbr",
  "b",
  "bdi",
  "bdo",
  "cite",
  "data",
  "dfn",
  "em",
  "i",
  "mark",
  "q",
  "s",
  "small",
  "span",
  "strong",
  "sub",
  "sup",
  "time",
  "u",
  "var",
  "wbr",
]);
/**
 * Inline elements with literal text. Their content is never changed; in the
 * run it counts as one opaque character.
 */
const literalElements = new Set(["code", "kbd", "samp"]);

// A comment, a declaration, or a tag. Quoted attribute values may contain ">".
const markup =
  /<!--[\s\S]*?-->|<![^>]*>|<\/?[a-zA-Z][^\s/>]*(?:[^>"']|"[^"]*"|'[^']*')*>/y;
const tagName = /^<\/?([a-zA-Z][^\s/>]*)/;
const entity = /(&[#\w]+;)/;
// Stand-ins, one character each, for an entity and for literal text.
const entityMark = "";
const literalMark = "";

type RunItem =
  | { kind: "markup"; value: string }
  | { kind: "text"; value: string }
  | { kind: "literal"; value: string };

/** Adds the boundaries to one run of inline content and returns its HTML. */
function renderRun(items: RunItem[]): string {
  const pieces: { item: RunItem; parts: string[] }[] = items.map((item) => ({
    item,
    parts:
      item.kind === "text"
        ? item.value.replaceAll(zeroWidthSpace, "").split(entity)
        : [item.value],
  }));

  let plain = "";
  for (const { item, parts } of pieces) {
    if (item.kind === "literal") plain += literalMark;
    else if (item.kind === "text") {
      parts.forEach((part, index) => {
        plain += index % 2 === 1 ? entityMark : part;
      });
    }
  }
  if (!japaneseText.test(plain)) {
    return items.map((item) => item.value).join("");
  }

  const boundaries = japanesePhraseBoundaries(plain);
  let out = "";
  let offset = 0;
  // A boundary that falls right after literal text is written at the start
  // of the text that follows, so the literal text itself stays untouched.
  let pending = false;
  for (const { item, parts } of pieces) {
    if (item.kind === "markup") {
      out += item.value;
      continue;
    }
    if (item.kind === "literal") {
      out += item.value;
      offset += 1;
      pending = boundaries.has(offset);
      continue;
    }
    parts.forEach((part, index) => {
      if (part === "") return;
      if (pending) {
        out += zeroWidthSpace;
        pending = false;
      }
      if (index % 2 === 1) {
        out += part;
        offset += 1;
        if (boundaries.has(offset)) out += zeroWidthSpace;
        return;
      }
      for (const char of part) {
        out += char;
        offset += char.length;
        if (boundaries.has(offset)) out += zeroWidthSpace;
      }
    });
  }
  return out;
}

/**
 * Adds BudouX phrase boundaries (zero-width spaces) to the text of an HTML
 * document, so Japanese text on the whole page breaks between phrases. Text
 * that already has boundaries comes out the same.
 */
export function addJapaneseLineBreaksToHtml(html: string): string {
  let out = "";
  let position = 0;
  let skipDepth = 0;
  let literalDepth = 0;
  let run: RunItem[] = [];

  const flush = () => {
    if (run.length > 0) {
      out += renderRun(run);
      run = [];
    }
  };
  const text = (value: string) => {
    if (value === "") return;
    if (skipDepth > 0) out += value;
    else run.push({ kind: literalDepth > 0 ? "literal" : "text", value });
  };

  while (position < html.length) {
    const start = html.indexOf("<", position);
    if (start === -1) {
      text(html.slice(position));
      break;
    }
    text(html.slice(position, start));

    markup.lastIndex = start;
    const match = markup.exec(html);
    if (!match) {
      text("<");
      position = start + 1;
      continue;
    }
    const tag = match[0];
    position = start + tag.length;

    const name = tagName.exec(tag)?.[1]?.toLowerCase();
    const closing = tag.startsWith("</");

    if (skipDepth > 0) {
      out += tag;
      if (name && skippedElements.has(name)) {
        if (closing) skipDepth -= 1;
        else if (!tag.endsWith("/>")) skipDepth += 1;
      }
      continue;
    }

    if (!name) {
      // A comment or a declaration does not end the run.
      run.push({ kind: "markup", value: tag });
      continue;
    }

    if (literalElements.has(name)) {
      run.push({ kind: "markup", value: tag });
      if (closing) literalDepth = Math.max(0, literalDepth - 1);
      else if (!tag.endsWith("/>")) literalDepth += 1;
      continue;
    }

    if (inlineElements.has(name)) {
      run.push({ kind: "markup", value: tag });
      continue;
    }

    // Anything else is a block boundary.
    flush();
    out += tag;

    if (rawTextElements.has(name) && !closing) {
      const end = html.slice(position).search(new RegExp(`</${name}`, "i"));
      if (end === -1) {
        out += html.slice(position);
        position = html.length;
        break;
      }
      out += html.slice(position, position + end);
      position += end;
      continue;
    }

    if (skippedElements.has(name) && !closing && !tag.endsWith("/>")) {
      skipDepth += 1;
    }
  }

  flush();
  return out;
}
