import { buildJourney } from "@/lib/artGenerators";

export default function JourneySection() {
  return (
    <section
      className="journey"
      id="journey"
      data-nila-hide
      aria-label="Ride along with Nila"
    >
      <div className="journey__stage">
        <div
          className="journey__scene"
          id="scene"
          role="img"
          aria-label="Illustration: Nila travels by taxi, plane, train, coach and luxury car to a wedding venue"
          dangerouslySetInnerHTML={{ __html: buildJourney() }}
        />
        <header className="journey__head">
          <p className="eyebrow">Ride along with Sahi</p>
          <h2 className="h2">
            One trip, every ride — <span className="serif-i">one desk handles it.</span>
          </h2>
        </header>

        {/* Welcome Banner — Airport Meet & Greet Greeting Card */}
        <aside
          id="jWelcome"
          className="journey__welcome"
          aria-label="Airport Arrival Greeting"
        >
          <div className="journey__welcome-inner">
            <p className="journey__welcome-badge mono">
              SAHI TRAVELS · ARRIVAL DESK
            </p>
            <h3 className="journey__welcome-title">
              Welcome to your destination.
            </h3>
            <p className="journey__welcome-text">
              Your flight has landed. Our representative is here to welcome you.
            </p>
          </div>
        </aside>

        <div className="journey__cards">
          <article className="jcard is-active" id="jcard-0" role="tabpanel" aria-labelledby="jtab-0" data-card="0">
            <div aria-live="polite" className="jcard__live">
              <p className="jcard__step mono">Step 1 of 7 · Taxi</p>
              <h3>Chauffeur-Driven Mobility</h3>
            </div>
            <p>
              Seamless airport transfers, railway pickups, local commutes, and intercity trips with zero delays and total comfort.
            </p>
            <ul className="chips">
              <li>Airport</li>
              <li>Railway</li>
              <li>Outstation</li>
            </ul>
          </article>
          <article className="jcard" id="jcard-1" role="tabpanel" aria-labelledby="jtab-1" data-card="1">
            <div aria-live="polite" className="jcard__live">
              <p className="jcard__step mono">Step 2 of 7 · Flight</p>
              <h3>Air ticketing</h3>
            </div>
            <p>
              Domestic and international flights, group and corporate bookings,
              bulk fares, reissues and cancellations.
            </p>
            <ul className="chips">
              <li>Domestic</li>
              <li>International</li>
              <li>Group fares</li>
            </ul>
          </article>
          <article className="jcard" id="jcard-2" role="tabpanel" aria-labelledby="jtab-2" data-card="2">
            <div aria-live="polite" className="jcard__live">
              <p className="jcard__step mono">Step 3 of 7 · Arrival</p>
              <h3>Meet and greet</h3>
            </div>
            <p>
              A named host waits for you at arrival with a placard, helps with luggage, and takes you to your vehicle or hotel.
            </p>
            <ul className="chips">
              <li>Arrival</li>
              <li>Placard</li>
              <li>Luggage help</li>
            </ul>
          </article>
          <article className="jcard" id="jcard-3" role="tabpanel" aria-labelledby="jtab-3" data-card="3">
            <div aria-live="polite" className="jcard__live">
              <p className="jcard__step mono">Step 4 of 7 · Rail</p>
              <h3>Railway transfers</h3>
            </div>
            <p>
              Pickups and drops at the station, with intercity transport ready
              for the next leg.
            </p>
            <ul className="chips">
              <li>Station pickup</li>
              <li>Intercity</li>
            </ul>
          </article>
          <article className="jcard" id="jcard-4" role="tabpanel" aria-labelledby="jtab-4" data-card="4">
            <div aria-live="polite" className="jcard__live">
              <p className="jcard__step mono">Step 5 of 7 · Coach</p>
              <h3>Premium coaches</h3>
            </div>
            <p>
              Volvo and Mercedes-Benz luxury coaches, AC, executive and
              sleeper coaches for groups, tours and companies.
            </p>
            <ul className="chips">
              <li>Volvo</li>
              <li>Mercedes-Benz</li>
              <li>Sleeper</li>
            </ul>
          </article>
          <article className="jcard" id="jcard-5" role="tabpanel" aria-labelledby="jtab-5" data-card="5">
            <div aria-live="polite" className="jcard__live">
              <p className="jcard__step mono">Step 6 of 7 · VIP car</p>
              <h3>VIP &amp; luxury cars</h3>
            </div>
            <p>
              Toyota Vellfire, Mercedes-Benz, BMW, Audi and premium SUVs for
              VIP arrivals, executives and weddings.
            </p>
            <ul className="chips">
              <li>Vellfire</li>
              <li>Mercedes-Benz</li>
              <li>BMW</li>
              <li>Audi</li>
            </ul>
          </article>
          <article className="jcard" id="jcard-6" role="tabpanel" aria-labelledby="jtab-6" data-card="6">
            <div aria-live="polite" className="jcard__live">
              <p className="jcard__step mono">Step 7 of 7 · Arrival</p>
              <h3>Hotels &amp; events</h3>
            </div>
            <p>
              Hotels, resorts and villas — and wedding and event transport,
              coordinated from the same desk.
            </p>
            <ul className="chips">
              <li>Hotels</li>
              <li>Weddings</li>
              <li>Events</li>
            </ul>
          </article>
        </div>
        <ol className="journey__steps" role="tablist" aria-label="Jump to a step">
          <li role="presentation">
            <button
              type="button"
              role="tab"
              id="jtab-0"
              aria-controls="jcard-0"
              aria-selected="true"
              tabIndex={0}
              data-step="0"
              className="is-on"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                aria-hidden="true"
              >
                <path d="M3 15l2-5.5A2 2 0 0 1 6.9 8h10.2a2 2 0 0 1 1.9 1.5L21 15v3H3z" />
                <circle cx="7.5" cy="18" r="1.6" />
                <circle cx="16.5" cy="18" r="1.6" />
              </svg>
              <span>Taxi</span>
            </button>
          </li>
          <li role="presentation">
            <button
              type="button"
              role="tab"
              id="jtab-1"
              aria-controls="jcard-1"
              aria-selected="false"
              tabIndex={-1}
              data-step="1"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5z" />
              </svg>
              <span>Flight</span>
            </button>
          </li>
          <li role="presentation">
            <button
              type="button"
              role="tab"
              id="jtab-2"
              aria-controls="jcard-2"
              aria-selected="false"
              tabIndex={-1}
              data-step="2"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                aria-hidden="true"
              >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              <span>Meet &amp; greet</span>
            </button>
          </li>
          <li role="presentation">
            <button
              type="button"
              role="tab"
              id="jtab-3"
              aria-controls="jcard-3"
              aria-selected="false"
              tabIndex={-1}
              data-step="3"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                aria-hidden="true"
              >
                <rect x="5" y="3" width="14" height="14" rx="3" />
                <path d="M5 10h14M8 21l2-4M16 21l-2-4" />
              </svg>
              <span>Rail</span>
            </button>
          </li>
          <li role="presentation">
            <button
              type="button"
              role="tab"
              id="jtab-4"
              aria-controls="jcard-4"
              aria-selected="false"
              tabIndex={-1}
              data-step="4"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                aria-hidden="true"
              >
                <rect x="2" y="5" width="20" height="12" rx="2" />
                <path d="M2 11h20M8 5v6M14 5v6" />
                <circle cx="7" cy="18" r="1.6" />
                <circle cx="17" cy="18" r="1.6" />
              </svg>
              <span>Coach</span>
            </button>
          </li>
          <li role="presentation">
            <button
              type="button"
              role="tab"
              id="jtab-5"
              aria-controls="jcard-5"
              aria-selected="false"
              tabIndex={-1}
              data-step="5"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                aria-hidden="true"
              >
                <path d="M3 16l2-6A2 2 0 0 1 6.9 8.6h10.2a2 2 0 0 1 1.9 1.4L21 16v2H3z" />
                <circle cx="7.5" cy="18.5" r="1.6" />
                <circle cx="16.5" cy="18.5" r="1.6" />
                <path d="M12 2.5l.9 1.8 2 .3-1.4 1.4.3 2-1.8-.9-1.8.9.3-2-1.4-1.4 2-.3z" />
              </svg>
              <span>VIP car</span>
            </button>
          </li>
          <li role="presentation">
            <button
              type="button"
              role="tab"
              id="jtab-6"
              aria-controls="jcard-6"
              aria-selected="false"
              tabIndex={-1}
              data-step="6"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                aria-hidden="true"
              >
                <path d="M4 21V9l8-5 8 5v12M9 21v-6h6v6" />
              </svg>
              <span>Arrival</span>
            </button>
          </li>
        </ol>
        <div className="journey__bar" aria-hidden="true">
          <span></span>
        </div>
      </div>
    </section>
  );
}
