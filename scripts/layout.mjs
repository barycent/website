// HTML shell shared by every page: <head>, header/nav, footer, and a tiny
// mobile-nav script. Pages supply their own <main> content.

import { starfieldStyle } from "./starfield.mjs";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/bary/", label: "Bary" },
  { href: "/working-groups/", label: "Working Groups" },
  { href: "/blog/", label: "Blog" },
  { href: "/about/", label: "About" },
];

const SOCIAL = {
  github: "https://github.com/barycent",
  x: "https://x.com/barycentlabs",
  linkedin: "https://www.linkedin.com/company/barycent",
  instagram: "https://www.instagram.com/barycentlabs",
};

export function siteConfig() {
  return {
    name: "Barycent",
    tagline: "The shared center for open source agent collaboration.",
    url: "https://barycent.dev",
    social: SOCIAL,
  };
}

function iconGithub() {
  return `<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z"/></svg>`;
}
function iconX() {
  return `<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231ZM16.17 19.77h1.833L7.084 4.126H5.117Z"/></svg>`;
}
function iconLinkedin() {
  return `<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.03-1.85-3.03-1.85 0-2.14 1.45-2.14 2.94v5.66H9.34V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14ZM7.12 20.45H3.56V9h3.56v11.45Z"/></svg>`;
}
function iconInstagram() {
  return `<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.06 1.8.25 2.23.42.56.21.96.47 1.38.89.42.42.68.82.89 1.38.17.42.36 1.06.42 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.06 1.17-.25 1.8-.42 2.23-.21.56-.47.96-.89 1.38-.42.42-.82.68-1.38.89-.42.17-1.06.36-2.23.42-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.06-1.8-.25-2.23-.42a3.71 3.71 0 0 1-1.38-.89 3.71 3.71 0 0 1-.89-1.38c-.17-.42-.36-1.06-.42-2.23-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.06-1.17.25-1.8.42-2.23.21-.56.47-.96.89-1.38.42-.42.82-.68 1.38-.89.42-.17 1.06-.36 2.23-.42 1.27-.06 1.65-.07 4.85-.07ZM12 0C8.74 0 8.33.01 7.05.07c-1.28.06-2.15.26-2.91.56a5.88 5.88 0 0 0-2.13 1.39A5.88 5.88 0 0 0 .62 4.14c-.3.76-.5 1.63-.56 2.91C0 8.33 0 8.74 0 12s.01 3.67.07 4.95c.06 1.28.26 2.15.56 2.91.3.78.71 1.44 1.39 2.13.68.68 1.35 1.09 2.13 1.39.76.3 1.63.5 2.91.56C8.33 24 8.74 24 12 24s3.67-.01 4.95-.07c1.28-.06 2.15-.26 2.91-.56a5.88 5.88 0 0 0 2.13-1.39 5.88 5.88 0 0 0 1.39-2.13c.3-.76.5-1.63.56-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.28-.26-2.15-.56-2.91a5.88 5.88 0 0 0-1.39-2.13A5.88 5.88 0 0 0 19.86.63c-.76-.3-1.63-.5-2.91-.56C15.67.01 15.26 0 12 0Zm0 5.84A6.16 6.16 0 1 0 12 18.16 6.16 6.16 0 0 0 12 5.84Zm0 10.16a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm6.41-10.4a1.44 1.44 0 1 1-2.88 0 1.44 1.44 0 0 1 2.88 0Z"/></svg>`;
}

