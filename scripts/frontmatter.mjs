// Minimal YAML-like frontmatter parser. Supports the subset the blog needs:
// `key: value` strings, `key: [a, b, c]` inline lists, and quoted strings.
// Not a general YAML parser — keep post frontmatter simple.

function parseScalar(raw) {
  const v = raw.trim();
  if (/^\[.*\]$/.test(v)) {
    const inner = v.slice(1, -1).trim();
    if (inner === "") return [];
    return inner.split(",").map((s) => parseScalar(s.trim()));
  }
  if (/^".*"$/.test(v)) return v.slice(1, -1);
  if (/^'.*'$/.test(v)) return v.slice(1, -1);
  if (v === "true") return true;
  if (v === "false") return false;
  return v;
}

export function parseFrontmatter(src) {
  const match = src.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!match) return { data: {}, body: src };
  const [, block, body] = match;
  const data = {};
  for (const line of block.split("\n")) {
    if (!line.trim() || line.trim().startsWith("#")) continue;
    const idx = line.indexOf(":");
    if (idx === -1) continue;
    const key = line.slice(0, idx).trim();
    const value = line.slice(idx + 1).trim();
    data[key] = parseScalar(value);
  }
  return { data, body };
}
