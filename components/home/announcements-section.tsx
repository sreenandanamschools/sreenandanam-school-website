"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { Calendar, Clock, Megaphone, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface Announcement {
  id: string;
  title: string;
  content: string;
  type: string;
  target_audience: string;
  published_date: string;
}

import { Event, getEventImage, formatTime } from "@/lib/events";

export function AnnouncementsSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [eventsLoading, setEventsLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.05 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    fetch("/api/announcements")
      .then((r) => r.json())
      .then((json) => {
        if (json.success) setAnnouncements(json.data);
      })
      .finally(() => setLoading(false));

    fetch("/api/events")
      .then((r) => r.json())
      .then((json) => {
        if (json.success) setEvents(json.data.slice(0, 4));
      })
      .finally(() => setEventsLoading(false));
  }, []);

  return (
    <section ref={sectionRef} className="bg-background border-t border-border">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-[240px_1fr_280px] gap-0 divide-y lg:divide-y-0 lg:divide-x divide-border">
          {/* ── Sticky label column ────────────────────── */}
          <div className="py-10 lg:py-16 lg:pr-8">
            <div className="lg:sticky lg:top-32">
              <p
                className={cn(
                  "text-gold text-xs font-bold tracking-[0.2em] uppercase mb-3 transition-all duration-700",
                  isVisible ? "opacity-100" : "opacity-0",
                )}
              >
                Stay Updated
              </p>
              <h2
                className={cn(
                  "font-serif text-3xl md:text-4xl font-bold text-foreground mb-6 leading-tight transition-all duration-700 delay-100",
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4",
                )}
              >
                School
                <br />
                <em>Notices</em>
              </h2>
              <p
                className={cn(
                  "text-muted-foreground text-sm leading-relaxed mb-8 transition-all duration-700 delay-200",
                  isVisible ? "opacity-100" : "opacity-0",
                )}
              >
                Important communications for students, parents, and staff.
              </p>
              <Link
                href="/news"
                className={cn(
                  "inline-flex items-center gap-2 text-sm font-semibold text-primary hover:gap-3 transition-all duration-300 link-underline",
                  isVisible ? "opacity-100" : "opacity-0",
                )}
              >
                View all notices <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* ── Announcements list ─────────────────────── */}
          <div className="py-10 lg:py-16 lg:px-10">
            {/* Skeletons */}
            {loading &&
              [1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="border-b border-border py-5 animate-pulse"
                >
                  <div className="flex gap-4 items-start">
                    <div className="w-16 h-4 bg-muted rounded shrink-0" />
                    <div className="flex-1 space-y-2">
                      <div className="h-4 w-3/4 bg-muted rounded" />
                      <div className="h-3 w-full bg-muted rounded" />
                    </div>
                  </div>
                </div>
              ))}

            {/* Announcement timeline rows */}
            {!loading &&
              announcements.map((item, index) => {
                const isExpanded = expandedId === item.id;
                return (
                  <div
                    key={item.id}
                    className={cn(
                      "border-b border-border last:border-b-0 transition-all duration-700",
                      isVisible
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-4",
                    )}
                    style={{ transitionDelay: `${index * 80}ms` }}
                  >
                    <button
                      onClick={() => setExpandedId(isExpanded ? null : item.id)}
                      className="w-full py-5 flex items-start gap-4 text-left group hover:bg-secondary/40 transition-colors duration-200 px-2 rounded-sm -mx-2"
                    >
                      {/* Date pill */}
                      <div className="shrink-0 pt-0.5">
                        <span className="text-xs text-muted-foreground font-mono whitespace-nowrap">
                          {new Date(item.published_date).toLocaleDateString(
                            "en-IN",
                            {
                              day: "2-digit",
                              month: "short",
                            },
                          )}
                        </span>
                      </div>

                      {/* Dot */}
                      <div className="relative mt-1.5 shrink-0">
                        <div
                          className={cn(
                            "w-2 h-2 rounded-full transition-colors duration-300",
                            isExpanded
                              ? "bg-primary"
                              : "bg-border group-hover:bg-primary/60",
                          )}
                        />
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          <span
                            className={cn(
                              "text-xs font-semibold capitalize px-2 py-0.5 rounded-sm",
                              item.type === "general"
                                ? "bg-secondary text-foreground"
                                : item.type === "academic"
                                  ? "bg-primary/10 text-primary"
                                  : "bg-(--gold)/10 text-gold-foreground",
                            )}
                          >
                            {item.type}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {item.target_audience}
                          </span>
                        </div>
                        <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors text-sm md:text-base leading-snug">
                          {item.title}
                        </h3>
                        {/* Expand */}
                        <div
                          className={cn(
                            "overflow-hidden transition-all duration-400",
                            isExpanded ? "max-h-40 mt-3" : "max-h-0",
                          )}
                        >
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {item.content}
                          </p>
                        </div>
                      </div>

                      {/* Chevron */}
                      <span
                        className={cn(
                          "text-muted-foreground shrink-0 text-lg leading-none transition-transform duration-300",
                          isExpanded ? "rotate-45" : "",
                        )}
                      >
                        +
                      </span>
                    </button>
                  </div>
                );
              })}

            {!loading && announcements.length === 0 && (
              <div className="py-16 text-center text-muted-foreground">
                <Megaphone className="w-8 h-8 mx-auto mb-3 opacity-20" />
                <p className="text-sm">No announcements at this time.</p>
              </div>
            )}
          </div>

          {/* ── Events sidebar ─────────────────────────── */}
          <div className="py-10 lg:py-16 lg:pl-8">
            <div className="lg:sticky lg:top-32">
              <div className="flex items-center gap-2 mb-6">
                <Calendar className="w-4 h-4 text-primary" />
                <h3 className="font-serif text-lg font-bold text-foreground">
                  Upcoming Events
                </h3>
              </div>

              {/* Skeletons */}
              {eventsLoading &&
                [1, 2, 3].map((i) => (
                  <div key={i} className="mb-4 animate-pulse">
                    <div className="h-16 bg-muted rounded-sm" />
                  </div>
                ))}

              {/* Event cards */}
              {!eventsLoading && events.length > 0 && (
                <div className="space-y-3">
                  {events.map((event) => {
                    const dateObj = new Date(event.event_date);
                    const day = dateObj.getUTCDate();
                    const month = dateObj
                      .toLocaleString("en", { month: "short" })
                      .toUpperCase();
                    return (
                      <div
                        key={event.id}
                        className="group flex items-center gap-4 rounded-sm border border-border hover:border-primary/30 hover:bg-secondary/30 transition-all duration-300 p-3.5 cursor-pointer"
                      >
                        {/* Event Thumbnail with Date Overlay */}
                        <div className="relative w-12 h-12 rounded-xs overflow-hidden shrink-0 border border-border/50 shadow-xs">
                          <div
                            className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                            style={{
                              backgroundImage: `url(${getEventImage(event)})`,
                            }}
                          />
                          <div className="absolute inset-0 bg-black/50 group-hover:bg-primary/75 transition-colors duration-300" />
                          <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-10">
                            <span className="font-serif text-base font-bold leading-none">
                              {day}
                            </span>
                            <span className="text-[8px] font-bold tracking-wider mt-0.5">
                              {month}
                            </span>
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-sm text-foreground group-hover:text-primary transition-colors leading-snug mb-1">
                            {event.title}
                          </h4>
                          <p className="text-xs text-muted-foreground flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {formatTime(event.event_time)}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {!eventsLoading && events.length === 0 && (
                <div className="py-8 text-center text-muted-foreground">
                  <Calendar className="w-7 h-7 mx-auto mb-2 opacity-20" />
                  <p className="text-xs">No upcoming events.</p>
                </div>
              )}

              <Link
                href="/events"
                className="inline-flex items-center gap-2 mt-5 text-xs font-semibold text-muted-foreground hover:text-primary transition-colors link-underline"
              >
                All events <ArrowUpRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
