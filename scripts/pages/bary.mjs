export function baryContent() {
  return `
    <section class="page-head">
      <div class="wrap">
        <div class="eyebrow"><span class="dot"></span> [ v0.1 · EARLY · APACHE-2.0 ]</div>
        <h1>Bary</h1>
        <p>Run AI coding agents from different vendors as one team — with enforced cross-vendor review, pass/fail gates, and a budget cap that stops runaway spend before it happens.</p>
      </div>
    </section>

    <section>
      <div class="wrap">
        <div class="section-head reveal">
          <div class="kicker">[ 01 · THE PROBLEM ]</div>
          <h2>Running many agents isn't the same as a team that checks itself</h2>
          <p>Desktop orchestrators already let you run a dozen agents in parallel worktrees. What's missing is accountability: nothing stops an agent from approving its own patch, nothing caps spend before it's too late, and review still falls back on you.</p>
        </div>
        <div class="grid grid-3 reveal-stagger reveal">
          <div class="card"><h3>Self-review</h3><p>One agent writes the code; nothing independent checks it before merge.</p></div>
          <div class="card"><h3>Cost blowups</h3><p>Fan-out with no spend ceiling has produced real four-figure bills overnight.</p></div>
          <div class="card"><h3>Review burden</h3><p>"My time shifted from producing code to reviewing code" — a common complaint once agents multiply.</p></div>
        </div>
      </div>
    </section>

    <section class="band">
      <div class="wrap">
        <div class="section-head reveal">
          <div class="kicker">[ 02 · FLIGHT PLAN ]</div>
          <h2>Plan → implement → cross-vendor review → test → merge</h2>
        </div>
        <div class="steps reveal">
          <div class="step"><div class="n">1</div><div><h4>Describe the pipeline once</h4><p>A small YAML file lists the roles: who implements, who reviews, what must pass, and what the budget is.</p></div></div>
          <div class="step"><div class="n">2</div><div><h4>bary runs it in an isolated worktree</h4><p>Each run gets its own git branch, so parallel runs never collide or overwrite each other.</p></div></div>
          <div class="step"><div class="n">3</div><div><h4>Review is enforced, not requested</h4><p><code>must_differ_from</code> makes a same-vendor review a validation error — bary won't even start the run.</p></div></div>
          <div class="step"><div class="n">4</div><div><h4>Gates decide if it lands</h4><p>Tests pass, review quorum met, optional human approval — only then does the run pass.</p></div></div>
          <div class="step"><div class="n">5</div><div><h4>Every call is on the ledger</h4><p>Cost per agent, per step, per run — logged to <code>.bary/ledger.jsonl</code> and checked against the cap before every call.</p></div></div>
        </div>
      </div>
    </section>

    <section>
      <div class="wrap">
        <div class="section-head reveal">
          <div class="kicker">[ 03 · WHY NOT JUST USE… ]</div>
          <h2>Bary is the engine, not another desktop app</h2>
          <p>Orca, Paradev and similar tools run agents side by side well. Bary is a headless CLI and GitHub check that adds the layer none of them enforce.</p>
        </div>
        <div class="table-wrap reveal">
          <table>
            <thead><tr><th>Capability</th><th>Orca / Paradev</th><th>Buzz</th><th>Bary</th></tr></thead>
            <tbody>
              <tr><td>Run many agents in parallel</td><td class="yes">Yes</td><td class="yes">Yes</td><td class="yes">Yes</td></tr>
              <tr><td>Cross-vendor review <em>enforced</em></td><td class="no">No</td><td class="no">No</td><td class="yes">Yes</td></tr>
              <tr><td>Pass/fail gates (tests, quorum, human)</td><td class="no">No</td><td>Partial</td><td class="yes">Yes</td></tr>
              <tr><td>Budget cap + per-agent cost ledger</td><td class="no">No</td><td class="no">No</td><td class="yes">Yes</td></tr>
              <tr><td>Works inside your existing GitHub/CI</td><td>Partial (desktop app)</td><td class="no">New workspace</td><td class="yes">Yes</td></tr>
              <tr><td>Built on open standards (A2A/AgentBridge)</td><td class="no">No</td><td>Uses Nostr</td><td class="yes">Yes</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>

    <section class="band">
      <div class="wrap">
        <div class="section-head reveal">
          <div class="kicker">[ 04 · QUICK START ]</div>
          <h2>Five commands</h2>
        </div>
        <div class="codepanel reveal">
          <div class="bar"><span class="d" style="background:#f5b83d"></span><span class="d" style="background:#818cf8"></span><span class="d" style="background:#38bdf8"></span>&nbsp; terminal</div>
          <pre><code>cargo install --path crates/bary-cli

cd your-repo
bary init                                  # writes .bary/pipeline.yaml
bary validate                              # rejects same-vendor review
bary run --task "add a login page" --mock  # try it with no agents, no cost
bary ledger                                # spend per agent</code></pre>
        </div>
      </div>
    </section>

    <section>
      <div class="wrap">
        <div class="cta-band reveal">
          <h2>Read the design doc and roadmap</h2>
          <p>The full landscape research, differentiators and MVP plan live on GitHub.</p>
          <div class="cta-row">
            <a class="btn btn-primary btn-lg" href="https://github.com/barycent/bary" target="_blank" rel="noopener noreferrer">barycent/bary on GitHub</a>
            <a class="btn btn-ghost btn-lg" href="/blog/">Follow progress on the blog</a>
          </div>
        </div>
      </div>
    </section>
  `;
}
