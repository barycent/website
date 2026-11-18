// Minimal, zero-dependency Markdown → HTML converter.
// Supports what the Barycent blog needs: headings, paragraphs, bold/italic,
// inline code, fenced code blocks, links, images, lists (ordered + unordered),
// blockquotes, horizontal rules, and tables. Not a full CommonMark implementation.

function escapeHtml(s) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// Inline-level transforms, applied after block structure is handled.
// Order matters: code spans first (so their contents are protected from
// further escaping/markup), then images before links, then emphasis.
function renderInline(text) {
  // Extract constructs whose *contents* must not be touched by escaping or by
  // later emphasis rules, replacing each with a placeholder. Restored at the
  // end, in reverse order of extraction (code spans last in, first out isn't
  // required here since the placeholder tokens don't nest or collide).
  const placeholders = [];
  const stash = (html) => {
    placeholders.push(html);
    return `\u0000PH${placeholders.length - 1}\u0000`;
  };

  // Inline code spans: `code` — contents are escaped but never processed further.
  text = text.replace(/`([^`]+)`/g, (_, code) => stash(`<code>${escapeHtml(code)}</code>`));

  // Images: ![alt](src "title"). Must run before escaping so a literal `"`
  // in the markdown source still matches the optional title group.
  text = text.replace(/!\[([^\]]*)\]\(([^)\s]+)(?:\s+"([^"]*)")?\)/g, (_, alt, src, title) => {
    const t = title ? ` title="${escapeHtml(title)}"` : "";
    return stash(`<img src="${escapeHtml(src)}" alt="${escapeHtml(alt)}"${t} loading="lazy">`);
  });

  // Links: [text](href "title"). Label is re-run through renderInline so
  // `[**bold**](url)` still gets emphasis, then escaped text is left intact.
  text = text.replace(/\[([^\]]+)\]\(([^)\s]+)(?:\s+"([^"]*)")?\)/g, (_, label, href, title) => {
    const t = title ? ` title="${escapeHtml(title)}"` : "";
    const external = /^https?:\/\//.test(href);
    const rel = external ? ' target="_blank" rel="noopener noreferrer"' : "";
    return stash(`<a href="${escapeHtml(href)}"${t}${rel}>${renderInline(label)}</a>`);
  });

  text = escapeHtml(text);

  // Bold then italic (order avoids ** being eaten by single-* rule).
  text = text.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  text = text.replace(/\b_{2}([^_]+)_{2}\b/g, "<strong>$1</strong>");
  text = text.replace(/\*([^*]+)\*/g, "<em>$1</em>");
  text = text.replace(/(?<![a-zA-Z0-9])_([^_]+)_(?![a-zA-Z0-9])/g, "<em>$1</em>");

  // Restore stashed HTML (code spans, images, links).
  text = text.replace(/\u0000PH(\d+)\u0000/g, (_, i) => placeholders[Number(i)]);

  return text;
}

function renderTable(lines) {
  const [headerLine, sepLine, ...rowLines] = lines;
  const split = (l) =>
    l
      .trim()
      .replace(/^\|/, "")
      .replace(/\|$/, "")
      .split("|")
      .map((c) => c.trim());
  const aligns = split(sepLine).map((cell) => {
    const left = cell.startsWith(":");
    const right = cell.endsWith(":");
    if (left && right) return "center";
    if (right) return "right";
    if (left) return "left";
    return null;
  });
  const th = split(headerLine)
    .map((c, i) => `<th${aligns[i] ? ` style="text-align:${aligns[i]}"` : ""}>${renderInline(c)}</th>`)
    .join("");
  const body = rowLines
    .map((l) => {
      const tds = split(l)
        .map((c, i) => `<td${aligns[i] ? ` style="text-align:${aligns[i]}"` : ""}>${renderInline(c)}</td>`)
        .join("");
      return `<tr>${tds}</tr>`;
    })
    .join("\n");
  return `<div class="table-wrap"><table>\n<thead><tr>${th}</tr></thead>\n<tbody>\n${body}\n</tbody>\n</table></div>`;
}

