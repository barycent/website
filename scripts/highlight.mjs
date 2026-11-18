// Minimal build-time YAML syntax highlighter for the site's code panels.
// Not a general-purpose highlighter — just enough for the pipeline.yaml
// samples shown on the site: keys, quoted strings, comments, everything
// else. Operates line-by-line so indentation/structure is never touched.

function esc(s) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function highlightLine(line) {
  const hashIdx = line.indexOf("#");
  const code = hashIdx >= 0 ? line.slice(0, hashIdx) : line;
  const comment = hashIdx >= 0 ? line.slice(hashIdx) : "";

  const lead = code.match(/^(\s*(?:-\s+)?)/)[0];
  let rest = code.slice(lead.length);
  let out = esc(lead);

  const keyMatch = rest.match(/^([A-Za-z_][\w-]*)(:)(\s*)/);
  if (keyMatch) {
    out += `<span class="tok-key">${esc(keyMatch[1])}</span><span class="tok-punc">:</span>${esc(keyMatch[3])}`;
    rest = rest.slice(keyMatch[0].length);
  }

  if (rest) {
    out += /^".*"\s*$/.test(rest) ? `<span class="tok-str">${esc(rest)}</span>` : `<span class="tok-val">${esc(rest)}</span>`;
  }
  if (comment) out += `<span class="tok-comment">${esc(comment)}</span>`;
  return out;
}

export function highlightYaml(src) {
  return src.split("\n").map(highlightLine).join("\n");
}
