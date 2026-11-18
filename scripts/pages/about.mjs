import { orbitHero } from "../orbit.mjs";

export function aboutContent() {
  return `
    <section class="page-head">
      <div class="wrap split split--tight">
        <div>
          <h1>About Barycent</h1>
          <p>A <em>barycenter</em> is the point two orbiting bodies share. The Earth and the Moon both circle a point between them, and neither one <em>is</em> that point. That's the organization we're building: a shared center that no single vendor, company, or contributor owns.</p>
        </div>
        ${orbitHero({ size: "sm", caption: "Two bodies, one shared gravitational center" })}
      </div>
    </section>

    <section>
      <div class="wrap">
        <div class="prose reveal">
          <h2>The physics of it</h2>
          <p>In orbital mechanics, a barycenter is the common center of mass that two or more bodies orbit — not the center of either body individually. The Earth and the Moon orbit a barycenter roughly 4,670 km from Earth's core: inside the planet, but about 1,700 km off its exact center. Earth is more than 80 times heavier than the Moon, and it still doesn't get to claim the center outright. It just orbits closer to it.</p>
          <p>Open source ecosystems work the same way. The center of an ecosystem isn't owned by whoever shipped first, or whoever is biggest — it's shared, and even the largest contributor still orbits it rather than occupying it.</p>

          <h2>What we do</h2>
          <p>Barycent is an independent open source organization. We build practical tools where fields, standards, and communities meet — starting with agentic AI, with room to grow into other fields (quantum computing and beyond) as new working groups form. We call those working groups <strong>constellations</strong>: sets of projects that found a shared shape around a real gap.</p>

          <h2>Why we exist</h2>
          <p>The open agent ecosystem — the Agentic AI Foundation (AAIF), AGNTCY, and Project NANDA — already covers protocols, gateways, registries, and runtimes. What's missing is the collaboration layer: teams of agents from different vendors that check each other's work, with accountability baked into the pipeline instead of left to convention. That gap is where Barycent's AI Working Group — and its flagship, <a href="/bary/">Bary</a> — sits.</p>

          <h2>How we stay in orbit, not in the way</h2>
          <p>Every Barycent project names the upstream projects it depends on. If a fix belongs upstream, we send it there instead of keeping a fork. We never build a competing protocol or registry — we compose the ones that already exist. See how that plays out on the <a href="/">home page's ecosystem map</a>.</p>

          <h2>Mission control (governance)</h2>
          <p>Apache-2.0 across every project, contributions via DCO sign-off (no CLA), and a public roadmap. Working groups form around a real gap and real maintainers — not the other way around.</p>
        </div>
      </div>
    </section>

    <section class="band">
      <div class="wrap">
        <div class="cta-band reveal">
          <h2>Get involved</h2>
          <p>Star the repos, join a discussion, or propose a constellation.</p>
          <div class="cta-row">
            <a class="btn btn-primary btn-lg" href="https://github.com/barycent" target="_blank" rel="noopener noreferrer">github.com/barycent</a>
            <a class="btn btn-ghost btn-lg" href="/working-groups/">View constellations</a>
          </div>
        </div>
      </div>
    </section>
  `;
}
