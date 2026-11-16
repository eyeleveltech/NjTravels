/* eslint-disable @next/next/no-img-element */
"use client";

import { useCallback, useRef } from "react";
import gsap from "gsap";
import ScrollStack, { ScrollStackItem } from "@/components/ScrollStack/ScrollStack";
import { buildGuide } from "@/lib/artGenerators";
import { playStamp } from "@/hooks/useSiteAnimations";

type StampSpec = {
  word: string;
  top: string;
  bottom: string;
  ink: string;
  shape: "circle" | "rect";
  rot: number;
};

type Paperwork = {
  img: string;
  alt: string;
  title: string;
  text: string;
  stamp: StampSpec;
};

const CARDS: Paperwork[] = [
  {
    img: "/assets/img/visa-services-clean.webp",
    alt: "Traveller documents and passport prepared for visa services",
    title: "Visa services",
    text: "Tourist, visit, business and student visas. Family and group applications, documents and appointments.",
    stamp: { word: "APPROVED", top: "VISA", bottom: "SAHI TRAVELS", ink: "#23796F", shape: "circle", rot: -11 },
  },
  {
    img: "/assets/img/passport-services-clean.webp",
    alt: "Official passport documents ready for passport renewals and services",
    title: "Passport services",
    text: "New passports, renewals and reissues, corrections and applications.",
    stamp: { word: "RENEWED", top: "PASSPORT", bottom: "SAHI TRAVELS", ink: "#7B3F6E", shape: "rect", rot: 7 },
  },
  {
    img: "/assets/img/certificate-attestation.png",
    alt: "Certified educational and official document for certificate attestation",
    title: "Certificate attestation",
    text: "Educational, marriage and birth certificates, commercial documents, embassy and MOFA-related attestation.",
    stamp: { word: "ATTESTED", top: "CERTIFIED", bottom: "SAHI TRAVELS", ink: "#B4511C", shape: "circle", rot: -6 },
  },
  {
    img: "/assets/img/travel insurance.png",
    alt: "Travel insurance coverage for domestic and international trips",
    title: "Travel insurance",
    text: "Domestic and international travel insurance.",
    stamp: { word: "INSURED", top: "TRAVEL", bottom: "DOMESTIC · INTL", ink: "#2F4573", shape: "rect", rot: 9 },
  },
];

/** Gap between the starts of two stamp animations, so they always land one after another. */
const STAMP_GAP_MS = 520;

function StampArt({ spec, index }: { spec: StampSpec; index: number }) {
  const id = `pw-stamp-${index}`;
  const mono = "IBM Plex Mono, ui-monospace, monospace";
  const display = "Archivo, Helvetica Neue, Arial, sans-serif";
  return (
    <svg className="paperwork-stamp" viewBox="-64 -64 128 128" aria-hidden="true" focusable="false">
      <defs>
        {/* rough rubber edges + uneven ink coverage */}
        <filter id={`${id}-ink`} x="-15%" y="-15%" width="130%" height="130%">
          <feTurbulence type="fractalNoise" baseFrequency="1.2" numOctaves="2" seed={index * 7 + 3} result="grain" />
          <feDisplacementMap in="SourceGraphic" in2="grain" scale="2.2" xChannelSelector="R" yChannelSelector="G" result="rough" />
          <feTurbulence type="fractalNoise" baseFrequency="0.07" numOctaves="3" seed={index * 13 + 5} result="blot" />
          <feColorMatrix in="blot" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  -2.2 0 0 0 2.05" result="mask" />
          <feComposite in="rough" in2="mask" operator="in" />
        </filter>
        <path id={`${id}-arcTop`} d="M-40 0A40 40 0 0 1 40 0" />
        <path id={`${id}-arcBot`} d="M-46 0A46 46 0 0 0 46 0" />
      </defs>
      <g filter={`url(#${id}-ink)`} fill={spec.ink} stroke={spec.ink}>
        {spec.shape === "circle" ? (
          <>
            <circle r="58" fill="none" strokeWidth="4.5" />
            <circle r="50" fill="none" strokeWidth="1.4" />
            <text fontFamily={mono} fontSize="10" fontWeight="500" letterSpacing="3" stroke="none" textAnchor="middle">
              <textPath href={`#${id}-arcTop`} startOffset="50%">{spec.top}</textPath>
            </text>
            <text fontFamily={mono} fontSize="8" fontWeight="500" letterSpacing="2" stroke="none" textAnchor="middle">
              <textPath href={`#${id}-arcBot`} startOffset="50%">{spec.bottom}</textPath>
            </text>
            <path d="M-47 -14H47M-47 14H47" strokeWidth="1.6" fill="none" />
            <text y="6.5" fontFamily={display} fontSize="17" fontWeight="800" letterSpacing="1" stroke="none" textAnchor="middle">
              {spec.word}
            </text>
          </>
        ) : (
          <>
            <rect x="-60" y="-36" width="120" height="72" rx="8" fill="none" strokeWidth="4.5" />
            <rect x="-52" y="-28" width="104" height="56" rx="4" fill="none" strokeWidth="1.3" />
            <text y="-13" fontFamily={mono} fontSize="9" fontWeight="500" letterSpacing="3" stroke="none" textAnchor="middle">
              {spec.top}
            </text>
            <text y="9" fontFamily={display} fontSize="19" fontWeight="800" letterSpacing="1" stroke="none" textAnchor="middle">
              {spec.word}
            </text>
            <path d="M-40 14.5H40" strokeWidth="1" fill="none" />
            <text y="23.5" fontFamily={mono} fontSize="7" fontWeight="500" letterSpacing="1.6" stroke="none" textAnchor="middle">
              {spec.bottom}
            </text>
          </>
        )}
      </g>
    </svg>
  );
}

