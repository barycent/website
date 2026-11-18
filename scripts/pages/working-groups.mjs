import { orbitStatic } from "../orbit.mjs";

export function workingGroupsContent() {
  return `
    <section class="page-head">
      <div class="wrap">
        <div class="eyebrow"><span class="dot"></span> also known as: working groups</div>
        <h1>Constellations</h1>
        <p>A constellation isn't a single star — it's a set of stars that found a shared shape. That's how Barycent is organized: independent working groups under one governance and brand, each one owning its own field. None of them is required to be about AI.</p>
      </div>
    </section>

    <section>
      <div class="wrap">
        <div class="grid grid-3 reveal-stagger reveal">
          <div class="card">
            <div class="icon">◎</div>
            <h3>AI Working Group <span style="color:#38bdf8;font-size:12px;font-weight:700;margin-left:6px">ACTIVE</span></h3>
            <p style="margin-bottom:14px">Cross-vendor agent collaboration, discovery, shared memory, and observability. Builds on the Agentic AI Foundation (AAIF), AGNTCY and Project NANDA rather than competing with them.</p>
            <a href="/bary/" style="font-size:14px;font-weight:600">Flagship: Bary →</a>
          </div>
          <div class="card">
            <div class="icon">◌</div>
            <h3>Quantum <span style="color:var(--text-faint);font-size:12px;font-weight:700;margin-left:6px">NEBULA</span></h3>
            <p>Not a constellation yet — a nebula. The raw material a working group condenses from, once there's a real gap, a working prototype, and maintainers to run it. Nothing has formed here yet.</p>
          </div>
          <div class="card">
            <div class="icon">+</div>
            <h3>Propose a constellation</h3>
            <p style="margin-bottom:14px">Barycent will host a new working group once there's a real gap, a working prototype, and maintainers committed to running it in the open — the same bar the AI Working Group had to clear.</p>
            <a href="https://github.com/barycent/.github/discussions" target="_blank" rel="noopener noreferrer" style="font-size:14px;font-weight:600">Start a discussion →</a>
          </div>
        </div>
      </div>
    </section>

    <section class="band">
      <div class="wrap">
        <div class="section-head reveal">
          <div class="kicker">[ AI WORKING GROUP ]</div>
          <h2>What's built on what</h2>
          <p>Every Barycent project in this group names its upstream dependency and the gap it fills.</p>
        </div>
        <div class="table-wrap reveal">
          <table>
            <thead><tr><th>Project</th><th>Role</th><th>Built on</th><th>Status</th></tr></thead>
            <tbody>
              <tr><td><strong>Bary</strong></td><td>Cross-vendor agent orchestrator</td><td>AGNTCY AgentBridge, A2A/SLIM</td><td>In development</td></tr>
              <tr><td>Registry composer</td><td>Search &amp; compose across agent registries</td><td>AGNTCY Directory, MCP Registry, ACP registry, Agent Skills</td><td>Planned</td></tr>
              <tr><td>Team blackboard</td><td>Shared, provenance-tracked team memory (MCP server)</td><td>Graphiti / mem0</td><td>Planned</td></tr>
              <tr><td>Delegation Chains</td><td>Scoped-token delegation for agent-to-agent calls</td><td>MCP/A2A auth, AGNTCY Identity</td><td>Research</td></tr>
              <tr><td>TeamBench</td><td>Benchmark: mixed-vendor vs. single-vendor agent teams</td><td>OpenEnv, SWE-bench-style tasks</td><td>Research</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>

    <section>
      <div class="wrap split split--fixed">
        <div>
          <div class="section-head reveal" style="margin-bottom:0">
            <div class="kicker">[ FOUR RULES EVERY CONSTELLATION FOLLOWS ]</div>
            <h2>The governance stays constant, even as the shape changes</h2>
          </div>
        </div>
        ${orbitStatic("The shared governance every working group orbits")}
      </div>
    </section>

    <section style="padding-top:0">
      <div class="wrap">
        <div class="grid grid-4 reveal-stagger reveal">
          <div class="card"><h3>Fill gaps, don't compete</h3><p>We build on established open projects and contribute upstream. We never fork a standard.</p></div>
          <div class="card"><h3>Real use cases first</h3><p>Every project starts from a concrete problem and ships a working demo before it grows a spec.</p></div>
          <div class="card"><h3>Open by default</h3><p>Apache-2.0, governed in the open, no CLA required to contribute.</p></div>
          <div class="card"><h3>Sustainable</h3><p>Once a project is stable, optional commercial services fund maintenance — the open core stays complete without them.</p></div>
        </div>
      </div>
    </section>
  `;
}
