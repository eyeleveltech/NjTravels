"use client";

import { useState, useId, useMemo, useRef, useEffect } from "react";
import Link from "next/link";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import SkipLink from "@/components/layout/SkipLink";
import GuideAside from "@/components/ui/GuideAside";
import { CONTACT_DETAILS } from "@/data/contact";
import { officeItems } from "@/data/offices";
import { submitWeb3Form } from "@/lib/web3forms";
import gsap from "gsap";

const COUNTRY_DIAL_CODES = [
  { code: "+91", country: "India (IN)" },
  { code: "+971", country: "UAE (AE)" },
  { code: "+66", country: "Thailand (TH)" },
  { code: "+673", country: "Brunei (BN)" },
  { code: "+65", country: "Singapore (SG)" },
  { code: "+60", country: "Malaysia (MY)" },
  { code: "+44", country: "UK (GB)" },
  { code: "+1", country: "USA / Canada (US/CA)" },
  { code: "+966", country: "Saudi Arabia (SA)" },
  { code: "+974", country: "Qatar (QA)" },
  { code: "+968", country: "Oman (OM)" },
  { code: "+973", country: "Bahrain (BH)" },
  { code: "+965", country: "Kuwait (KW)" },
  { code: "+61", country: "Australia (AU)" },
  { code: "+49", country: "Germany (DE)" },
  { code: "+33", country: "France (FR)" },
];

const TOPICS = [
  "Booking",
  "Fleet and vehicles",
  "Visas and documents",
  "Corporate and groups",
  "Payments and invoices",
  "Other",
] as const;

type TopicType = (typeof TOPICS)[number];

interface FaqItem {
  id: string;
  topic: TopicType;
  question: string;
  answer: string;
}

const FAQ_ITEMS: FaqItem[] = [
  {
    id: "faq-1",
    topic: "Booking",
    question: "How do I book a vehicle?",
    answer:
      "Use Plan a trip on the home page. Our team calls or messages you to confirm the details and the final fare.",
  },
  {
    id: "faq-2",
    topic: "Payments and invoices",
    question: "Are the fares final?",
    answer:
      "Fares shown in the estimate are indicative. Our team confirms the exact amount after reviewing your route, dates and vehicle. Toll gates, parking, state permit taxes and GST are extra.",
  },
  {
    id: "faq-3",
    topic: "Visas and documents",
    question: "Do you help with visas and documents?",
    answer:
      "Yes. We provide visa, passport, and certificate attestation support. Share what you need in the enquiry form.",
  },
  {
    id: "faq-4",
    topic: "Booking",
    question: "Do you offer airport pick-up and drop?",
    answer:
      "Yes. Add your flight details and pickup time in the enquiry form, and our team will confirm the vehicle.",
  },
  {
    id: "faq-5",
    topic: "Corporate and groups",
    question: "Do you handle group and corporate travel?",
    answer:
      "Yes. We arrange travel for individuals, families, businesses, groups, and production teams.",
  },
  {
    id: "faq-6",
    topic: "Booking",
    question: "Can I change or cancel a booking?",
    answer:
      "Contact our team as early as possible with your reference. [OWNER TO DEFINE CANCELLATION POLICY BEFORE LAUNCH]",
  },
];

