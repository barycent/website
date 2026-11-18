#!/usr/bin/env node
// Barycent static site builder. Zero npm dependencies — everything it needs
// (Markdown, frontmatter, templating) lives in ./scripts/.
//
// Usage:
//   node scripts/build.mjs          build once into dist/
//   node scripts/build.mjs --serve  build, then serve dist/ on :4000 and rebuild on change

import { readdirSync, readFileSync, writeFileSync, mkdirSync, rmSync, cpSync, existsSync, statSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { createServer } from "node:http";
import { watch } from "node:fs";

import { markdownToHtml } from "./markdown.mjs";
import { parseFrontmatter } from "./frontmatter.mjs";
import { renderPage, siteConfig } from "./layout.mjs";
import { homeContent } from "./pages/home.mjs";
import { baryContent } from "./pages/bary.mjs";
import { workingGroupsContent } from "./pages/working-groups.mjs";
import { aboutContent } from "./pages/about.mjs";

const ROOT = dirname(dirname(fileURLToPath(import.meta.url))); // website/
const CONTENT_BLOG = join(ROOT, "content", "blog");
const PUBLIC_DIR = join(ROOT, "public");
const DIST = join(ROOT, "dist");

function write(relPath, html) {
  const outPath = join(DIST, relPath);
  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, html);
}

