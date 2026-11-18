import { orbitHero, orbitStatic } from "../orbit.mjs";
import { constellationMap } from "../constellation.mjs";
import { highlightYaml } from "../highlight.mjs";

const PIPELINE_YAML = `pipeline: feature
steps:
  - name: implement
    agent: claude-code
    prompt: "Implement: {task}"

  - name: review
    agents: [codex, copilot]
    quorum: 2
    must_differ_from: implement   # cross-vendor review, enforced
    prompt: "Review the latest commit. Reply APPROVE or REQUEST_CHANGES."

  - name: test
    run: cargo test

gates: [tests_pass, review_quorum, human_approval]
budget: { max_usd: 5.00 }`;

export function homeContent() {
  return `
    <section class="hero">
      <div class="wrap split">
        <div>
          <div class="eyebrow"><span class="dot"></span> BARYCENTER, <em>n.</em> — the point two bodies orbit together</div>
          <h1>No single body owns the <span class="grad">center of gravity</span>.</h1>
          <p class="lede">
            Barycent is the open source organization built on that idea. We're starting with an AI Working Group
            that makes coding agents from different companies work as one accountable team — in orbit around the
            same goal, with nobody at the center.
          </p>
          <div class="hero-cta">
            <a class="btn btn-primary btn-lg" href="/bary/">Explore Bary →</a>
            <a class="btn btn-ghost btn-lg" href="https://github.com/barycent" target="_blank" rel="noopener noreferrer">View on GitHub</a>
          </div>
          <div class="hud-row">
            <span class="hud-chip"><strong>APACHE-2.0</strong> · no CLA</span>
            <span class="hud-chip">builds on <strong>AAIF · AGNTCY · NANDA</strong></span>
            <span class="hud-chip">WG-01 <strong>AI</strong> · active</span>
          </div>
        </div>
        ${orbitHero({ caption: "Two bodies orbiting Barycent's shared gold barycenter" })}
      </div>
    </section>

    <div class="orbit-divider"></div>

    <section>
      <div class="wrap reveal">
        <div class="stat-row">
          <div class="stat"><b>3</b><span>open foundations we build on, not compete with</span></div>
          <div class="stat"><b>0</b><span>CLAs required to contribute</span></div>
          <div class="stat"><b>6→1</b><span>original product ideas, unified into one flagship</span></div>
        </div>
      </div>
    </section>

    <section class="nebula nebula--indigo">
      <div class="wrap split split--rev">
        ${orbitStatic("The Earth–Moon barycenter, inside the Earth but off its center")}
        <div class="reveal">
          <div class="section-head" style="margin-bottom:20px">
            <div class="kicker">[ 01 · THE PHYSICS OF IT ]</div>
            <h2>Even Earth doesn't orbit its own center.</h2>
          </div>
          <p style="color:var(--text-dim);font-size:16.5px;margin:0 0 16px">
            A barycenter is the common center of mass that two or more bodies orbit — not the center of either one.
            Earth and the Moon circle a barycenter roughly <strong>4,670&nbsp;km</strong> from Earth's core: inside
            the planet, but about <strong>1,700&nbsp;km</strong> off to one side. Even Earth, more than 80 times
            heavier than the Moon, doesn't get to be the center by default. It just gets to be closer to it.
          </p>
          <p style="color:var(--text-dim);font-size:16.5px;margin:0">
            Open source ecosystems work the same way. The center is shared — and everyone, including the biggest
            player in the room, orbits it.
          </p>
        </div>
      </div>
    </section>

    <section>
      <div class="wrap">
        <div class="section-head reveal">
          <div class="kicker">[ 02 · MISSION: BARY ]</div>
          <h2>Bary: agents that check each other's work</h2>
          <p>Claude Code writes the patch. Codex and Copilot review it — and bary refuses a pipeline where an agent reviews its own code. Tests gate the merge. A budget cap stops runaway spend before it happens.</p>
        </div>
        <div class="grid grid-3 reveal-stagger reveal">
          <div class="card card--sky">
            <div class="icon">✓</div>
            <h3>Cross-vendor review gates</h3>
            <p>Every review step can require approval from an agent that didn't write the code — enforced by the pipeline, not a convention.</p>
          </div>
          <div class="card card--indigo">
            <div class="icon">⎇</div>
            <h3>Isolated worktrees</h3>
            <p>Each run gets its own git worktree and branch, so parallel agents never overwrite each other's work.</p>
          </div>
          <div class="card card--gold">
            <div class="icon">$</div>
            <h3>Cost ledger &amp; budget caps</h3>
            <p>Every agent call is logged with its cost. A hard <code>max_usd</code> stops the run before a $1,000 surprise.</p>
          </div>
          <div class="card card--indigo">
            <div class="icon">⌁</div>
            <h3>Built on AgentBridge</h3>
            <p>Drives Claude Code, Codex, Copilot CLI, Cursor, goose and OpenCode through AGNTCY's AgentBridge over A2A/SLIM — no new protocol to learn.</p>
          </div>
          <div class="card card--sky">
            <div class="icon">⛨</div>
            <h3>Gates, not guesswork</h3>
            <p>Tests pass, review quorum, human approval — a run only lands when every gate it declares is satisfied.</p>
          </div>
          <div class="card card--gold">
            <div class="icon">↗</div>
            <h3>Plugs into what you have</h3>
            <p>No new workspace to adopt. Bary is a CLI and a GitHub PR check that sits beside the agents and the repo you already use.</p>
          </div>
        </div>
      </div>
    </section>

    <section class="band">
      <div class="wrap">
        <div class="section-head reveal">
          <div class="kicker">[ 03 · FLIGHT RECORDER ]</div>
          <h2>One YAML file, one accountable team</h2>
        </div>
        <div class="codepanel reveal">
          <div class="bar"><span class="d" style="background:#f5b83d"></span><span class="d" style="background:#818cf8"></span><span class="d" style="background:#38bdf8"></span>&nbsp; bary://.bary/pipeline.yaml</div>
          <pre><code>${highlightYaml(PIPELINE_YAML)}</code></pre>
        </div>
      </div>
    </section>

    <div class="orbit-divider"></div>

    <section class="nebula nebula--gold">
      <div class="wrap">
        <div class="section-head reveal">
          <div class="kicker">[ 04 · THE SYSTEM ]</div>
          <h2>We don't compete with gravity. We add to it.</h2>
          <p>The Agentic AI Foundation, AGNTCY, and Project NANDA already define how agents talk to each other, discover each other, and prove who they are. Barycent doesn't orbit around replacing any of that — it fills the gap none of them claim: making agents from different vendors actually work together as an accountable team.</p>
        </div>
        <div class="reveal">
          ${constellationMap()}
        </div>
      </div>
    </section>

    <section>
      <div class="wrap">
        <div class="section-head reveal">
          <div class="kicker">[ 05 · CONSTELLATIONS ]</div>
          <h2>One foundation. Every constellation its own shape.</h2>
          <p>Barycent isn't an AI company with a generic name — it's a general-purpose open source organization. What we call a "working group" is really a constellation: a set of projects that found a shared shape around a real gap.</p>
        </div>
        <div class="grid grid-3 reveal-stagger reveal">
          <div class="card card--sky">
            <div class="icon">◎</div>
            <h3>AI Working Group <span style="color:var(--accent-strong);font-size:12px;font-weight:700">· ACTIVE</span></h3>
            <p>Cross-vendor agent collaboration, registries, identity, and observability — all complementary to AAIF, AGNTCY and NANDA.</p>
          </div>
          <div class="card card--indigo">
            <div class="icon">◌</div>
            <h3>Quantum <span style="color:var(--text-faint);font-size:12px;font-weight:700">· NEBULA</span></h3>
            <p>Not a constellation yet — a nebula: the raw material a working group forms from, once there's a real gap and real maintainers.</p>
          </div>
          <div class="card card--gold">
            <div class="icon">⇄</div>
            <h3>Fill gaps, don't compete</h3>
            <p>Every Barycent project names the upstream projects it builds on and sends improvements back. We never fork a standard.</p>
          </div>
        </div>
      </div>
    </section>

    <section>
      <div class="wrap reveal">
        <div class="cta-band">
          <h2>Start a pipeline in under five minutes</h2>
          <p>bary is Apache-2.0 and self-hosted. No account, no lock-in.</p>
          <div class="cta-row">
            <a class="btn btn-primary btn-lg" href="https://github.com/barycent/bary" target="_blank" rel="noopener noreferrer">Get started on GitHub</a>
            <a class="btn btn-ghost btn-lg" href="/blog/">Read the blog</a>
          </div>
        </div>
      </div>
    </section>
  `;
}
