"use client"

import { useEffect, useState, useRef } from "react"
import { Calendar, Clock, MapPin } from "lucide-react"
import { cn } from "@/lib/utils"

interface Event {
  id: string
  title: string
  event_date: string   // ISO date string e.g. "2026-03-30"
  event_time: string   // e.g. "09:00:00"
  location: string
  description: string
}

function formatTime(timeStr: string) {
  const [h, m] = timeStr.split(":").map(Number)
  const ampm = h >= 12 ? "PM" : "AM"
  const hour = h % 12 || 12
  return `${hour}:${String(m).padStart(2, "0")} ${ampm}`
}

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
                    {/* Date Badge */}
                    <div className="w-14 h-14 bg-primary/10 rounded-lg flex flex-col items-center justify-center shrink-0 group-hover:bg-primary transition-colors">
                      <span className="text-lg font-bold text-primary group-hover:text-primary-foreground">
                        {day}
                      </span>
                      <span className="text-xs text-primary/80 group-hover:text-primary-foreground/80 uppercase">
                        {month}
                      </span>
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
                      <p className="text-xs text-muted-foreground mt-2 line-clamp-1">
                        {event.description}
                      </p>
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
