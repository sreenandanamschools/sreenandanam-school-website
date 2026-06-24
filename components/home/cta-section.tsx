"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { ArrowRight, Phone, Mail, MapPin, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

export function CTASection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.1 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden">
      <div className="grid lg:grid-cols-[55fr_45fr] min-h-[500px]">

        {/* ── Left — green CTA panel ─────────────────── */}
        <div className="relative bg-primary flex flex-col justify-center px-8 sm:px-12 lg:px-16 py-16 lg:py-24 overflow-hidden">

          {/* Decorative founding year watermark */}
          <span className="absolute right-0 bottom-0 font-serif font-bold text-white/5 leading-none select-none translate-x-8 translate-y-4"
            style={{ fontSize: "clamp(5rem, 15vw, 12rem)" }}>
            2008
          </span>

          {/* Diagonal stripe overlay */}
          <div className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: "repeating-linear-gradient(45deg, white, white 1px, transparent 1px, transparent 16px)"
            }}
          />

          <div className="relative z-10">
            <span className={cn(
              "inline-block text-[var(--gold)] text-xs font-bold tracking-[0.2em] uppercase mb-6 transition-all duration-700",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            )}>
              Admissions Open · 2026–27
            </span>

            <h2 className={cn(
              "font-serif font-bold text-white leading-tight mb-6 text-balance transition-all duration-700 delay-100",
              "text-3xl sm:text-4xl xl:text-5xl",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            )}>
              Give Your Child the Gift of
              <br />
              <em className="text-[var(--gold)]">Quality Education</em>
            </h2>

            <p className={cn(
              "text-white/70 leading-relaxed mb-10 max-w-md transition-all duration-700 delay-200",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            )}>
              Join the Sreenandanam family. We nurture young minds with
              modern teaching, strong values, and wholehearted care.
            </p>

            <div className={cn(
              "flex flex-wrap gap-3 transition-all duration-700 delay-300",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            )}>
              <Link
                href="/contact#contact-form"
                className="inline-flex items-center gap-2.5 bg-white text-primary px-7 py-3.5 text-sm font-bold rounded-sm hover:bg-white/90 transition-all duration-300 hover:gap-4 group"
              >
                Apply for Admission
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-semibold text-white/80 border border-white/20 rounded-sm hover:border-white/40 hover:text-white transition-all duration-300"
              >
                Schedule a Visit
              </Link>
            </div>
          </div>
        </div>

        {/* ── Right — contact info panel ─────────────── */}
        <div className="bg-cream flex flex-col justify-center px-8 sm:px-12 lg:px-14 py-16 lg:py-24 border-t lg:border-t-0 border-border">

          <p className={cn(
            "text-[var(--gold-foreground)] text-xs font-bold tracking-[0.2em] uppercase mb-8 transition-all duration-700 delay-200",
            isVisible ? "opacity-100" : "opacity-0"
          )}>
            Get in Touch
          </p>

          <div className={cn(
            "space-y-7 transition-all duration-700 delay-300",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          )}>

            <div className="flex items-start gap-4 group">
              <div className="w-10 h-10 rounded-sm bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                <Phone className="w-4 h-4 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1 font-semibold uppercase tracking-wider">Phone</p>
                <a href="tel:+919745433356" className="block text-foreground font-medium text-sm hover:text-primary transition-colors">+91 97454 33356</a>
                <a href="tel:+919745433357" className="block text-foreground font-medium text-sm hover:text-primary transition-colors">+91 97454 33357</a>
              </div>
            </div>

            <div className="h-px bg-border" />

            <div className="flex items-start gap-4 group">
              <div className="w-10 h-10 rounded-sm bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                <Mail className="w-4 h-4 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1 font-semibold uppercase tracking-wider">Email</p>
                <a href="mailto:sreenandadnamschools@gmail.com" className="text-foreground font-medium text-sm hover:text-primary transition-colors break-all">
                  sreenandadnamschools@gmail.com
                </a>
              </div>
            </div>

            <div className="h-px bg-border" />

            <div className="flex items-start gap-4 group">
              <div className="w-10 h-10 rounded-sm bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                <MapPin className="w-4 h-4 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1 font-semibold uppercase tracking-wider">Location</p>
                <p className="text-foreground font-medium text-sm">Parassala, Thiruvananthapuram,<br />Kerala, India</p>
              </div>
            </div>

            <div className="h-px bg-border" />

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-sm bg-primary/10 flex items-center justify-center shrink-0">
                <Clock className="w-4 h-4 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1 font-semibold uppercase tracking-wider">Hours</p>
                <p className="text-foreground font-medium text-sm">Mon – Sat: 8:00 AM – 4:00 PM</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
