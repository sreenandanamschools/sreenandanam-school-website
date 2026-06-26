"use client"

import { useEffect, useState, useRef } from "react"
import { Calendar, Clock, MapPin } from "lucide-react"
import { cn } from "@/lib/utils"
import { Event, getEventImage, formatTime, formatDate } from "@/lib/events"

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
        console.error("Failed to fetch events:", err)
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
              className="bg-background rounded-xl border border-border overflow-hidden animate-pulse flex flex-col"
            >
              <div className="aspect-video w-full bg-muted" />
              <div className="p-6 flex-1 space-y-4">
                <div className="h-6 bg-muted rounded w-3/4" />
                <div className="space-y-2">
                  <div className="h-4 bg-muted rounded w-1/2" />
                  <div className="h-4 bg-muted rounded w-2/3" />
                </div>
                <div className="pt-4 border-t border-border mt-auto">
                  <div className="h-3 bg-muted rounded w-1/3" />
                </div>
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
                  "group bg-background rounded-xl border border-border overflow-hidden hover:border-primary/30 hover:shadow-lg transition-all duration-500 flex flex-col justify-between",
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                )}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div>
                  {/* Event Image Banner with floating date badge */}
                  <div className="relative aspect-video w-full overflow-hidden bg-muted shrink-0">
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                      style={{ backgroundImage: `url(${getEventImage(event)})` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                    
                    {/* Date Badge overlay */}
                    <div className="absolute top-4 left-4 bg-primary text-primary-foreground px-3 py-1.5 rounded-lg flex flex-col items-center shadow-md border border-primary/10">
                      <span className="text-lg font-bold font-serif leading-none">{day}</span>
                      <span className="text-[9px] uppercase font-bold tracking-wider mt-0.5">{month}</span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6">
                    <h3 className="font-serif text-xl font-bold text-foreground group-hover:text-primary transition-colors mb-3 leading-snug">
                      {event.title}
                    </h3>
                    
                    <div className="flex flex-col gap-2 text-sm text-muted-foreground mb-4">
                      <span className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-primary shrink-0" />
                        {formatTime(event.event_time)}
                      </span>
                      <span className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-primary shrink-0" />
                        {event.location}
                      </span>
                    </div>

                    {event.description && (
                      <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                        {event.description}
                      </p>
                    )}
                  </div>
                </div>

                <div className="p-6 pt-0 mt-auto">
                  <div className="pt-4 border-t border-border flex items-center justify-between text-xs text-muted-foreground">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-primary" />
                      {formatDate(event.event_date)}
                    </span>
                  </div>
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

