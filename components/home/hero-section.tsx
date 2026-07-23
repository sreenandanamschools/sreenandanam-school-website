"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const heroImages = [
  "https://res.cloudinary.com/dsztu5qhz/image/upload/f_auto,q_auto/v1784834655/IMG_5553_hgls4k.jpg",
  "https://res.cloudinary.com/dsztu5qhz/image/upload/f_auto,q_auto/v1784834660/IMG_5557_cwrkh3.heic",
  "https://res.cloudinary.com/dsztu5qhz/image/upload/f_auto,q_auto/v1784834657/IMG_5555_omlb97.heic",
  "https://res.cloudinary.com/dsztu5qhz/image/upload/f_auto,q_auto/v1784834654/IMG_5552_mkqrgx.jpg",
];

export function HeroSection() {
  const [mounted, setMounted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroImages.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const navigate = (dir: 1 | -1) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex(
      (prev) => (prev + dir + heroImages.length) % heroImages.length,
    );
    setTimeout(() => setIsAnimating(false), 700);
  };

  return (
    <section className="relative min-h-screen overflow-hidden bg-[var(--ink)] flex flex-col lg:flex-row">
      {/* ── Left editorial panel ──────────────────────── */}
      <div className="relative z-10 flex flex-col justify-end lg:justify-center px-6 sm:px-10 lg:px-16 xl:px-20 pt-36 lg:pt-24 pb-12 lg:pb-16 w-full lg:w-[52%] shrink-0">
        {/* Year badge */}
        <div
          className={cn(
            "inline-flex items-center gap-2 mb-8 transition-all duration-700 delay-100",
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
          )}
        >
          <span className="h-px w-8 bg-[var(--gold)]" />
          <span className="text-[var(--gold)] text-xs font-bold tracking-[0.25em] uppercase">
            Est. 2008 · Parassala, Kerala
          </span>
        </div>

        {/* Main heading — left-anchored, not centered */}
        <h1
          className={cn(
            "font-serif font-bold text-white leading-[1.05] text-balance mb-6 transition-all duration-700 delay-200",
            "text-4xl sm:text-5xl md:text-6xl xl:text-7xl",
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
          )}
        >
          Nurturing{" "}
          <span className="italic text-[var(--gold)]">Young Minds,</span>
          <br />
          Building <span className="italic">Bright Futures</span>
        </h1>

        {/* Sub copy */}
        <p
          className={cn(
            "text-white/65 leading-relaxed max-w-md mb-10 transition-all duration-700 delay-300",
            "text-base md:text-lg",
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
          )}
        >
          Quality English medium education from Class 1 to Class 7, fostering
          creativity, critical thinking, and holistic development in the heart
          of Parassala.
        </p>

        {/* CTAs */}
        <div
          className={cn(
            "flex flex-wrap items-center gap-4 mb-16 transition-all duration-700 delay-400",
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
          )}
        >
          <Link
            href="/contact#contact-form"
            className="inline-flex items-center gap-2.5 bg-[var(--gold)] text-[var(--gold-foreground)] px-7 py-3.5 text-sm font-bold rounded-sm hover:bg-[var(--gold)]/90 transition-all duration-300 hover:gap-4 group"
          >
            Apply for Admission
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            href="/about"
            className="inline-flex items-center gap-2 text-white/80 text-sm font-semibold hover:text-white transition-colors link-underline"
          >
            Discover Our School
          </Link>
        </div>

        {/* Stats strip */}
        <div
          className={cn(
            "flex items-center gap-8 transition-all duration-700 delay-500",
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
          )}
        >
          {[
            { value: "18+", label: "Years of Excellence" },
            { value: "7", label: "Grade Levels" },
            { value: "100%", label: "English Medium" },
          ].map((stat, i) => (
            <div key={i} className="flex flex-col">
              <span className="font-serif text-2xl font-bold text-[var(--gold)]">
                {stat.value}
              </span>
              <span className="text-white/50 text-xs mt-0.5">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Right image panel ─────────────────────────── */}
      <div className="relative flex-1 min-h-[40vh] lg:min-h-full">
        {/* Diagonal clip edge (desktop only) */}
        <div
          className="hidden lg:block absolute inset-y-0 left-0 w-16 z-10"
          style={{
            background: "linear-gradient(to right, var(--ink), transparent)",
          }}
        />

        {/* Images */}
        {heroImages.map((src, i) => (
          <div
            key={src}
            className={cn(
              "absolute inset-0 bg-cover bg-center transition-opacity duration-1000",
              currentIndex === i ? "opacity-100" : "opacity-0",
            )}
            style={{ backgroundImage: `url(${src})` }}
          />
        ))}

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/40" />

        {/* Slide counter */}
        <div className="absolute bottom-6 left-6 z-20 flex items-center gap-3">
          <span className="font-serif text-white/50 text-xs">
            {String(currentIndex + 1).padStart(2, "0")} /{" "}
            {String(heroImages.length).padStart(2, "0")}
          </span>
          <div className="flex gap-1.5">
            {heroImages.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={cn(
                  "h-0.5 rounded-full transition-all duration-400",
                  currentIndex === i
                    ? "w-8 bg-[var(--gold)]"
                    : "w-3 bg-white/30 hover:bg-white/50",
                )}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Nav arrows */}
        <button
          onClick={() => navigate(-1)}
          className="absolute right-16 bottom-3 z-20 w-10 h-10 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm text-white flex items-center justify-center hover:bg-white/25 transition-all duration-300 hover:scale-110 active:scale-95"
          aria-label="Previous"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <button
          onClick={() => navigate(1)}
          className="absolute right-4 bottom-3 z-20 w-10 h-10 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm text-white flex items-center justify-center hover:bg-white/25 transition-all duration-300 hover:scale-110 active:scale-95"
          aria-label="Next"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
}
