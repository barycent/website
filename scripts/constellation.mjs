// The ecosystem map: Barycent positioned among the open projects it builds
// on, drawn as a small constellation. Links point at the real upstream
// projects — this diagram is a claim about how the org is positioned, not
// just decoration, so it has to point somewhere real.

const NODES = [
  { id: "aaif", label: "AAIF", caption: "MCP, A2A, agentgateway, goose", x: 120, y: 70, href: "https://aaif.io" },
  { id: "agntcy", label: "AGNTCY", caption: "SLIM, OASF, AgentBridge", x: 560, y: 70, href: "https://agntcy.org" },
  { id: "nanda", label: "Project NANDA", caption: "Agent discovery (MIT)", x: 340, y: 300, href: "https://projectnanda.org" },
];

export function constellationMap() {
  const barycenter = { x: 340, y: 160 };
  const lines = NODES.map((n) => `<line class="link-line" x1="${barycenter.x}" y1="${barycenter.y}" x2="${n.x}" y2="${n.y}"/>`).join("\n      ");
  const nodes = NODES.map(
    (n) => `
      <a href="${n.href}" target="_blank" rel="noopener noreferrer">
        <circle class="node-dot" cx="${n.x}" cy="${n.y}" r="6"/>
        <text class="node-label" x="${n.x}" y="${n.y - 18}" text-anchor="middle">${n.label}</text>
        <text class="node-caption" x="${n.x}" y="${n.y + 22}" text-anchor="middle">${n.caption}</text>
      </a>`
  ).join("\n");

  return `
    <svg class="constellation" viewBox="0 0 680 340" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Barycent positioned alongside AAIF, AGNTCY and Project NANDA, connected to a shared barycenter">
      ${lines}
      ${nodes}
      <circle class="node-dot node-dot--self" cx="${barycenter.x}" cy="${barycenter.y}" r="9"/>
      <!-- Label sits to the side, not centered above/below: a centered caption
           directly under this node would sit on the same vertical line as the
           NANDA connector below it, and the dashed line would cut through the
           text. Offsetting sideways avoids that regardless of node layout. -->
      <text class="node-label" x="${barycenter.x + 20}" y="${barycenter.y - 4}" text-anchor="start">Barycent</text>
      <text class="node-caption" x="${barycenter.x + 20}" y="${barycenter.y + 16}" text-anchor="start">the collaboration layer</text>
    </svg>`;
}