export function renderPage({ title, description, path = "/", ogImage = "/img/og-image.png", bodyClass = "", content }) {
  const site = siteConfig();
  const fullTitle = title === site.name ? `${site.name} — ${site.tagline}` : `${title} · ${site.name}`;
  const canonical = `${site.url}${path}`;

  const navLinks = NAV.map(
    (n) => `<a href="${n.href}"${path === n.href ? ' aria-current="page"' : ""}>${n.label}</a>`
  ).join("\n        ");

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${fullTitle}</title>
<meta name="description" content="${description}">
<link rel="canonical" href="${canonical}">
<link rel="icon" type="image/png" sizes="32x32" href="/img/favicon-32.png">
<link rel="icon" type="image/png" sizes="192x192" href="/img/favicon-192.png">
<link rel="apple-touch-icon" href="/img/favicon-192.png">
<link rel="alternate" type="application/rss+xml" title="${site.name} Blog" href="/blog/rss.xml">
<link rel="stylesheet" href="/css/site.css">
${starfieldStyle()}

<meta property="og:type" content="website">
<meta property="og:site_name" content="${site.name}">
<meta property="og:title" content="${fullTitle}">
<meta property="og:description" content="${description}">
<meta property="og:url" content="${canonical}">
<meta property="og:image" content="${site.url}${ogImage}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:site" content="@barycentlabs">
<meta name="twitter:title" content="${fullTitle}">
<meta name="twitter:description" content="${description}">
<meta name="twitter:image" content="${site.url}${ogImage}">
</head>
<body class="${bodyClass}">
  <div class="starfield" aria-hidden="true"></div>
  <div class="comet" aria-hidden="true"></div>
  <header class="site-header">
    <div class="wrap">
      <a class="brand" href="/">
        <img src="/img/appicon.svg" alt="">
        ${site.name}
      </a>
      <button class="nav-toggle" aria-label="Toggle navigation" id="nav-toggle">☰</button>
      <nav class="nav" id="nav">
        ${navLinks}
        <a class="btn btn-primary" href="${site.social.github}/bary" target="_blank" rel="noopener noreferrer">GitHub</a>
      </nav>
    </div>
  </header>

  <main>
${content}
  </main>

  <footer class="site-footer">
    <div class="wrap">
      <div class="footer-grid">
        <div>
          <div class="footer-brand"><img src="/img/appicon.svg" alt="">${site.name}</div>
          <p style="max-width:320px;font-size:14px;margin:0">${site.tagline} Built on the open agent ecosystem — AAIF, AGNTCY and Project NANDA — not in competition with it.</p>
        </div>
        <div class="footer-col">
          <h5>Project</h5>
          <a href="/bary/">Bary orchestrator</a>
          <a href="/working-groups/">Working groups</a>
          <a href="/blog/">Blog</a>
          <a href="${site.social.github}" target="_blank" rel="noopener noreferrer">GitHub org</a>
        </div>
        <div class="footer-col">
          <h5>Resources</h5>
          <a href="${site.social.github}/bary#readme" target="_blank" rel="noopener noreferrer">Documentation</a>
          <a href="${site.social.github}/.github/blob/main/CONTRIBUTING.md" target="_blank" rel="noopener noreferrer">Contributing</a>
          <a href="/blog/rss.xml">RSS feed</a>
        </div>
        <div class="footer-col">
          <h5>Company</h5>
          <a href="/about/">About</a>
          <a href="${site.social.github}/.github/blob/main/GOVERNANCE.md" target="_blank" rel="noopener noreferrer">Governance</a>
        </div>
      </div>
      <div class="footer-bottom">
        <span>© ${new Date().getFullYear()} The Barycent Authors · Apache-2.0</span>
        <div class="social-row">
          <a href="${site.social.github}" target="_blank" rel="noopener noreferrer" aria-label="GitHub">${iconGithub()}</a>
          <a href="${site.social.x}" target="_blank" rel="noopener noreferrer" aria-label="X">${iconX()}</a>
          <a href="${site.social.linkedin}" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">${iconLinkedin()}</a>
          <a href="${site.social.instagram}" target="_blank" rel="noopener noreferrer" aria-label="Instagram">${iconInstagram()}</a>
        </div>
      </div>
    </div>
  </footer>

  <script>
    document.getElementById('nav-toggle')?.addEventListener('click', () => {
      document.getElementById('nav')?.classList.toggle('open');
    });
  </script>
  <script src="/js/reveal.js" defer></script>
</body>
</html>
`;
}