export default function ContactPage() {
  const compId = useId();

  // Search state & debounced query
  const [searchInput, setSearchInput] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [selectedTopic, setSelectedTopic] = useState<string>("All");
  const [openAccordionIds, setOpenAccordionIds] = useState<Set<string>>(new Set());

  // Form states
  const [fullName, setFullName] = useState("");
  const [countryCode, setCountryCode] = useState("+91");
  const [mobileNumber, setMobileNumber] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [formTopic, setFormTopic] = useState<string>("");
  const [questionText, setQuestionText] = useState("");

  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitReference, setSubmitReference] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Field refs for focus management
  const nameInputRef = useRef<HTMLInputElement>(null);
  const mobileInputRef = useRef<HTMLInputElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const topicSelectRef = useRef<HTMLSelectElement>(null);
  const questionTextareaRef = useRef<HTMLTextAreaElement>(null);

  // Debounce search query over 200ms after 2 chars
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchInput.trim().length >= 2) {
        setDebouncedQuery(searchInput.trim().toLowerCase());
      } else {
        setDebouncedQuery("");
      }
    }, 200);
    return () => clearTimeout(timer);
  }, [searchInput]);

  // Filter FAQ items by Topic and Search Query
  const filteredFaqs = useMemo(() => {
    return FAQ_ITEMS.filter((item) => {
      // 1. Topic filtering
      if (selectedTopic !== "All" && item.topic !== selectedTopic) {
        return false;
      }
      // 2. Search query filtering
      if (debouncedQuery) {
        const matchesQ = item.question.toLowerCase().includes(debouncedQuery);
        const matchesA = item.answer.toLowerCase().includes(debouncedQuery);
        const matchesT = item.topic.toLowerCase().includes(debouncedQuery);
        return matchesQ || matchesA || matchesT;
      }
      return true;
    });
  }, [selectedTopic, debouncedQuery]);

  // Accordion toggle with GSAP height animation
  const toggleAccordion = (id: string) => {
    const panel = document.getElementById(`panel-${id}`);
    const isOpen = openAccordionIds.has(id);
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (isOpen) {
      if (!reduceMotion && panel) {
        gsap.to(panel, {
          height: 0,
          opacity: 0,
          duration: 0.3,
          ease: "power2.inOut",
          onComplete: () => {
            setOpenAccordionIds((prev) => {
              const next = new Set(prev);
              next.delete(id);
              return next;
            });
          },
        });
      } else {
        setOpenAccordionIds((prev) => {
          const next = new Set(prev);
          next.delete(id);
          return next;
        });
      }
    } else {
      setOpenAccordionIds((prev) => new Set(prev).add(id));
      if (!reduceMotion && panel) {
        gsap.fromTo(
          panel,
          { height: 0, opacity: 0 },
          { height: "auto", opacity: 1, duration: 0.3, ease: "power2.out" }
        );
      }
    }
  };

  // Helper to highlight matched search text in terracotta
  const highlightMatch = (text: string, query: string) => {
    if (!query || query.length < 2) return text;
    const parts = text.split(new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi"));
    return parts.map((part, i) =>
      part.toLowerCase() === query.toLowerCase() ? (
        <mark key={i} className="query-highlight">
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  // Form Validation
  const validateForm = () => {
    const errors: { [key: string]: string } = {};

    if (!fullName.trim() || fullName.trim().length < 2 || fullName.trim().length > 60) {
      errors.name = "Please enter your name (2 to 60 characters).";
    }

    const cleanMobile = mobileNumber.replace(/\D/g, "");
    if (!cleanMobile) {
      errors.mobile = "Please enter your mobile number.";
    } else if (countryCode === "+91" && !/^[6-9]\d{9}$/.test(cleanMobile)) {
      errors.mobile = "Please enter a valid 10-digit Indian mobile number.";
    } else if (countryCode !== "+91" && (cleanMobile.length < 6 || cleanMobile.length > 15)) {
      errors.mobile = "Please enter a valid mobile number (6 to 15 digits).";
    }

    if (emailAddress.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailAddress.trim())) {
      errors.email = "Please enter a valid email address.";
    }

    if (!formTopic) {
      errors.topic = "Please select a topic for your question.";
    }

    if (!questionText.trim() || questionText.trim().length < 10 || questionText.trim().length > 1000) {
      errors.question = "Please enter your question (between 10 and 1000 characters).";
    }

    setFormErrors(errors);

    // Shift focus to first invalid field
    if (errors.name) {
      nameInputRef.current?.focus();
    } else if (errors.mobile) {
      mobileInputRef.current?.focus();
    } else if (errors.email) {
      emailInputRef.current?.focus();
    } else if (errors.topic) {
      topicSelectRef.current?.focus();
    } else if (errors.question) {
      questionTextareaRef.current?.focus();
    }

    return Object.keys(errors).length === 0;
  };

  // Handle Query Form Submission
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitError(null);

    const ref = `SAHI-Q${Date.now().toString(36).substring(2, 7).toUpperCase()}`;
    const submissionTime = new Date().toISOString();

    try {
      await submitWeb3Form({
        subject: `New Customer Query [${ref}] - ${fullName.trim()} (${formTopic})`,
        from_name: "Sahi Travels Website",
        reference_id: ref,
        full_name: fullName.trim(),
        mobile_number: `${countryCode} ${mobileNumber.trim()}`,
        email: emailAddress.trim() || undefined,
        query_topic: formTopic,
        question: questionText.trim(),
        searched_faq_term: searchInput.trim() || undefined,
        submitted_at: submissionTime,
      });

      setSubmitReference(ref);
      setSubmitSuccess(true);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "We could not send your question. Please try again or call us.";
      setSubmitError(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <SkipLink />
      <Nav />
      <main id="main" className="contact-page">
        {/* SECTION 1 — CONTACT DETAILS */}
        <section className="contact-details sec" aria-labelledby="contact-heading">
          <div className="wrap">
            <header className="sec-head">
              <div>
                <p className="eyebrow mono">GET IN TOUCH</p>
                <h1 id="contact-heading" className="h1">
                  Connect with our <span className="serif-i">desk.</span>
                </h1>
              </div>
              <p className="lede">
                We are here to assist with every journey, booking, documentation service, and query from Chennai and our regional desks.
              </p>
            </header>

            <div className="contact-details__grid">
              {/* Phone & WhatsApp */}
              <div className="contact-card">
                <span className="contact-card__label mono">Phone &amp; WhatsApp</span>
                <div className="contact-card__actions">
                  <a href={CONTACT_DETAILS.phone.telLink} className="contact-card__value">
                    {CONTACT_DETAILS.phone.display}
                  </a>
                  <a
                    href={CONTACT_DETAILS.whatsapp.link}
                    target="_blank"
                    rel="noopener"
                    className="contact-card__link mono"
                  >
                    {CONTACT_DETAILS.whatsapp.label} →
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="contact-card">
                <span className="contact-card__label mono">Email</span>
                <a href={CONTACT_DETAILS.email.mailtoLink} className="contact-card__value">
                  {CONTACT_DETAILS.email.address}
                </a>
              </div>

              {/* Website */}
              <div className="contact-card">
                <span className="contact-card__label mono">Website</span>
                <a
                  href={CONTACT_DETAILS.website.url}
                  target="_blank"
                  rel="noopener"
                  className="contact-card__value"
                >
                  {CONTACT_DETAILS.website.display}
                </a>
              </div>

              {/* Registered Address */}
              <div className="contact-card contact-card--full">
                <span className="contact-card__label mono">Registered Address</span>
                <p className="contact-card__address">{CONTACT_DETAILS.address.full}</p>
              </div>

              {/* Our Offices */}
              <div className="contact-card contact-card--full">
                <span className="contact-card__label mono">Our Offices</span>
                <ul className="chips contact-card__offices-list" aria-label="Global and regional offices">
                  {officeItems
                    .filter((office) => Boolean(office.title))
                    .map((office) => (
                      <li key={office.title} className="chip">
                        <strong>{office.title}</strong>
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2 — CUSTOMER QUERY PORTAL */}
        <section className="query-portal sec" id="query" aria-labelledby="query-heading">
          <div className="wrap">
            <header className="sec-head">
              <div>
                <p className="eyebrow mono">CUSTOMER QUERY PORTAL</p>
                <h2 id="query-heading" className="h2">
                  Frequently asked <span className="serif-i">questions.</span>
                </h2>
              </div>
              <p className="lede">
                Search answers to common queries about our rides, vehicles, visas, and documentation. Can’t find yours? Send us a question below.
              </p>
            </header>

            {/* A. Search Field */}
            <div className="query-search">
              <label htmlFor={`${compId}-search`} className="query-search__label mono">
                Search answers
              </label>
              <div className="query-search__input-wrap">
                <svg
                  className="query-search__icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                <input
                  id={`${compId}-search`}
                  type="search"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  placeholder="Type a question, topic, or keyword..."
                  className="query-search__input"
                />
                {searchInput && (
                  <button
                    type="button"
                    onClick={() => setSearchInput("")}
                    className="query-search__clear"
                    aria-label="Clear search"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>

            {/* B. Topic Chips */}
            <div className="query-topics" role="group" aria-label="Filter FAQ by topic">
              <span className="query-topics__label mono">Filter by topic:</span>
              <div className="query-topics__list">
                <button
                  type="button"
                  className={`query-topic-chip ${selectedTopic === "All" ? "is-active" : ""}`}
                  onClick={() => setSelectedTopic("All")}
                >
                  All
                </button>
                {TOPICS.map((topic) => (
                  <button
                    key={topic}
                    type="button"
                    className={`query-topic-chip ${selectedTopic === topic ? "is-active" : ""}`}
                    onClick={() => setSelectedTopic(topic)}
                  >
                    {topic}
                  </button>
                ))}
              </div>
            </div>

            {/* C. FAQ Accordion List */}
            <div className="query-faq-list" role="region" aria-label="Questions and answers">
              {filteredFaqs.length === 0 ? (
                <div className="query-no-match">
                  <p>No answers match. Ask us below.</p>
                </div>
              ) : (
                filteredFaqs.map((item) => {
                  const isOpen = openAccordionIds.has(item.id);
                  return (
                    <article key={item.id} className="query-faq-item">
                      <button
                        type="button"
                        id={`btn-${item.id}`}
                        aria-expanded={isOpen}
                        aria-controls={`panel-${item.id}`}
                        className="query-faq-trigger"
                        onClick={() => toggleAccordion(item.id)}
                      >
                        <span className="query-faq-question">
                          {highlightMatch(item.question, debouncedQuery)}
                        </span>
                        <span className="query-faq-badge mono">{item.topic}</span>
                        <svg
                          className={`query-faq-chevron ${isOpen ? "is-open" : ""}`}
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          aria-hidden="true"
                        >
                          <polyline points="6 9 12 15 18 9" />
                        </svg>
                      </button>

                      <div
                        id={`panel-${item.id}`}
                        role="region"
                        aria-labelledby={`btn-${item.id}`}
                        className={`query-faq-panel ${isOpen ? "is-open" : ""}`}
                      >
                        <div className="query-faq-answer">
                          <p>{highlightMatch(item.answer, debouncedQuery)}</p>
                        </div>
                      </div>
                    </article>
                  );
                })
              )}
            </div>

            {/* D. "Didn't find your answer?" Form */}
            <div className="query-form-section">
              <div className="query-form-card">
                <h3 className="h3 query-form-title">
                  Didn’t find your answer? <span className="serif-i">Send us your question.</span>
                </h3>
                <p className="query-form-subtitle">
                  Our customer desk will review your query and reply back directly via call or WhatsApp.
                </p>

                {submitSuccess ? (
                  <div className="query-form-success" role="alert">
                    <h4 className="query-form-success-title">Thank you.</h4>
                    <p className="query-form-success-text">
                      Your question has been sent to our customer desk. We will review it and reply back shortly.
                    </p>
                    {submitReference && (
                      <p className="query-form-success-ref mono">
                        Reference: {submitReference}
                      </p>
                    )}
                    <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginTop: "16px" }}>
                      <a
                        href={`https://wa.me/${CONTACT_DETAILS.whatsapp.number}?text=${encodeURIComponent(
                          `Hello Sahi Travels, I sent query [${submitReference}]:\nTopic: ${formTopic}\nQuestion: ${questionText.trim()}`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn--navy btn--sm"
                      >
                        Chat on WhatsApp <span className="btn__arrow" aria-hidden="true">→</span>
                      </a>
                      <button
                        type="button"
                        className="btn btn--line btn--sm"
                        onClick={() => {
                          setSubmitSuccess(false);
                          setQuestionText("");
                          setSubmitReference(null);
                        }}
                      >
                        Ask another question
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleFormSubmit} className="query-form" noValidate>
                    {/* Botcheck honeypot */}
                    <input
                      type="checkbox"
                      name="botcheck"
                      className="hidden"
                      style={{ display: "none" }}
                      tabIndex={-1}
                      autoComplete="off"
                    />

                    {/* 1. Full Name */}
                    <div className="query-field">
                      <label htmlFor={`${compId}-name`} className="query-label mono">
                        Full name <span className="required">*</span>
                      </label>
                      <input
                        ref={nameInputRef}
                        id={`${compId}-name`}
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Your full name"
                        maxLength={60}
                        aria-required="true"
                        aria-describedby={formErrors.name ? `${compId}-name-err` : undefined}
                        className={`query-input ${formErrors.name ? "is-invalid" : ""}`}
                      />
                      {formErrors.name && (
                        <p id={`${compId}-name-err`} className="query-error" role="alert">
                          {formErrors.name}
                        </p>
                      )}
                    </div>

                    {/* 2. Mobile Number */}
                    <div className="query-field">
                      <label htmlFor={`${compId}-mobile`} className="query-label mono">
                        Mobile number <span className="required">*</span>
                      </label>
                      <div className="query-phone-row">
                        <select
                          value={countryCode}
                          onChange={(e) => setCountryCode(e.target.value)}
                          className="query-select query-dial-select mono"
                          aria-label="Country calling code"
                        >
                          {COUNTRY_DIAL_CODES.map((item) => (
                            <option key={item.code} value={item.code}>
                              {item.code} ({item.country})
                            </option>
                          ))}
                        </select>
                        <input
                          ref={mobileInputRef}
                          id={`${compId}-mobile`}
                          type="tel"
                          value={mobileNumber}
                          onChange={(e) => setMobileNumber(e.target.value)}
                          placeholder={countryCode === "+91" ? "10-digit mobile number" : "Mobile number"}
                          inputMode="numeric"
                          aria-required="true"
                          aria-describedby={formErrors.mobile ? `${compId}-mobile-err` : undefined}
                          className={`query-input ${formErrors.mobile ? "is-invalid" : ""}`}
                        />
                      </div>
                      {formErrors.mobile && (
                        <p id={`${compId}-mobile-err`} className="query-error" role="alert">
                          {formErrors.mobile}
                        </p>
                      )}
                    </div>

                    {/* 3. Email (optional) */}
                    <div className="query-field">
                      <label htmlFor={`${compId}-email`} className="query-label mono">
                        Email address <span className="optional">(optional)</span>
                      </label>
                      <input
                        ref={emailInputRef}
                        id={`${compId}-email`}
                        type="email"
                        value={emailAddress}
                        onChange={(e) => setEmailAddress(e.target.value)}
                        placeholder="name@example.com"
                        aria-describedby={formErrors.email ? `${compId}-email-err` : undefined}
                        className={`query-input ${formErrors.email ? "is-invalid" : ""}`}
                      />
                      {formErrors.email && (
                        <p id={`${compId}-email-err`} className="query-error" role="alert">
                          {formErrors.email}
                        </p>
                      )}
                    </div>

                    {/* 4. Topic Select */}
                    <div className="query-field">
                      <label htmlFor={`${compId}-topic`} className="query-label mono">
                        Topic <span className="required">*</span>
                      </label>
                      <select
                        ref={topicSelectRef}
                        id={`${compId}-topic`}
                        value={formTopic}
                        onChange={(e) => setFormTopic(e.target.value)}
                        aria-required="true"
                        aria-describedby={formErrors.topic ? `${compId}-topic-err` : undefined}
                        className={`query-select ${formErrors.topic ? "is-invalid" : ""}`}
                      >
                        <option value="" disabled>
                          Select a topic
                        </option>
                        {TOPICS.map((t) => (
                          <option key={t} value={t}>
                            {t}
                          </option>
                        ))}
                      </select>
                      {formErrors.topic && (
                        <p id={`${compId}-topic-err`} className="query-error" role="alert">
                          {formErrors.topic}
                        </p>
                      )}
                    </div>

                    {/* 5. Your Question */}
                    <div className="query-field">
                      <div className="query-label-row">
                        <label htmlFor={`${compId}-question`} className="query-label mono">
                          Your question <span className="required">*</span>
                        </label>
                        <span className="query-counter mono" aria-live="polite">
                          {questionText.length} / 1000
                        </span>
                      </div>
                      <textarea
                        ref={questionTextareaRef}
                        id={`${compId}-question`}
                        value={questionText}
                        onChange={(e) => setQuestionText(e.target.value)}
                        placeholder="Write your question in detail (10 to 1000 characters)..."
                        rows={4}
                        maxLength={1000}
                        aria-required="true"
                        aria-describedby={formErrors.question ? `${compId}-question-err` : undefined}
                        className={`query-textarea ${formErrors.question ? "is-invalid" : ""}`}
                      />
                      {formErrors.question && (
                        <p id={`${compId}-question-err`} className="query-error" role="alert">
                          {formErrors.question}
                        </p>
                      )}
                    </div>

                    {submitError && (
                      <p className="query-error query-submit-error" role="alert">
                        {submitError}
                      </p>
                    )}

                    <div className="query-form-submit">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="btn btn--navy"
                      >
                        {isSubmitting ? "Sending…" : "Send question"}
                        {!isSubmitting && <span className="btn__arrow" aria-hidden="true">→</span>}
                      </button>
                    </div>
                  </form>
                )}
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
