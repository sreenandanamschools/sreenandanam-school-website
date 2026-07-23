"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/academics", label: "Academics" },
  { href: "/facilities", label: "Facilities" },
  { href: "/admissions", label: "Admissions" },
  { href: "/gallery", label: "Gallery" },
  { href: "/news", label: "News" },
  { href: "/careers", label: "Careers" },
  { href: "/contact", label: "Contact" },
];

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isTransparent = isHome && !scrolled && !isOpen;
  const showAnnouncement = false; // Toggle this to true to show the announcement bar

  return (
    <>
      {/* Announcement bar */}
      {showAnnouncement && (
        <div className="fixed top-0 left-0 right-0 z-50 h-8 bg-[var(--gold)] overflow-hidden">
          <div
            className="marquee-track h-full flex items-center animate-marquee"
            style={{ "--marquee-duration": "25s" } as React.CSSProperties}
          >
            {Array(6)
              .fill(null)
              .map((_, i) => (
                <span
                  key={i}
                  className="whitespace-nowrap text-[var(--gold-foreground)] text-xs font-semibold px-12 tracking-widest uppercase"
                >
                  Admissions Open for 2026–27 Academic Year &nbsp;·&nbsp; English
                  Medium Education from Class 1 to Class 7 &nbsp;·&nbsp;
                </span>
              ))}
          </div>
        </div>
      )}

      {/* Main nav */}
      <header
        className={cn(
          "fixed left-0 right-0 z-40 transition-all duration-500",
          showAnnouncement ? "top-8" : "top-0",
          isTransparent
            ? "bg-transparent border-transparent"
            : "bg-background/97 backdrop-blur-md border-b border-border shadow-sm",
        )}
      >
        <div className="container mx-auto px-4 lg:px-8">
          <nav
            className={cn(
              "flex items-center justify-between transition-all duration-500",
              scrolled ? "h-14" : "h-16 md:h-18",
            )}
          >
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 shrink-0">
              <img
                src="/images/logo.png"
                alt="Sree Nandanam Public School"
                className={cn(
                  "object-contain transition-all duration-500",
                  scrolled ? "h-10" : "h-12",
                  isTransparent && "brightness-0 invert",
                )}
                width={140}
                height={48}
              />
            </Link>

            {/* Desktop links */}
            <div className="hidden lg:flex items-center gap-0.5">
              {navLinks.map((link) => {
                const isActive =
                  pathname === link.href ||
                  (link.href !== "/" && pathname.startsWith(link.href));
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "relative px-3 py-2 text-sm font-medium transition-colors duration-200 rounded-sm",
                      !isActive && "link-underline",
                      isTransparent
                        ? isActive
                          ? "text-white"
                          : "text-white/90 hover:text-white"
                        : isActive
                          ? "text-primary hover:text-primary"
                          : "text-foreground/75 hover:text-foreground",
                    )}
                  >
                    {link.label}
                    {isActive && (
                      <span
                        className={cn(
                          "absolute bottom-0 left-3 right-3 h-0.5 rounded-full",
                          isTransparent ? "bg-white" : "bg-primary",
                        )}
                      />
                    )}
                  </Link>
                );
              })}
            </div>

            {/* CTA */}
            <div className="hidden lg:block">
              <Link
                href="/contact#contact-form"
                className={cn(
                  "inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-sm transition-all duration-300",
                  isTransparent
                    ? "bg-white text-[var(--ink)] hover:bg-white/90"
                    : "bg-primary text-primary-foreground hover:bg-primary/90",
                )}
              >
                Apply Now
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={cn(
                "lg:hidden p-2 rounded-sm transition-colors",
                isTransparent
                  ? "text-white hover:bg-white/10"
                  : "text-foreground hover:bg-secondary",
              )}
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              {isOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </nav>
        </div>

        {/* Mobile menu */}
        <div
          className={cn(
            "lg:hidden overflow-hidden transition-all duration-400 ease-in-out",
            isOpen ? "max-h-[600px]" : "max-h-0",
            !isTransparent && "border-t border-border",
          )}
          style={{
            background: isOpen ? "var(--background)" : "transparent",
          }}
        >
          <div className="container mx-auto px-4 py-4 flex flex-col gap-0.5">
            {navLinks.map((link) => {
              const isActive =
                pathname === link.href ||
                (link.href !== "/" && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "px-4 py-3 text-sm font-medium rounded-sm transition-colors flex items-center justify-between",
                    isActive
                      ? "text-primary bg-primary/5"
                      : "text-foreground/80 hover:text-foreground hover:bg-secondary",
                  )}
                >
                  {link.label}
                  {isActive && (
                    <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                  )}
                </Link>
              );
            })}
            <div className="pt-3 mt-1 border-t border-border">
              <Link
                href="/contact#contact-form"
                onClick={() => setIsOpen(false)}
                className="block w-full text-center px-4 py-3 bg-primary text-primary-foreground text-sm font-semibold rounded-sm hover:bg-primary/90 transition-colors"
              >
                Apply Now
              </Link>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