export function markdownToHtml(src) {
  const lines = src.replace(/\r\n/g, "\n").split("\n");
  const out = [];
  let i = 0;
  let paragraph = [];
  const flushParagraph = () => {
    if (paragraph.length) {
      out.push(`<p>${renderInline(paragraph.join(" "))}</p>`);
      paragraph = [];
    }
  };

  while (i < lines.length) {
    const line = lines[i];

    // Fenced code blocks: ```lang
    const fence = line.match(/^```(\w*)\s*$/);
    if (fence) {
      flushParagraph();
      const lang = fence[1];
      const code = [];
      i++;
      while (i < lines.length && !/^```\s*$/.test(lines[i])) {
        code.push(lines[i]);
        i++;
      }
      i++; // skip closing fence
      const cls = lang ? ` class="language-${escapeHtml(lang)}"` : "";
      out.push(`<pre><code${cls}>${escapeHtml(code.join("\n"))}</code></pre>`);
      continue;
    }

    // Horizontal rule
    if (/^(---|\*\*\*|___)\s*$/.test(line) && paragraph.length === 0) {
      flushParagraph();
      out.push("<hr>");
      i++;
      continue;
    }

    // Headings
    const heading = line.match(/^(#{1,6})\s+(.*)$/);
    if (heading) {
      flushParagraph();
      const level = heading[1].length;
      const text = heading[2].trim();
      const slug = text
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .trim()
        .replace(/\s+/g, "-");
      out.push(`<h${level} id="${slug}">${renderInline(text)}</h${level}>`);
      i++;
      continue;
    }

    // Blockquote
    if (/^>\s?/.test(line)) {
      flushParagraph();
      const quoteLines = [];
      while (i < lines.length && /^>\s?/.test(lines[i])) {
        quoteLines.push(lines[i].replace(/^>\s?/, ""));
        i++;
      }
      out.push(`<blockquote>${markdownToHtml(quoteLines.join("\n"))}</blockquote>`);
      continue;
    }

    // Tables: header line + separator line (---|---)
    if (/\|/.test(line) && lines[i + 1] && /^\s*\|?\s*:?-{3,}:?\s*(\|\s*:?-{3,}:?\s*)*\|?\s*$/.test(lines[i + 1])) {
      flushParagraph();
      const tableLines = [line, lines[i + 1]];
      i += 2;
      while (i < lines.length && /\|/.test(lines[i]) && lines[i].trim() !== "") {
        tableLines.push(lines[i]);
        i++;
      }
      out.push(renderTable(tableLines));
      continue;
    }

    // Lists (unordered - + *, ordered 1.). A list item's text can wrap onto
    // following lines (lazy continuation): those lines are folded into the
    // same <li> until a blank line, a new list marker, or a block-level
    // construct (heading, fence, quote, hr) ends it.
    const ulRe = /^\s*[-+*]\s+(.*)$/;
    const olRe = /^\s*\d+\.\s+(.*)$/;
    const isUl = ulRe.test(line);
    const isOl = olRe.test(line);
    if (isUl || isOl) {
      flushParagraph();
      const tag = isOl ? "ol" : "ul";
      const itemRe = isOl ? olRe : ulRe;
      const isAnyMarker = (l) => ulRe.test(l) || olRe.test(l);
      const endsContinuation = (l) =>
        l.trim() === "" || isAnyMarker(l) || /^\s*(#{1,6}\s|```|>|---\s*$|\*\*\*\s*$|___\s*$)/.test(l);
      const items = [];
      while (i < lines.length && itemRe.test(lines[i])) {
        let itemText = lines[i].match(itemRe)[1];
        i++;
        while (i < lines.length && !endsContinuation(lines[i])) {
          itemText += " " + lines[i].trim();
          i++;
        }
        items.push(itemText);
      }
      out.push(`<${tag}>${items.map((it) => `<li>${renderInline(it)}</li>`).join("")}</${tag}>`);
      continue;
    }

    // Blank line ends a paragraph
    if (line.trim() === "") {
      flushParagraph();
      i++;
      continue;
    }

    // Default: accumulate into the current paragraph
    paragraph.push(line.trim());
    i++;
  }
  flushParagraph();
  return out.join("\n");
}
