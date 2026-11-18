// Generates a starfield as a single <style> block: a handful of layered
// radial-gradient backgrounds on two pseudo-elements, no DOM nodes per star.
// Deterministic (seeded PRNG) so the build is reproducible — rerunning
// `npm run build` doesn't produce a diff-only-noise change in dist/.

function mulberry32(seed) {
  let a = seed >>> 0;
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function starLayer(rand, count, sizePx, color) {
  const stops = [];
  for (let i = 0; i < count; i++) {
    const x = (rand() * 100).toFixed(2);
    const y = (rand() * 100).toFixed(2);
    stops.push(`radial-gradient(${sizePx}px ${sizePx}px at ${x}% ${y}%, ${color}, transparent 100%)`);
  }
  return stops.join(",\n      ");
}

export function starfieldStyle(seed = 1337) {
  const rand = mulberry32(seed);
  const small = starLayer(rand, 70, 1, "rgba(232,234,246,0.85)");
  const medium = starLayer(rand, 30, 1.7, "rgba(165,243,252,0.8)");
  const bright = starLayer(rand, 9, 2.6, "rgba(245,184,61,0.85)");

  return `<style>
    .starfield::before, .starfield::after { content: ""; position: absolute; inset: -8%; }
    .starfield::before {
      background-image:
      ${small},
      ${medium};
      animation: star-drift 220s linear infinite;
    }
    .starfield::after {
      background-image:
      ${bright};
      animation: star-drift 320s linear infinite reverse, star-twinkle 7s ease-in-out infinite;
    }
    @keyframes star-drift { from { transform: translate(0, 0); } to { transform: translate(-1.5%, -2.5%); } }
  </style>`;
}
