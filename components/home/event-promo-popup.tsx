"use client";

import { useEffect, useState } from "react";
import { Calendar, Clock, MapPin, X, ArrowRight, Sparkles } from "lucide-react";
import { Event, getEventImage, formatTime } from "@/lib/events";
import { cn } from "@/lib/utils";

export function EventPromoPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [featuredEvent, setFeaturedEvent] = useState<Event | null>(null);
  const [countdownText, setCountdownText] = useState("");

  useEffect(() => {
    async function checkPromo() {
      try {
        const res = await fetch("/api/events");
        const json = await res.json();

        if (!json.success || !json.data || json.data.length === 0) {
          return;
        }

        // Get the closest upcoming event (the API sorts them ascending by date)
        const event = json.data[0] as Event;

        // Calculate days remaining
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const eventDate = new Date(event.event_date);
        eventDate.setHours(0, 0, 0, 0);

        const diffTime = eventDate.getTime() - today.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        // If the event has already passed, don't show the promo
        if (diffDays < 0) {
          return;
        }

        // Check sessionStorage to see if user dismissed this specific event promo during this visit
        const dismissedId = sessionStorage.getItem("promo_dismissed_session_event_id");
        if (dismissedId === event.id) {
          return;
        }

        // Formulate countdown text
        if (diffDays === 0) {
          setCountdownText("Happening Today!");
        } else if (diffDays === 1) {
          setCountdownText("Happening Tomorrow!");
        } else {
          setCountdownText(`Happening in ${diffDays} days!`);
        }

        setFeaturedEvent(event);

        // Slight delay before opening the popup so it feels natural after page load
        const timer = setTimeout(() => {
          setIsOpen(true);
        }, 1500);

        return () => clearTimeout(timer);
      } catch (err) {
        console.error("Failed to fetch promo event:", err);
      }
    }

    checkPromo();
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    if (featuredEvent) {
      sessionStorage.setItem("promo_dismissed_session_event_id", featuredEvent.id);
    }
  };

  if (!isOpen || !featuredEvent) return null;

  const eventImage = getEventImage(featuredEvent);
  const dateObj = new Date(featuredEvent.event_date);
  const dayStr = dateObj.getUTCDate();
  const monthStr = dateObj.toLocaleString("en", { month: "short" });
  const yearStr = dateObj.getUTCFullYear();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center sm:p-4">
      {/* Backdrop blur */}
      <div
        className="absolute inset-0 bg-black/75 backdrop-blur-md transition-opacity duration-500 animate-in fade-in"
        onClick={handleClose}
      />

      {/* 3:4 Portrait Poster Modal Card - Full Height on Mobile, Centered Card on Desktop */}
      <div className="relative w-full max-w-xl h-full sm:h-[90vh] sm:max-h-[850px] sm:rounded-2xl overflow-hidden shadow-2xl border border-white/15 z-10 transform transition-all duration-500 animate-in zoom-in-95 flex flex-col justify-end">
        {/* Close Button - upper right of the poster */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-30 w-8 h-8 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center border border-white/20 transition-all cursor-pointer hover:scale-105 active:scale-95 shadow-md"
          aria-label="Close promotion"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Clickable Image Poster Banner */}
        <a
          href="/events"
          onClick={handleClose}
          className="absolute inset-0 cursor-pointer group z-0 flex flex-col justify-end p-6 md:p-8"
        >
          {/* Background image zoom on hover */}
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-8000 scale-102 group-hover:scale-106"
            style={{ backgroundImage: `url(${eventImage})` }}
          />
          {/* Bottom shadow gradient for readability */}
          <div className="absolute inset-0 bg-linear-to-t from-black/95 via-black/40 to-transparent transition-opacity duration-300" />

          {/* Floating dynamic countdown/badge in top-left */}
          <div className="absolute top-4 left-4 bg-amber-500 text-black px-2.5 py-1 rounded-full flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider shadow-md z-20">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{countdownText}</span>
          </div>

          {/* Bottom Info Overlay inside the poster */}
          <div className="relative text-white z-20 space-y-3">
            <span className="text-[10px] font-bold text-gold tracking-widest uppercase block">
              Upcoming Featured Event
            </span>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-white tracking-wide leading-tight group-hover:text-gold transition-colors duration-300">
              {featuredEvent.title}
            </h2>

            {/* Event Stats */}
            <div className="space-y-1.5 pt-1 text-xs md:text-sm text-white/90">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-gold shrink-0" />
                <span>
                  {dateObj.toLocaleDateString("en-IN", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-gold shrink-0" />
                <span>{formatTime(featuredEvent.event_time)}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-gold shrink-0" />
                <span className="font-medium text-white">
                  {featuredEvent.location}
                </span>
              </div>
            </div>

            {/* Action Hint */}
            <div className="text-[11px] font-bold text-gold pt-3 flex items-center gap-1.5 group-hover:text-white transition-colors duration-300">
              <span>View Event Details</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </div>
          </div>
        </a>
      </div>
    </div>
  );
}
