import { APP_NAME, BUY_ME_A_COFFEE_URL, GITHUB_REPO_URL } from "./shared/config";

type StatusItem = {
  label: string;
  state: string;
};

const statusItems: StatusItem[] = [
  { label: "Mechanics", state: "Not implemented" },
  { label: "Planner formulas", state: "Not implemented" },
  { label: "OpenFront integration", state: "Not implemented" },
  { label: "Extension runtime", state: "Reserved only" },
];

function CoffeeIcon() {
  return (
    <svg aria-hidden="true" className="coffee-icon" viewBox="0 0 24 24">
      <path d="M5 7h11v6a5 5 0 0 1-5 5H10a5 5 0 0 1-5-5V7Z" />
      <path d="M16 9h2.2a2.3 2.3 0 0 1 0 4.6H16" />
      <path d="M7 4h7" />
      <path d="M8 21h7" />
    </svg>
  );
}

function SupportButton() {
  return (
    <a className="support-button" href={BUY_ME_A_COFFEE_URL} rel="noreferrer" target="_blank">
      <CoffeeIcon />
      Buy me a coffee
    </a>
  );
}

function StatusList() {
  return (
    <ul className="status-list" aria-label="Phase 1A status">
      {statusItems.map((item) => (
        <li key={item.label}>
          <span>{item.label}</span>
          <strong>{item.state}</strong>
        </li>
      ))}
    </ul>
  );
}

export function App() {
  return (
    <main className="app-shell">
      <nav className="top-nav" aria-label="Primary navigation">
        <a className="brand" href="#top" aria-label={`${APP_NAME} home`}>
          <span className="brand-mark">OF</span>
          <span>{APP_NAME}</span>
        </a>
        <div className="nav-links">
          <a href="#fair-play">Fair Play</a>
          <a href="#assumptions">Assumptions</a>
          <a href="#sandbox">Sandbox</a>
          <a href={GITHUB_REPO_URL} rel="noreferrer" target="_blank">
            GitHub
          </a>
        </div>
        <SupportButton />
      </nav>

      <section className="intro" id="top" aria-labelledby="page-title">
        <div className="intro-copy">
          <p className="phase-label">Phase 1A app shell</p>
          <h1 id="page-title">{APP_NAME}</h1>
          <p className="intro-text">
            A local-first training workspace for OpenFront-style thinking, currently limited to
            fair-play guardrails, project status, and future sandbox entry points.
          </p>
        </div>
        <div className="status-panel" aria-label="Current implementation status">
          <p className="notice">No game mechanics implemented yet</p>
          <StatusList />
        </div>
      </section>

      <section className="content-grid" aria-label="Project guardrails">
        <article className="info-card fair-play-card" id="fair-play">
          <div className="card-kicker">Fair Play</div>
          <h2>Offline and manual by default</h2>
          <p>
            This shell does not integrate with OpenFront, automate gameplay, read hidden state,
            modify clients, request host permissions, or run content scripts.
          </p>
        </article>

        <article className="info-card assumptions-card" id="assumptions">
          <div className="card-kicker">Recommendation Language</div>
          <h2>Optimal under stated assumptions</h2>
          <p>
            Future recommendations must name their inputs, simplifications, and source confidence.
            Nothing here claims exact OpenFront behavior until mechanics are verified and documented.
          </p>
        </article>

        <article className="info-card roadmap-card">
          <div className="card-kicker">Roadmap Status</div>
          <h2>Ready for a visible shell</h2>
          <p>
            Phase 1A adds the website foundation, quality gates, shared config, and reserved
            extension folders without enabling extension runtime behavior.
          </p>
        </article>
      </section>

      <section className="sandbox-band" id="sandbox" aria-labelledby="sandbox-title">
        <div>
          <p className="phase-label">Future workspace</p>
          <h2 id="sandbox-title">Sandbox area reserved</h2>
          <p>
            Scenario tools, mechanic models, scoring, saved scenarios, and extension behavior remain
            intentionally unimplemented until approved in later phases.
          </p>
        </div>
        <button className="sandbox-button" type="button" disabled>
          Sandbox coming later
        </button>
      </section>
    </main>
  );
}
