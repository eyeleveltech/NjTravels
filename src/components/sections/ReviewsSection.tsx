"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// TODO: add the overall Google rating once confirmed.
export interface ReviewItem {
  id: string;
  name: string;
  rating: number;
  timeAgo: string;
  text: string;
}

export const REVIEWS: ReviewItem[] = [
  {
    id: "review-1",
    name: "Sathiq Ahmed",
    rating: 5,
    timeAgo: "a year ago",
    text: "I recently traveled from Trichy to Chennai and had a great experience with the travels service. The journey was smooth, the vehicle was clean and comfortable, and the driver was professional and polite. We reached on time without any issues. Overall, it was one of the best travel experiences I've had. Highly recommended for anyone looking for safe and reliable travel between Trichy and Chennai!",
  },
  {
    id: "review-2",
    name: "Badusha Enterprise",
    rating: 5,
    timeAgo: "a year ago",
    text: "09:02:2025 I booked taxi from Chennai to namakkal @ sahi travels 2days trip. I am using lot of travel agencies but this travels amazing service vehicle also very clean and very well maintenance and specially driver well educated 500% safe travel save money and very happy with this travels thanks for ur discount mr jaggu my travel partner sahi travels only",
  },
  {
    id: "review-3",
    name: "Padmn R",
    rating: 5,
    timeAgo: "4 years ago",
    text: "Very courteous and prompt service. They provide well maintained cars and the rates are quite reasonable.",
  },
  {
    id: "review-4",
    name: "Yaseera Latheef",
    rating: 5,
    timeAgo: "4 years ago",
    text: "This is the bestest cheapest travel agency.... yesterday i travelled from Chennai to devakottai ...had a nice journey well maintained car ,helpful driver overall services are fully satisfied....",
  },
  {
    id: "review-5",
    name: "Shameem Basith",
    rating: 5,
    timeAgo: "7 years ago",
    text: "what a great experience, the friendly drivers are the main thing to be appreciated for the safe and comfortable journey.i admire them for their punctuality and on time dropping...",
  },
];

export default function ReviewsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const section = sectionRef.current;
    if (!section) return;

    const cards = section.querySelectorAll<HTMLElement>(".reviews-card");
    if (!cards || cards.length === 0) return;

    gsap.set(cards, { opacity: 0, y: 24 });

    const trigger = ScrollTrigger.create({
      trigger: section,
      start: "top 85%",
      once: true,
      onEnter: () => {
        gsap.to(cards, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.08,
          ease: "power2.out",
        });
      },
    });

    return () => {
      trigger.kill();
    };
  }, []);

  const scrollByAmount = (direction: "prev" | "next") => {
    const container = carouselRef.current;
    if (!container) return;
    const card = container.querySelector<HTMLElement>(".reviews-card");
    const gap = 24;
    const cardWidth = card ? card.offsetWidth + gap : 360;
    const scrollOffset = direction === "next" ? cardWidth : -cardWidth;
    container.scrollBy({ left: scrollOffset, behavior: "smooth" });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      scrollByAmount("prev");
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      scrollByAmount("next");
    }
  };

  return (
    <section
      ref={sectionRef}
      className="reviews-sec sec"
      id="reviews"
      aria-label="Customer Reviews"
    >
      <div className="wrap">
        <header className="sec-head reviews-sec__head">
          <div className="reviews-sec__head-copy">
            <p className="eyebrow">CUSTOMER REVIEWS</p>
            <h2 className="h2 reviews-sec__title">
              What our <span className="serif-i">travellers say.</span>
            </h2>
          </div>
          <div className="reviews-sec__controls" aria-label="Review navigation">
            <button
              type="button"
              className="reviews-btn reviews-btn--prev"
              aria-label="Previous review"
              onClick={() => scrollByAmount("prev")}
            >
              ←
            </button>
            <button
              type="button"
              className="reviews-btn reviews-btn--next"
              aria-label="Next review"
              onClick={() => scrollByAmount("next")}
            >
              →
            </button>
          </div>
        </header>

        <div
          ref={carouselRef}
          className="reviews-carousel"
          tabIndex={0}
          role="region"
          aria-label="Customer reviews carousel"
          onKeyDown={handleKeyDown}
        >
          {REVIEWS.map((review) => (
            <article key={review.id} className="reviews-card" tabIndex={0}>
              <div
                className="reviews-card__stars"
                role="img"
                aria-label="5 out of 5 stars"
              >
                {[...Array(review.rating)].map((_, i) => (
                  <svg
                    key={i}
                    viewBox="0 0 20 20"
                    width="16"
                    height="16"
                    fill="var(--color-terracotta, #C75A3A)"
                    aria-hidden="true"
                    className="reviews-card__star"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118l-3.37-2.448a1 1 0 00-1.175 0l-3.37 2.448c-.784.57-1.838-.197-1.539-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.063 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.286-3.957z" />
                  </svg>
                ))}
              </div>

              <blockquote className="reviews-card__quote">
                <p className="reviews-card__text">{review.text}</p>
              </blockquote>

              <footer className="reviews-card__author">
                <h3 className="reviews-card__name">{review.name}</h3>
                <p className="reviews-card__meta">Google review, {review.timeAgo}</p>
              </footer>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
