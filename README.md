# Sahi Travels

A modern, high-performance website for **Sahi Travels / NJ Travel Service** (Operated since 2000), migrated and recreated using **Next.js**, **TypeScript**, **Tailwind CSS**, **GSAP**, and **Lenis**.

## Key Features

- **Interactive Journey Experience:** Scrubbed multi-stage timeline (taxi, flight, rail, coach, VIP car, venue) with custom SVG character choreography.
- **Interactive Passport Stamp Book:** Realistic passport booklet with authentic rubber stamp mechanics, animated stamper descent, rotation, sound-ready callbacks, and completion flows.
- **Boarding Pass Ticket Enquiry:** Physical boarding pass ticket with real-time field validation stamps and direct WhatsApp integration.
- **Fleet Showcase:** Dynamic interactive vehicle selection for VIP cars, luxury coaches, taxis, rail, and flights.
- **Smooth Motion & Performance:** Smooth scrolling powered by Lenis and GSAP ScrollTrigger with zero layout shifting.
- **Responsive Design:** Pixel-perfect across desktop, tablet, and mobile viewports.

## Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (App Router, Turbopack)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Animation:** [GSAP 3](https://greensock.com/gsap/) (ScrollTrigger, MotionPathPlugin)
- **Smooth Scroll:** [Lenis](https://lenis.darkroom.engineering/)

## Getting Started

### Prerequisites

- Node.js 20.9+
- npm, yarn, or pnpm

### Installation

```bash
npm install
```

### Running Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

The site is a static export: there is no Node server in production.

```bash
npm run build
```

This writes the finished site to `out/`. Point the web server's document root at that folder (Apache: `DocumentRoot /path/to/project/out`). After pulling new code, run `npm ci && npm run build` again; no restart is needed.
