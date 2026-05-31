"use client";

import { useEffect, useState, useRef } from "react";
import { Calendar, Megaphone } from "lucide-react";
import { cn } from "@/lib/utils";

interface Announcement {
  id: string;
  title: string;
  content: string;
  type: string;
  target_audience: string;
  published_date: string;
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function NewsList() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [announcementsLoading, setAnnouncementsLoading] = useState(true);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    async function fetchAnnouncements() {
      try {
        const res = await fetch("/api/announcements");
        const json = await res.json();
        if (json.success) setAnnouncements(json.data);
      } catch (err) {
      } finally {
        setAnnouncementsLoading(false);
      }
    }

    fetchAnnouncements();
  }, []);

  return (
    <div ref={sectionRef}>
      <div
        className={cn(
          "flex items-center gap-3 mb-6 transition-all duration-700",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
        )}
      >
        <Megaphone className="w-6 h-6 text-accent" />
        <h2 className="font-serif text-2xl font-bold text-foreground">
          Announcements
        </h2>
      </div>

      {/* Loading Skeletons */}
      {announcementsLoading && (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-background rounded-xl border border-border border-l-4 border-l-accent p-5 md:p-6 animate-pulse"
            >
              <div className="flex items-start justify-between gap-4 mb-3">
                <div className="flex gap-2">
                  <div className="h-5 w-16 bg-muted rounded" />
                  <div className="h-5 w-12 bg-muted rounded" />
                </div>
                <div className="h-4 w-28 bg-muted rounded" />
              </div>
              <div className="h-5 w-3/4 bg-muted rounded mb-2" />
              <div className="h-4 w-full bg-muted rounded" />
              <div className="h-4 w-5/6 bg-muted rounded mt-1" />
            </div>
          ))}
        </div>
      )}

      {/* Announcement Cards */}
      {!announcementsLoading && announcements.length > 0 && (
        <div className="space-y-4">
          {announcements.map((item, index) => (
            <article
              key={item.id}
              className={cn(
                "group bg-background rounded-xl border border-border border-l-4 border-l-accent p-5 md:p-6 hover:shadow-md transition-all duration-500",
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4",
              )}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-4 mb-3">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="px-2 py-1 bg-accent/10 text-accent rounded text-xs font-medium capitalize">
                    {item.type}
                  </span>
                  <span className="px-2 py-1 bg-secondary text-secondary-foreground rounded text-xs font-medium">
                    {item.target_audience}
                  </span>
                </div>
                <span className="text-xs text-muted-foreground flex items-center gap-1 shrink-0">
                  <Calendar className="w-3 h-3" />
                  {formatDate(item.published_date)}
                </span>
              </div>

              {/* Title */}
              <h3 className="font-semibold text-foreground group-hover:text-accent transition-colors mb-2">
                {item.title}
              </h3>

              {/* Content */}
              <p className="text-sm text-muted-foreground line-clamp-3">
                {item.content}
              </p>
            </article>
          ))}
        </div>
      )}

      {/* Empty State */}
      {!announcementsLoading && announcements.length === 0 && (
        <div className="text-center py-16 text-muted-foreground">
          <Megaphone className="w-10 h-10 mx-auto mb-3 opacity-30" />
          <p className="text-sm">No announcements at this time.</p>
        </div>
      )}
    </div>
  );
}