function Stamper({ ink }: { ink: string }) {
  return (
    <svg className="paperwork-stamper" viewBox="0 0 120 125" aria-hidden="true" focusable="false">
      <ellipse cx="60" cy="26" rx="22" ry="20" fill="#B9875A" />
      <ellipse cx="53" cy="19" rx="8" ry="6" fill="#DDB083" opacity=".75" />
      <path d="M50 42H70L72.5 92H47.5Z" fill="#9C6B43" />
      <path d="M52 44H57L56 90H50.5Z" fill="#B88458" opacity=".7" />
      <rect x="10" y="90" width="100" height="26" rx="5" fill="#3A0F34" />
      <rect x="10" y="90" width="100" height="7" rx="3.5" fill="#5A2A52" />
      <rect x="16" y="116" width="88" height="9" rx="2" fill={ink} />
    </svg>
  );
}

export default function DocsSection() {
  const nextSlot = useRef(0);
  const timelines = useRef<(gsap.core.Timeline | null)[]>([]);

  // A card has landed in the stack: drop the stamper and leave the imprint.
  const handleReveal = useCallback((i: number, card: HTMLElement) => {
    const spec = CARDS[i]?.stamp;
    const stamp = card.querySelector<SVGSVGElement>(".paperwork-stamp");
    const stamper = card.querySelector<SVGSVGElement>(".paperwork-stamper");
    const photo = card.querySelector<HTMLElement>(".paperwork-card__img");
    if (!spec || !stamp) return;

    timelines.current[i]?.kill();
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      playStamp(stamp, { rotation: spec.rot, finalOpacity: 0.9 });
      return;
    }

    const now = performance.now();
    const start = Math.max(now, nextSlot.current);
    nextSlot.current = start + STAMP_GAP_MS;

    const tl = gsap.timeline({ delay: (start - now) / 1000 });
    if (stamper) {
      tl.set(stamper, { autoAlpha: 1, y: -120 }).to(stamper, { y: 0, duration: 0.26, ease: "power3.in" });
    }
    const imprint = playStamp(stamp, { rotation: spec.rot, finalOpacity: 0.9, duration: 0.12, ease: "power2.out" });
    if (imprint) tl.add(imprint);
    if (photo) tl.to(photo, { y: 2, duration: 0.06, yoyo: true, repeat: 1 }, "<");
    if (stamper) {
      tl.to(stamper, { y: -130, duration: 0.38, ease: "power2.out" }, "+=0.06").to(
        stamper,
        { autoAlpha: 0, duration: 0.2 },
        "<0.16"
      );
    }
    timelines.current[i] = tl;
  }, []);

  // The card scrolled back out of the stack: clear it so the stamp replays next time.
  const handleReset = useCallback((i: number, card: HTMLElement) => {
    timelines.current[i]?.kill();
    timelines.current[i] = null;
    const stamp = card.querySelector<SVGSVGElement>(".paperwork-stamp");
    const stamper = card.querySelector<SVGSVGElement>(".paperwork-stamper");
    const parts = [stamp, stamper].filter(Boolean) as SVGSVGElement[];
    gsap.killTweensOf(parts);
    if (stamp) {
      gsap.set(stamp, { opacity: 0 });
      stamp.classList.remove("is-stamped");
    }
    if (stamper) gsap.set(stamper, { autoAlpha: 0 });
  }, []);

  return (
    <section
      className="docs sec"
      id="docs"
      data-nila-hide
      style={{ position: "relative" }}
    >
      <span id="visas" style={{ position: "absolute", top: 0, left: 0, scrollMarginTop: "90px" }} aria-hidden="true" />
      <div className="wrap docs__grid">
        <div className="docs__head">
          <p className="eyebrow">Before you fly</p>
          <h2 className="h2" data-split>
            The paperwork, <span className="serif-i">sorted.</span>
          </h2>
          <div className="docs__nila">
            <div
              className="docs__mascot"
              aria-hidden="true"
              dangerouslySetInnerHTML={{ __html: buildGuide("nd") }}
            />
            <div className="bubble docs__bubble" aria-hidden="true">
              <span className="bubble__name">Nila</span>
              <span className="docs__speech">
                Visas, renewals, attestation, and insurance. The paperwork is sorted with us.
              </span>
            </div>
          </div>
        </div>

        <ScrollStack
          useWindowScroll={true}
          smoothScroll={false}
          snap={false}
          stackPosition={120}
          itemDistance={120}
          itemStackDistance={48}
          itemScale={0.035}
          baseScale={0.92}
          dimAmount={0.15}
          blurAmount={0}
          tiltAmount={0}
          rotationAmount={0}
          holdDistance={60}
          revealOffset={70}
          onItemReveal={handleReveal}
          onItemReset={handleReset}
        >
          {CARDS.map((card, i) => (
            <ScrollStackItem key={card.title} itemClassName="paperwork-card">
              <img
                src={card.img}
                alt={card.alt}
                className="paperwork-card__img"
                loading="lazy"
                decoding="async"
                width={2400}
                height={1792}
              />
              <div className="paperwork-card__body">
                <span className="paperwork-card__label">
                  {String(i + 1).padStart(2, "0")} / {String(CARDS.length).padStart(2, "0")}
                </span>
                <h3 className="paperwork-card__title">{card.title}</h3>
                <p className="paperwork-card__text">{card.text}</p>
              </div>
              <div className="paperwork-stampzone" aria-hidden="true">
                <StampArt spec={card.stamp} index={i} />
                <Stamper ink={card.stamp.ink} />
              </div>
            </ScrollStackItem>
          ))}
        </ScrollStack>
      </div>
    </section>
  );
}
