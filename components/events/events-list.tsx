"use client"

import { useEffect, useState, useRef } from "react"
import { Calendar, Clock, MapPin } from "lucide-react"
import { cn } from "@/lib/utils"

interface Event {
  id: string
  title: string
  event_date: string
  event_time: string
  location: string
  description: string
}

function formatTime(timeStr: string) {
  const [h, m] = timeStr.split(":").map(Number)
  const ampm = h >= 12 ? "PM" : "AM"
  const hour = h % 12 || 12
  return `${hour}:${String(m).padStart(2, "0")} ${ampm}`
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-IN", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

export function EventsList() {
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
        const res = await fetch("/api/events?all=true")
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
    <div ref={sectionRef}>
      <div
        className={cn(
          "flex items-center gap-3 mb-8 transition-all duration-700",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        )}
      >
        <Calendar className="w-6 h-6 text-primary" />
        <h2 className="font-serif text-2xl font-bold text-foreground">
          All Events
        </h2>
      </div>

      {/* Loading Skeletons */}
      {loading && (
        <div className="grid md:grid-cols-2 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="bg-background rounded-xl border border-border p-6 animate-pulse"
            >
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-muted rounded-lg shrink-0" />
                <div className="flex-1 space-y-2">
                  <div className="h-5 bg-muted rounded w-3/4" />
                  <div className="h-4 bg-muted rounded w-1/2" />
                  <div className="h-4 bg-muted rounded w-2/3" />
                </div>
              </div>
              <div className="mt-4 space-y-2">
                <div className="h-3 bg-muted rounded w-full" />
                <div className="h-3 bg-muted rounded w-5/6" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Event Cards */}
      {!loading && events.length > 0 && (
        <div className="grid md:grid-cols-2 gap-6">
          {events.map((event, index) => {
            const dateObj = new Date(event.event_date)
            const day = dateObj.getUTCDate()
            const month = dateObj.toLocaleString("en", { month: "short" })
            const year = dateObj.getUTCFullYear()

            return (
              <article
                key={event.id}
                className={cn(
                  "group bg-background rounded-xl border border-border p-6 hover:border-primary/30 hover:shadow-lg transition-all duration-500",
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                )}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="flex items-start gap-4">
                  {/* Date Badge */}
                  <div className="w-16 h-16 bg-primary/10 rounded-lg flex flex-col items-center justify-center shrink-0 group-hover:bg-primary transition-colors">
                    <span className="text-xl font-bold text-primary group-hover:text-primary-foreground">
                      {day}
                    </span>
                    <span className="text-xs text-primary/80 group-hover:text-primary-foreground/80 uppercase">
                      {month} {year}
                    </span>
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors mb-2">
                      {event.title}
                    </h3>
                    <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {formatTime(event.event_time)}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5" />
                        {event.location}
                      </span>
                    </div>
                  </div>
                </div>

                {event.description && (
                  <p className="text-sm text-muted-foreground mt-4 line-clamp-2">
                    {event.description}
                  </p>
                )}

                <div className="mt-4 pt-3 border-t border-border">
                  <p className="text-xs text-muted-foreground">
                    <Calendar className="w-3 h-3 inline mr-1" />
                    {formatDate(event.event_date)}
                  </p>
                </div>
              </article>
            )
          })}
        </div>
      )}

      {/* Empty State */}
      {!loading && events.length === 0 && (
        <div className="text-center py-20 text-muted-foreground">
          <Calendar className="w-12 h-12 mx-auto mb-4 opacity-30" />
          <p className="text-lg font-medium mb-1">No upcoming events</p>
          <p className="text-sm">Check back soon for new events and activities.</p>
        </div>
      )}
    </div>
  )
}
