import katex from 'katex';

/**
 * Render a title string that may contain inline math delimited by single `$…$`.
 * Text runs are HTML-escaped; math runs are rendered with KaTeX.
 * Use with `set:html` in Astro. Falls back gracefully on malformed math.
 */
export function renderTitle(input: string): string {
  const parts = splitMath(input);
  return parts
    .map((part) =>
      part.math
        ? katex.renderToString(part.text, {
            throwOnError: false,
            displayMode: false,
          })
        : escapeHtml(part.text),
    )
    .join('');
}

/** Strip `$…$` delimiters, leaving the raw (non-rendered) text. For <title>, search indexes, etc. */
export function stripMath(input: string): string {
  return splitMath(input)
    .map((p) => p.text)
    .join('');
}

function splitMath(input: string): { text: string; math: boolean }[] {
  const out: { text: string; math: boolean }[] = [];
  let i = 0;
  let buf = '';
  while (i < input.length) {
    const ch = input[i];
    if (ch === '\\' && i + 1 < input.length) {
      // keep escaped chars (including \$) verbatim in the current run
      buf += input[i + 1];
      i += 2;
      continue;
    }
    if (ch === '$') {
      const close = findClose(input, i + 1);
      if (close !== -1) {
        if (buf) out.push({ text: buf, math: false });
        out.push({ text: input.slice(i + 1, close), math: true });
        buf = '';
        i = close + 1;
        continue;
      }
    }
    buf += ch;
    i += 1;
  }
  if (buf) out.push({ text: buf, math: false });
  return out;
}

function findClose(input: string, start: number): number {
  for (let j = start; j < input.length; j++) {
    if (input[j] === '\\') {
      j++;
      continue;
    }
    if (input[j] === '$') return j;
  }
  return -1;
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}
