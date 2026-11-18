// The orbit visual: two bodies circling a shared gold barycenter. Built in
// HTML/CSS, not SVG — each body is positioned at the edge of its own
// `.orbit` box, so rotating that box via CSS transform naturally sweeps the
// body around the box's center with no transform-origin ambiguity to get
// wrong (an SVG <g> rotated around an arbitrary point is easy to misplace).

export function orbitHero({ size = "lg", caption } = {}) {
  const sizeClass = size === "sm" ? " orbit-hero--sm" : "";
  return `
    <div class="orbit-hero${sizeClass}" role="img" aria-label="${caption || "Two bodies orbiting a shared center of gravity"}">
      <div class="ring ring--outer"></div>
      <div class="ring ring--inner"></div>
      <div class="orbit orbit--outer"><span class="body body--a"></span></div>
      <div class="orbit orbit--inner"><span class="body body--b"></span></div>
      <div class="barycenter"></div>
    </div>`;
}

/** Non-animated variant, for inline use inside a paragraph of text. */
export function orbitStatic(caption) {
  return `<div class="orbit-hero orbit-hero--sm orbit-hero--static" role="img" aria-label="${caption || "A barycenter"}">
      <div class="ring ring--outer"></div>
      <div class="ring ring--inner"></div>
      <div class="orbit orbit--outer"><span class="body body--a"></span></div>
      <div class="orbit orbit--inner"><span class="body body--b"></span></div>
      <div class="barycenter"></div>
    </div>`;
}
