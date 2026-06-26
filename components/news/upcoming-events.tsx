"use client"

import { useEffect, useState, useRef } from "react"
import { Calendar, Clock, MapPin } from "lucide-react"
import { cn } from "@/lib/utils"
import { Event, getEventImage, formatTime } from "@/lib/events"

export function UpcomingEvents() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true) },
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    async function fetchEvents() {
      try {
        const res = await fetch("/api/events")
        const json = await res.json()
        if (json.success) setEvents(json.data)
      } catch (err) {
        console.error("Failed to fetch upcoming events:", err)
      } finally {
        setLoading(false)
      }
    }
    fetchEvents()
  }, [])

  return (
    <div ref={sectionRef} id="events" className="sticky top-24">
      <div
        className={cn(
          "bg-background rounded-xl border border-border p-6 transition-all duration-700",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        )}
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <Calendar className="w-5 h-5 text-primary" />
          </div>
          <h2 className="font-serif text-xl font-bold text-foreground">
            Upcoming Events
          </h2>
        </div>

        {/* Loading Skeletons */}
        {loading && (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex gap-4 p-4 animate-pulse">
                <div className="w-14 h-14 bg-muted rounded-lg shrink-0" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-muted rounded w-3/4" />
                  <div className="h-3 bg-muted rounded w-1/2" />
                  <div className="h-3 bg-muted rounded w-full" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Event Cards */}
        {!loading && events.length > 0 && (
          <div className="space-y-4">
            {events.map((event, index) => {
              const dateObj = new Date(event.event_date)
              const day = dateObj.getUTCDate()
              const month = dateObj.toLocaleString("en", { month: "short" })

              return (
                <div
                  key={event.id}
                  className={cn(
                    "group p-4 rounded-lg hover:bg-secondary/50 transition-all duration-500 cursor-pointer",
                    isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"
                  )}
                  style={{ transitionDelay: `${(index + 1) * 100}ms` }}
                >
                  <div className="flex items-start gap-4">
                    {/* Date Badge with Background Event Image */}
                    <div className="relative w-14 h-14 rounded-lg overflow-hidden shrink-0 border border-border/60 shadow-sm">
                      <div
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                        style={{ backgroundImage: `url(${getEventImage(event)})` }}
                      />
                      <div className="absolute inset-0 bg-black/45 group-hover:bg-primary/75 transition-colors duration-300" />
                      <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-10">
                        <span className="text-base font-bold leading-none">
                          {day}
                        </span>
                        <span className="text-[10px] uppercase font-bold tracking-wider mt-0.5">
                          {month}
                        </span>
                      </div>
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-foreground group-hover:text-primary transition-colors mb-1">
                        {event.title}
                      </h3>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {formatTime(event.event_time)}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {event.location}
                        </span>
                      </div>
                      {event.description && (
                        <p className="text-xs text-muted-foreground mt-2 line-clamp-1">
                          {event.description}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {/* Empty State */}
        {!loading && events.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <Calendar className="w-8 h-8 mx-auto mb-2 opacity-30" />
            <p className="text-sm">No upcoming events.</p>
          </div>
        )}

        <a href="/events" className="block w-full mt-4 px-4 py-2 text-sm font-medium text-primary hover:bg-primary/10 rounded-lg transition-colors text-center">
          View All Events
        </a>
      </div>

      {/* Quick Links */}
      <div
        className={cn(
          "bg-background rounded-xl border border-border p-6 mt-6 transition-all duration-700 delay-200",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        )}
      >
        <h3 className="font-semibold text-foreground mb-4">Quick Links</h3>
        <ul className="space-y-2">
          <li>
            <a href="/admissions" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Admission Information
            </a>
          </li>
          <li>
            <a href="/academics" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Academic Calendar
            </a>
          </li>
          <li>
            <a href="/contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Contact Us
            </a>
          </li>
          <li>
            <a href="/gallery" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Photo Gallery
            </a>
          </li>
        </ul>
      </div>
    </div>
  )
}

