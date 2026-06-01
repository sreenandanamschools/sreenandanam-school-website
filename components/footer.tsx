import Link from "next/link";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Facebook,
  Instagram,
  Youtube,
  ArrowUpRight,
} from "lucide-react";

const quickLinks = [
  { href: "/about", label: "About Us" },
  { href: "/academics", label: "Academics" },
  { href: "/facilities", label: "Facilities" },
  { href: "/careers", label: "Careers" },
  { href: "/admissions", label: "Admissions" },
  { href: "/gallery", label: "Gallery" },
  { href: "/news", label: "News" },
  { href: "/contact", label: "Contact" },
];

export function Footer() {
  return (
    <footer className="bg-[var(--ink)] text-white">

      {/* ── Masthead tier ──────────────────────────── */}
      <div className="border-b border-white/10">
        <div className="container mx-auto px-4 lg:px-8 py-14 lg:py-16">
          <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-8">

            {/* Brand */}
            <div className="max-w-md">
              <Link href="/" className="inline-block mb-5">
                <img
                  src="/images/logo.png"
                  alt="Sree Nandanam Public School"
                  width={140}
                  height={50}
                  className="brightness-0 invert opacity-90"
                />
              </Link>
              <p className="text-white/50 text-sm leading-relaxed">
                Nurturing young minds since 2008. Quality English medium education
                from Class 1 to Class 7 in the heart of Parassala, Kerala.
              </p>
              <p className="text-white/25 text-xs mt-3 font-mono">
                UDISE Code: 32140900331
              </p>
            </div>

            {/* Social + CTA */}
            <div className="flex flex-col items-start lg:items-end gap-5">
              {/* Social */}
              <div className="flex items-center gap-3">
                {[
                  { href: "https://facebook.com", Icon: Facebook, label: "Facebook" },
                  { href: "https://instagram.com", Icon: Instagram, label: "Instagram" },
                  { href: "https://youtube.com", Icon: Youtube, label: "YouTube" },
                ].map(({ href, Icon, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="w-9 h-9 rounded-sm border border-white/15 flex items-center justify-center text-white/50 hover:text-white hover:border-white/40 transition-all duration-300"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                ))}
              </div>

              {/* Admissions CTA */}
              <Link
                href="/contact#contact-form"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--gold)] text-[var(--gold-foreground)] text-sm font-bold rounded-sm hover:bg-[var(--gold)]/90 transition-all duration-300 group"
              >
                Apply for Admission
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ── Info tier ──────────────────────────────── */}
      <div className="container mx-auto px-4 lg:px-8 py-10 lg:py-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-16">

          {/* Quick Links */}
          <div>
            <p className="text-white/30 text-[10px] font-bold tracking-[0.2em] uppercase mb-5">
              Navigation
            </p>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2">
              {quickLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-white/60 hover:text-white transition-colors duration-200 link-underline after:bg-white/60"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <p className="text-white/30 text-[10px] font-bold tracking-[0.2em] uppercase mb-5">
              Contact
            </p>
            <ul className="space-y-3.5">
              <li className="flex items-start gap-3 group">
                <MapPin className="w-3.5 h-3.5 text-white/30 mt-0.5 shrink-0 group-hover:text-[var(--gold)] transition-colors" />
                <div className="flex flex-col gap-2 text-sm text-white/60 leading-relaxed">
                  <span>
                    <strong className="text-white/85 font-semibold">Primary Campus:</strong> Near KSRTC Depot, Kurumkutty, Parassala, Kerala - 695502
                  </span>
                  <span>
                    <strong className="text-white/85 font-semibold">Kindergarten:</strong> Near Mahadeva Temple, Parassala, Kerala - 695502
                  </span>
                </div>
              </li>
              <li className="flex items-start gap-3 group">
                <Phone className="w-3.5 h-3.5 text-white/30 mt-0.5 shrink-0 group-hover:text-[var(--gold)] transition-colors" />
                <div className="flex flex-col gap-0.5">
                  <a href="tel:+919745433356" className="text-sm text-white/60 hover:text-white transition-colors">+91 97454 33356</a>
                  <a href="tel:+919745433357" className="text-sm text-white/60 hover:text-white transition-colors">+91 97454 33357</a>
                </div>
              </li>
              <li className="flex items-center gap-3 group">
                <Mail className="w-3.5 h-3.5 text-white/30 shrink-0 group-hover:text-[var(--gold)] transition-colors" />
                <a href="mailto:sreenandadnamschools@gmail.com" className="text-sm text-white/60 hover:text-white transition-colors truncate">
                  sreenandadnamschools@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Clock className="w-3.5 h-3.5 text-white/30 shrink-0" />
                <span className="text-sm text-white/60">Mon – Sat: 8:00 AM – 4:00 PM</span>
              </li>
            </ul>
          </div>

          {/* Tagline / Slogan snippet */}
          <div className="sm:col-span-2 lg:col-span-1">
            <p className="text-white/30 text-[10px] font-bold tracking-[0.2em] uppercase mb-5">
              Our Slogan
            </p>
            <blockquote className="font-serif text-xl md:text-2xl text-white/70 italic leading-relaxed border-l-2 border-[var(--gold)]/40 pl-5">
              &ldquo;Your child deserves a smile.&rdquo;
            </blockquote>
          </div>
        </div>
      </div>

      {/* ── Bottom bar ─────────────────────────────── */}
      <div className="border-t border-white/5">
        <div className="container mx-auto px-4 lg:px-8 py-5 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-white/25 text-xs">
            © {new Date().getFullYear()} Sree Nandanam Public School. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            <Link href="/privacy" className="text-white/25 text-xs hover:text-white/60 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-white/25 text-xs hover:text-white/60 transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
