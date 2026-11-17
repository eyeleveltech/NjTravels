"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, useCallback } from "react";

export default function Nav() {
  const pathname = usePathname();
  const [activeSection, setActiveSection] = useState<string>("top");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeTimerRef = useRef<NodeJS.Timeout | null>(null);
  const menuItemsRef = useRef<(HTMLAnchorElement | null)[]>([]);

  // Track sticky scroll past 40px
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // IntersectionObserver to follow home page active section
  useEffect(() => {
    if (pathname !== "/") return;

    const sectionIds = ["top", "journey", "ride", "fleet", "docs", "visas", "holidays", "events", "corporate", "enquire", "enquiry"];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-20% 0px -60% 0px", threshold: 0.1 }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [pathname]);

  // Handle dropdown hover with 150ms delay
  const handleMouseEnter = () => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    setDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    closeTimerRef.current = setTimeout(() => {
      setDropdownOpen(false);
    }, 150);
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(e.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };

    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen]);

  // Keyboard navigation for dropdown
  const handleTriggerKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setDropdownOpen(true);
      setTimeout(() => {
        menuItemsRef.current[0]?.focus();
      }, 50);
    } else if (e.key === "Escape") {
      setDropdownOpen(false);
    }
  };

  const handleItemKeyDown = (e: React.KeyboardEvent<HTMLAnchorElement>, index: number) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = (index + 1) % 4;
      menuItemsRef.current[next]?.focus();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const prev = (index - 1 + 4) % 4;
      menuItemsRef.current[prev]?.focus();
    } else if (e.key === "Escape") {
      e.preventDefault();
      setDropdownOpen(false);
      triggerRef.current?.focus();
    }
  };

  const closeDropdown = useCallback(() => {
    setDropdownOpen(false);
  }, []);

  // Determine active states
  const isHomeActive = pathname === "/" && (activeSection === "top" || activeSection === "journey" || !activeSection);
  const isAboutActive = pathname === "/about";
  const isContactActive = pathname === "/contact";
  const isFleetActive = pathname === "/" && (activeSection === "fleet" || activeSection === "ride");
  const isServicesActive =
    pathname === "/" &&
    ["docs", "visas", "holidays", "events", "corporate"].includes(activeSection);

  return (
    <>
      <header className={`nav ${isScrolled ? "nav--scrolled" : ""}`} id="nav">
        <Link className="brand" href="/" aria-label="Sahi Travels — Home">
          <svg viewBox="0 0 24 32" aria-hidden="true" className="brand__logo">
            <rect
              x="2"
              y="2"
              width="20"
              height="28"
              rx="9"
              fill="none"
              stroke="#C75A3A"
              strokeWidth="2.4"
            />
            <path
              d="M6 21c4-3 8-4 12-4"
              fill="none"
              stroke="#3A0F34"
              strokeWidth="2.4"
              strokeLinecap="round"
            />
          </svg>
          <span className="brand__content" style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "center" }}>
            <span className="brand__wordmark" style={{ display: "inline-flex", alignItems: "baseline", gap: "7px" }}>
              <span className="brand__word">SAHI</span>
              <span className="brand__sub">Travels</span>
            </span>
            <span className="brand__tagline" style={{ display: "block" }}>Operated by NJ Travel Service</span>
          </span>
        </Link>

        <nav className="nav__links" aria-label="Primary">
          <Link
            href="/"
            className={isHomeActive ? "is-active" : ""}
          >
            Home
          </Link>

          <Link
            href="/about"
            className={isAboutActive ? "is-active" : ""}
          >
            About us
          </Link>

          <div
            className="nav__dropdown"
            ref={dropdownRef}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <button
              ref={triggerRef}
              type="button"
              className={`nav__dropdown-trigger ${isServicesActive ? "is-active" : ""}`}
              aria-expanded={dropdownOpen}
              aria-haspopup="menu"
              aria-controls="services-dropdown"
              onClick={() => setDropdownOpen((prev) => !prev)}
              onKeyDown={handleTriggerKeyDown}
            >
              Services
              <svg
                className={`nav__chevron ${dropdownOpen ? "is-open" : ""}`}
                viewBox="0 0 16 16"
                aria-hidden="true"
              >
                <path
                  d="M3.5 6L8 10.5L12.5 6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            <div
              id="services-dropdown"
              className={`nav__dropdown-menu ${dropdownOpen ? "is-open" : ""}`}
              role="menu"
              aria-label="Services"
            >
              <Link
                ref={(el) => { menuItemsRef.current[0] = el; }}
                href="/#visas"
                role="menuitem"
                className="nav__dropdown-item"
                onClick={closeDropdown}
                onKeyDown={(e) => handleItemKeyDown(e, 0)}
              >
                Visas &amp; passports
              </Link>
              <Link
                ref={(el) => { menuItemsRef.current[1] = el; }}
                href="/#holidays"
                role="menuitem"
                className="nav__dropdown-item"
                onClick={closeDropdown}
                onKeyDown={(e) => handleItemKeyDown(e, 1)}
              >
                Holidays
              </Link>
              <Link
                ref={(el) => { menuItemsRef.current[2] = el; }}
                href="/#events"
                role="menuitem"
                className="nav__dropdown-item"
                onClick={closeDropdown}
                onKeyDown={(e) => handleItemKeyDown(e, 2)}
              >
                Events
              </Link>
              <Link
                ref={(el) => { menuItemsRef.current[3] = el; }}
                href="/#corporate"
                role="menuitem"
                className="nav__dropdown-item"
                onClick={closeDropdown}
                onKeyDown={(e) => handleItemKeyDown(e, 3)}
              >
                Corporate
              </Link>
            </div>
          </div>

          <Link
            href="/#fleet"
            className={isFleetActive ? "is-active" : ""}
          >
            Fleet
          </Link>

          <Link
            href="/contact"
            className={isContactActive ? "is-active" : ""}
          >
            Contact
          </Link>
        </nav>

        <div className="nav__right">
          <Link className="btn btn--navy btn--sm nav__cta" href="/#enquiry">
            Plan a trip <span className="btn__arrow" aria-hidden="true">→</span>
          </Link>
          <button
            className="nav__menu"
            type="button"
            aria-expanded="false"
            aria-controls="menu"
          >
            Menu
          </button>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      <div className="menu" id="menu" aria-hidden="true">
        <div className="menu__content">
          <Link href="/">Home</Link>
          <Link href="/about">About us</Link>
          
          <div className="menu__group">
            <span className="menu__group-heading mono">Services</span>
            <Link href="/#visas" className="menu__sublink">Visas &amp; passports</Link>
            <Link href="/#holidays" className="menu__sublink">Holidays</Link>
            <Link href="/#events" className="menu__sublink">Events</Link>
            <Link href="/#corporate" className="menu__sublink">Corporate</Link>
          </div>

          <Link href="/#fleet">Fleet</Link>
          <Link href="/contact">Contact</Link>
          
          <Link href="/#enquiry" className="menu__cta-link">
            Plan a trip <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </>
  );
}
