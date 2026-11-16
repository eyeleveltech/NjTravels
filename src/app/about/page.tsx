"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Counter from "@/components/Counter/Counter";
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
          { opacity: 1, y: 0, duration: 0.7 },
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

      // B. Milestones vertical line draw & item slide-in
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

      // C. Chips rows entrance
      gsap.fromTo(
        ".about-chips__row",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".about-chips",
            start: "top 75%",
          },
        }
      );

      // F. CTA section entrance
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
                <p className="eyebrow mono about-hero__eyebrow">ABOUT SAHI TRAVELS</p>
                <h1 id="about-heading" className="h1 about-hero__heading">
                  <span className="about-hero__heading-mask">
                    <span className="about-hero__heading-line">Your Journey.</span>
                  </span>
                  <br />
                  <span className="about-hero__heading-mask">
                    <span className="about-hero__heading-line serif-i">Our Responsibility.</span>
                  </span>
                </h1>
                <p className="about-hero__body">
                  Sahi Travels is a professionally managed travel and transportation company with a journey that began in 2000 in Keelakarai, Ramanathapuram District. With a strong foundation built on trust, service and customer satisfaction, Sahi Travels expanded its presence to Chennai in 2005 and continued to grow as a comprehensive travel service provider. Over the years, we have served 10,000+ travellers and successfully covered more than 20 lakh kilometres through our travel and transportation operations, reflecting our commitment to safe, dependable and comfortable journeys. Today, Sahi Travels provides a wide range of travel, tourism, documentation, transportation, event and premium travel solutions for individuals, families, businesses, groups, VIP guests and production teams.
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

        {/* SECTION B — MILESTONES TIMELINE */}
        <section className="about-milestones sec" aria-labelledby="milestones-heading">
          <div className="wrap">
            <header className="sec-head">
              <div>
                <p className="eyebrow mono">OUR MILESTONES</p>
                <h2 id="milestones-heading" className="h2">
                  Built on trust, <span className="serif-i">measured in journeys.</span>
                </h2>
              </div>
            </header>

            <div className="about-milestones__track-wrap">
              <div ref={timelineLineRef} className="about-milestones__line" aria-hidden="true" />
              <div className="about-milestones__list">
                {/* Milestone 1 */}
                <article className="about-milestone">
                  <div className="about-milestone__dot mono" aria-hidden="true">01</div>
                  <div className="about-milestone__card">
                    <span className="about-milestone__year mono">2000</span>
                    <p className="about-milestone__text">
                      Journey begins in Keelakarai, Ramanathapuram District.
                    </p>
                  </div>
                </article>

                {/* Milestone 2 */}
                <article className="about-milestone">
                  <div className="about-milestone__dot mono" aria-hidden="true">02</div>
                  <div className="about-milestone__card">
                    <span className="about-milestone__year mono">2005</span>
                    <p className="about-milestone__text">
                      Expansion to Chennai.
                    </p>
                  </div>
                </article>

                {/* Milestone 3 */}
                <article className="about-milestone">
                  <div className="about-milestone__dot mono" aria-hidden="true">03</div>
                  <div className="about-milestone__card">
                    <div className="about-milestone__metric">
                      <Counter value={10000} locale="en-IN" suffix="+" />
                    </div>
                    <p className="about-milestone__text">
                      travellers served.
                    </p>
                  </div>
                </article>

                {/* Milestone 4 */}
                <article className="about-milestone">
                  <div className="about-milestone__dot mono" aria-hidden="true">04</div>
                  <div className="about-milestone__card">
                    <div className="about-milestone__metric">
                      <Counter value={2000000} locale="en-IN" suffix="km+" />
                    </div>
                    <p className="about-milestone__text">
                      covered.
                    </p>
                  </div>
                </article>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION C — WHO WE SERVE AND WHAT WE OFFER */}
        <section className="about-chips sec" aria-labelledby="scope-heading">
          <div className="wrap">
            <header className="sec-head">
              <div>
                <p className="eyebrow mono">SOLUTIONS & CLIENTELE</p>
                <h2 id="scope-heading" className="h2">
                  Tailored support for <span className="serif-i">every journey.</span>
                </h2>
              </div>
            </header>

            <div className="about-chips__container">
              {/* Row 1: Who we serve */}
              <div className="about-chips__row">
                <h3 className="about-chips__row-title mono">Who we serve</h3>
                <ul className="chips about-chips__list">
                  <li>Individuals</li>
                  <li>Families</li>
                  <li>Businesses</li>
                  <li>Groups</li>
                  <li>VIP guests</li>
                  <li>Production teams</li>
                </ul>
              </div>

              {/* Row 2: What we provide */}
              <div className="about-chips__row">
                <h3 className="about-chips__row-title mono">What we provide</h3>
                <ul className="chips about-chips__list">
                  <li>Travel</li>
                  <li>Tourism</li>
                  <li>Documentation</li>
                  <li>Transportation</li>
                  <li>Event</li>
                  <li>Premium travel solutions</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION D — CLOSING CALL TO ACTION */}
        <section className="about-cta sec" aria-labelledby="cta-heading">
          <div className="wrap">
            <div className="about-cta__content">
              <h2 id="cta-heading" className="h2 about-cta__heading">
                Ready when you <span className="serif-i">are.</span>
              </h2>
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

