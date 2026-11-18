import { CONTACT_DETAILS, SOCIAL_LINKS } from "@/data/contact";

function renderSocialIcon(platform: string) {
  switch (platform) {
    case "instagram":
      return (
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
        </svg>
      );
    case "facebook":
      return (
        <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
        </svg>
      );
    case "linkedin":
      return (
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
          <rect x="2" y="9" width="4" height="12" />
          <circle cx="4" cy="4" r="2" />
        </svg>
      );
    case "x":
      return (
        <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor" aria-hidden="true">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      );
    case "youtube":
      return (
        <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
      );
    case "whatsapp":
      return (
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
        </svg>
      );
    default:
      return null;
  }
}

export default function Footer() {
  return (
    <footer
      className="footer"
      data-nila="Safe travels! Tap me any time for shortcuts."
      data-nila-pose="wave"
    >
      <div className="wrap">
        <div className="footer__top">
          <p className="footer__line">
            Your reliable <span className="serif-i">travel partner.</span>
          </p>
          <a className="btn btn--navy" href="#enquire">
            Plan a trip <span className="btn__arrow" aria-hidden="true">→</span>
          </a>
        </div>

        <div className="footer__layout">
          {/* LEFT SIDE: Contact, Explore & Company */}
          <div className="footer__left-side">
            <div className="footer__block">
              <h3 className="mono">Contact</h3>
              <a data-contact="phone" href={CONTACT_DETAILS.phone.telLink}>
                {CONTACT_DETAILS.phone.display}
              </a>
              <a data-contact="whatsapp" href={CONTACT_DETAILS.whatsapp.link} target="_blank" rel="noopener noreferrer">
                {CONTACT_DETAILS.whatsapp.label}
              </a>
              <a data-contact="email" href={CONTACT_DETAILS.email.mailtoLink}>
                {CONTACT_DETAILS.email.address}
              </a>
              <a data-contact="website" href={CONTACT_DETAILS.website.url} target="_blank" rel="noopener noreferrer">
                {CONTACT_DETAILS.website.display}
              </a>
            </div>

            <div className="footer__block">
              <h3 className="mono">Explore</h3>
              <a href="#journey">The journey</a>
              <a href="#ride">Taxis, cars, coaches &amp; flights</a>
              <a href="#docs">Visas &amp; passports</a>
              <a href="#holidays">Holidays &amp; pilgrimage</a>
              <a href="#events">Events &amp; film</a>
            </div>

            <div className="footer__block">
              <h3 className="mono">Company</h3>
              <a href="/about">About us</a>
              <a href="/contact">Contact</a>
            </div>
          </div>

          {/* RIGHT SIDE: Our Offices & Follow Us */}
          <div className="footer__right-side">
            <div className="footer__block footer__block--offices">
              <h3 className="mono">Our offices</h3>
              <ul className="footer__office-list" aria-label="Our office locations">
                <li>Chennai</li>
                <li>Dubai</li>
                <li>Bangkok</li>
                <li>Brunei</li>
                <li>Trichy</li>
              </ul>
            </div>

            <div className="footer__block footer__block--social">
              <h3 className="mono">Follow us</h3>
              <div className="footer__social-links">
                {SOCIAL_LINKS.map((item) => (
                  <a
                    key={item.platform}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Follow Sahi Travels on ${item.label}`}
                    className="footer__social-item"
                  >
                    <span className="footer__social-icon" aria-hidden="true">
                      {renderSocialIcon(item.platform)}
                    </span>
                    <span>{item.label}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="footer__brand" style={{ marginTop: "40px", marginBottom: "16px" }}>
          <img
            src="/assets/img/logo.png"
            alt="Sahi Travels logo"
            className="footer__logo"
            width={47}
            height={48}
            decoding="async"
            style={{ height: "48px", width: "auto" }}
          />
        </div>
        <p className="footer__word display" aria-hidden="true">
          Sahi Travels
        </p>
        <div className="footer__base mono">
          <span>
            © <span data-year>2026</span> Sahi Travels · Operated by NJ Travel Service
          </span>
          <div className="footer__base-socials" aria-label="Social media channels">
            {SOCIAL_LINKS.map((item) => (
              <a
                key={item.platform}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={item.label}
                title={item.label}
                className="footer__base-social-btn"
              >
                {renderSocialIcon(item.platform)}
              </a>
            ))}
          </div>
          <span>Established 2000</span>
        </div>
      </div>
    </footer>
  );
}
