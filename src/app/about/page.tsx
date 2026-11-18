"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import SkipLink from "@/components/layout/SkipLink";
import GuideAside from "@/components/ui/GuideAside";

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroImageRef = useRef<HTMLDivElement>(null);
  const timelineLineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      // A. Hero entrance timeline
      const heroTl = gsap.timeline({ defaults: { ease: "power2.out" } });
      heroTl
        .fromTo(
          ".about-hero__eyebrow",
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.6 }
        )
        .fromTo(
          ".about-hero__heading-line",
          { yPercent: 100, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 0.8, stagger: 0.12 },
          "-=0.3"
        )
        .fromTo(
          ".about-hero__body",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.7, stagger: 0.12 },
          "-=0.4"
        );

      // Hero image parallax drift (~40px)
      if (heroImageRef.current) {
        gsap.to(heroImageRef.current, {
          y: 40,
          ease: "none",
          scrollTrigger: {
            trigger: ".about-hero",
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }

      // B. Solutions vertical line draw & item slide-in
      if (timelineLineRef.current) {
        gsap.fromTo(
          timelineLineRef.current,
          { scaleY: 0, transformOrigin: "top center" },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: ".about-milestones__track-wrap",
              start: "top 70%",
              end: "bottom 60%",
              scrub: true,
            },
          }
        );
      }

      const milestones = gsap.utils.toArray<HTMLElement>(".about-milestone");
      milestones.forEach((item) => {
        gsap.fromTo(
          item,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: item,
              start: "top 65%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      // C. Key Pillars entrance
      const pillars = gsap.utils.toArray<HTMLElement>(".about-principle-card");
      pillars.forEach((item, idx) => {
        gsap.fromTo(
          item,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay: idx * 0.08,
            ease: "power2.out",
            scrollTrigger: {
              trigger: ".about-principles__grid",
              start: "top 75%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      // D. Closing section entrance
      gsap.fromTo(
        ".about-cta__content",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".about-cta",
            start: "top 80%",
          },
        }
      );
    });

    // Refresh ScrollTrigger after DOM & images settle
    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 400);

    return () => {
      clearTimeout(refreshTimer);
      mm.revert();
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <>
      <SkipLink />
      <Nav />
      <main id="main" ref={containerRef} className="about-page">
        {/* SECTION A — HERO */}
        <section className="about-hero sec" aria-labelledby="about-heading">
          <div className="wrap">
            <div className="about-hero__grid">
              <div className="about-hero__text-col">
                <p className="eyebrow mono about-hero__eyebrow">
                  OPERATED BY NJ TRAVEL SERVICE • EST. 2000 • CHENNAI
                </p>
                <h1 id="about-heading" className="h1 about-hero__heading">
                  <span className="about-hero__heading-mask">
                    <span className="about-hero__heading-line">25+ Years of Trusted Heritage,</span>
                  </span>
                  <br />
                  <span className="about-hero__heading-mask">
                    <span className="about-hero__heading-line serif-i">Driven by Modern Innovation</span>
                  </span>
                </h1>
                <p className="about-hero__body">
                  Every great journey begins with a strong foundation. Founded in the year 2000, Sahi Travels embarked on its journey with a singular, noble mission: to provide every traveler with a safe, seamless, and unforgettable travel experience. Built on customer trust and warmth, it stands today as a proud and iconic identity in the travel industry.
                </p>
                <p className="about-hero__body">
                  Today, that trusted legacy is spearheaded into a bold new era of massive expansion and global standards by NJ Travel Service. Headquartered in the heart of Chennai at Nungambakkam, Sahi Travels (Operated by NJ Travel Service) has evolved into a premier, full-service travel and luxury transportation powerhouse.
                </p>
              </div>

              <div className="about-hero__image-col">
                <div ref={heroImageRef} className="about-hero__image-wrap">
                  <img
                    src="/assets/img/passenger-arrival.jpg"
                    alt="Family and travellers arriving safely at the airport with luggage"
                    className="about-hero__img"
                    width={1200}
                    height={896}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION B — OUR COMPREHENSIVE TRAVEL & LUXURY SOLUTIONS */}
        <section className="about-milestones sec" aria-labelledby="solutions-eyebrow">
          <div className="wrap">
            <header className="sec-head">
              <div>
                <p id="solutions-eyebrow" className="eyebrow mono">
                  Our Comprehensive Travel & Luxury Solutions
                </p>
                <p className="about-milestones__intro">
                  Under the visionary leadership and dynamic management of NJ Travel Service, we have multiplied our horizons to offer comprehensive, end-to-end solutions:
                </p>
              </div>
            </header>

            <div className="about-milestones__track-wrap">
              <div ref={timelineLineRef} className="about-milestones__line" aria-hidden="true" />
              <div className="about-milestones__list">
                {/* Item 01 */}
                <article className="about-milestone">
                  <div className="about-milestone__dot mono" aria-hidden="true">01</div>
                  <div className="about-milestone__card">
                    <h3 className="about-milestone__title">Global Travel Solutions</h3>
                    <p className="about-milestone__text">
                      Domestic and international flight ticketing, worldwide visa assistance, hotel reservations, foreign currency exchange, and travel insurance—all seamlessly delivered under one roof.
                    </p>
                  </div>
                </article>

                {/* Item 02 */}
                <article className="about-milestone">
                  <div className="about-milestone__dot mono" aria-hidden="true">02</div>
                  <div className="about-milestone__card">
                    <h3 className="about-milestone__title">Curated Holiday Packages</h3>
                    <p className="about-milestone__text">
                      Tailor-made family vacations, romantic honeymoon getaways, and corporate retreats crafted with precision to match your exact preferences.
                    </p>
                  </div>
                </article>

                {/* Item 03 */}
                <article className="about-milestone">
                  <div className="about-milestone__dot mono" aria-hidden="true">03</div>
                  <div className="about-milestone__card">
                    <h3 className="about-milestone__title">Royal Luxury Fleet</h3>
                    <p className="about-milestone__text">
                      An elite, chauffeur-driven fleet featuring ultra-luxury vehicles like Toyota Vellfire, Mercedes-Benz, BMW, and Audi, alongside Innova Crysta, Ertiga, Swift Dzire, and luxury Volvo coaches—catering exclusively to corporate executives, VIPs, celebrities, and film productions.
                    </p>
                  </div>
                </article>

                {/* Item 04 */}
                <article className="about-milestone">
                  <div className="about-milestone__dot mono" aria-hidden="true">04</div>
                  <div className="about-milestone__card">
                    <h3 className="about-milestone__title">B2B & Corporate Management</h3>
                    <p className="about-milestone__text">
                      Precision-driven, punctual ground transportation and complete travel logistics for corporate enterprises and large-scale events.
                    </p>
                  </div>
                </article>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION C — KEY PILLAR OUR COMMITMENT & STRENGTH */}
        <section className="about-principles sec" aria-labelledby="pillars-heading">
          <div className="wrap">
            <header className="sec-head">
              <div>
                <p className="eyebrow mono">Key Pillar</p>
                <h2 id="pillars-heading" className="h2">
                  Our Commitment & Strength
                </h2>
              </div>
            </header>

            <div className="about-principles__grid">
              {/* Card 1 */}
              <article className="about-principle-card">
                <h3 className="about-principle-card__title">Trusted Since 2000</h3>
                <p className="about-principle-card__text">
                  Over two decades of customer trust, integrity, and excellence built by Sahi Travels.
                </p>
              </article>

              {/* Card 2 */}
              <article className="about-principle-card">
                <h3 className="about-principle-card__title">Powered by NJ Travel Service</h3>
                <p className="about-principle-card__text">
                  Modern management, large-scale expansion, and global operational standards from Nungambakkam, Chennai.
                </p>
              </article>

              {/* Card 3 */}
              <article className="about-principle-card">
                <h3 className="about-principle-card__title">Elite Luxury Fleet</h3>
                <p className="about-principle-card__text">
                  Chauffeur-driven luxury cars and coaches specialized for VIPs, corporate leaders, and film productions.
                </p>
              </article>

              {/* Card 4 */}
              <article className="about-principle-card">
                <h3 className="about-principle-card__title">24/7 Dedicated Support</h3>
                <p className="about-principle-card__text">
                  Round-the-clock assistance ensuring seamless travel logistics at every mile.
                </p>
              </article>
            </div>
          </div>
        </section>

        {/* SECTION D — CLOSING */}
        <section className="about-cta sec" aria-labelledby="cta-paragraph">
          <div className="wrap">
            <div className="about-cta__content">
              <p id="cta-paragraph" className="about-cta__body">
                Sahi Travels is our proud foundation; NJ Travel Service is the driving force propelling us to new heights. We don’t just arrange trips—we craft royal journeys defined by safety, comfort, and 24/7 dedicated hospitality.
              </p>
              <div className="about-cta__buttons">
                <Link className="btn btn--navy" href="/#enquiry">
                  Plan a trip <span className="btn__arrow" aria-hidden="true">→</span>
                </Link>
                <Link className="btn btn--line" href="/contact#query">
                  Ask a question
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <GuideAside />
    </>
  );
}