function formatDate(d) {
  return new Date(d).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

function loadPosts() {
  if (!existsSync(CONTENT_BLOG)) return [];
  return readdirSync(CONTENT_BLOG)
    .filter((f) => f.endsWith(".md"))
    .map((file) => {
      const raw = readFileSync(join(CONTENT_BLOG, file), "utf8");
      const { data, body } = parseFrontmatter(raw);
      const slugFromFile = file.replace(/^\d{4}-\d{2}-\d{2}-/, "").replace(/\.md$/, "");
      if (!data.title) throw new Error(`${file}: missing \`title\` in frontmatter`);
      if (!data.date) throw new Error(`${file}: missing \`date\` in frontmatter`);
      return {
        slug: data.slug || slugFromFile,
        title: data.title,
        date: data.date,
        author: data.author || siteConfig().name,
        summary: data.summary || "",
        tags: Array.isArray(data.tags) ? data.tags : [],
        html: markdownToHtml(body),
        file,
      };
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date));
}

function postCard(post) {
  const tags = post.tags.map((t) => `<span class="tag">${t}</span>`).join(" ");
  return `
    <a class="post-row" href="/blog/${post.slug}/">
      <div class="post-meta">${tags} <span>${formatDate(post.date)}</span></div>
      <h3>${post.title}</h3>
      <p>${post.summary}</p>
    </a>`;
}

function buildBlogIndex(posts) {
  const list = posts.length
    ? `<div class="post-list">${posts.map(postCard).join("\n")}</div>`
    : `<p style="color:var(--text-dim)">No posts yet — check back soon.</p>`;
  const content = `
    <section class="page-head">
      <div class="wrap">
        <h1>Blog</h1>
        <p>Design notes, research findings, and progress updates from the Barycent working groups.</p>
      </div>
    </section>
    <section>
      <div class="wrap">
        <p class="rss-note"><a href="/blog/rss.xml">Subscribe via RSS →</a></p>
        ${list}
      </div>
    </section>`;
  write(
    "blog/index.html",
    renderPage({
      title: "Blog",
      description: "Design notes, research findings, and progress updates from the Barycent working groups.",
      path: "/blog/",
      content,
    })
  );
}

function buildBlogPost(post) {
  const tags = post.tags.map((t) => `<span class="tag">${t}</span>`).join(" ");
  const content = `
    <article>
      <div class="wrap">
        <div class="post-header">
          <a class="back-link" href="/blog/">← Back to blog</a>
          <div class="post-meta">${tags} <span>${formatDate(post.date)}</span> <span>· ${post.author}</span></div>
          <h1>${post.title}</h1>
          ${post.summary ? `<p class="lede">${post.summary}</p>` : ""}
        </div>
        <div class="prose">
          ${post.html}
        </div>
      </div>
    </article>`;
  write(
    `blog/${post.slug}/index.html`,
    renderPage({
      title: post.title,
      description: post.summary || post.title,
      path: `/blog/${post.slug}/`,
      content,
    })
  );
}

function buildRss(posts) {
  const site = siteConfig();
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const items = posts
    .map(
      (p) => `
    <item>
      <title>${esc(p.title)}</title>
      <link>${site.url}/blog/${p.slug}/</link>
      <guid>${site.url}/blog/${p.slug}/</guid>
      <pubDate>${new Date(p.date).toUTCString()}</pubDate>
      <description>${esc(p.summary)}</description>
    </item>`
    )
    .join("");
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"><channel>
  <title>${site.name} Blog</title>
  <link>${site.url}/blog/</link>
  <description>${esc(site.tagline)}</description>${items}
</channel></rss>`;
  write("blog/rss.xml", xml);
}

function buildSitemap(staticPaths, posts) {
  const site = siteConfig();
  const urls = [...staticPaths, ...posts.map((p) => `/blog/${p.slug}/`)]
    .map((p) => `  <url><loc>${site.url}${p}</loc></url>`)
    .join("\n");
  write("sitemap.xml", `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`);
  write("robots.txt", `User-agent: *\nAllow: /\nSitemap: ${site.url}/sitemap.xml\n`);
}

function build() {
  const start = Date.now();
  rmSync(DIST, { recursive: true, force: true });
  mkdirSync(DIST, { recursive: true });
  cpSync(PUBLIC_DIR, DIST, { recursive: true });

  write("index.html", renderPage({ title: siteConfig().name, description: siteConfig().tagline, path: "/", content: homeContent() }));
  write(
    "bary/index.html",
    renderPage({
      title: "Bary",
      description: "Run AI coding agents from different vendors as one team — with enforced cross-vendor review, pass/fail gates, and budget caps.",
      path: "/bary/",
      content: baryContent(),
    })
  );
  write(
    "working-groups/index.html",
    renderPage({
      title: "Working Groups",
      description: "Barycent is organized into working groups — the AI Working Group is active today, with room for more fields to come.",
      path: "/working-groups/",
      content: workingGroupsContent(),
    })
  );
  write(
    "about/index.html",
    renderPage({ title: "About", description: "Barycent is the shared center two bodies orbit together — an open source org that fills gaps instead of competing.", path: "/about/", content: aboutContent() })
  );

  const posts = loadPosts();
  buildBlogIndex(posts);
  posts.forEach(buildBlogPost);
  buildRss(posts);
  buildSitemap(["/", "/bary/", "/working-groups/", "/about/", "/blog/"], posts);

  write("404.html", renderPage({ title: "Page not found", description: "This page does not exist.", path: "/404.html", content: `<section class="page-head"><div class="wrap"><h1>404</h1><p>That page doesn't exist. <a href="/">Back home →</a></p></div></section>` }));

  console.log(`built ${posts.length} post(s) + static pages → dist/ (${Date.now() - start}ms)`);
}

function serve() {
  build();
  const port = 4000;
  const server = createServer((req, res) => {
    let path = decodeURIComponent(req.url.split("?")[0]);
    let filePath = join(DIST, path);
    if (path.endsWith("/")) filePath = join(filePath, "index.html");
    if (!existsSync(filePath) || statSync(filePath).isDirectory()) {
      const asHtml = join(DIST, path, "index.html");
      filePath = existsSync(asHtml) ? asHtml : join(DIST, "404.html");
    }
    const ext = filePath.split(".").pop();
    const types = { html: "text/html", css: "text/css", js: "application/javascript", svg: "image/svg+xml", png: "image/png", xml: "application/xml", txt: "text/plain" };
    res.writeHead(existsSync(filePath) ? 200 : 404, { "Content-Type": types[ext] || "application/octet-stream" });
    res.end(readFileSync(existsSync(filePath) ? filePath : join(DIST, "404.html")));
  });
  server.listen(port, () => console.log(`serving dist/ at http://localhost:${port}`));
  let pending = null;
  watch(ROOT, { recursive: true }, (_, filename) => {
    if (!filename || filename.startsWith("dist/")) return;
    clearTimeout(pending);
    pending = setTimeout(() => {
      try {
        build();
      } catch (e) {
        console.error("rebuild failed:", e.message);
      }
    }, 150);
  });
}

if (process.argv.includes("--serve")) {
  serve();
} else {
  build();
}
