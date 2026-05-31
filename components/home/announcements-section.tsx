"use client"

import { useEffect, useState, useRef } from "react"
import Link from "next/link"
import { Calendar, ArrowRight, Clock, Megaphone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface Announcement {
  id: string
  title: string
  content: string
  type: string
  target_audience: string
  published_date: string
}

interface Event {
  id: string
  title: string
  event_date: string
  event_time: string
}

function formatTime(timeStr: string) {
  const [h, m] = timeStr.split(":").map(Number)
  const ampm = h >= 12 ? "PM" : "AM"
  const hour = h % 12 || 12
  return `${hour}:${String(m).padStart(2, "0")} ${ampm}`
}

export function AnnouncementsSection() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  const [announcements, setAnnouncements] = useState<Announcement[]>([])
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [eventsLoading, setEventsLoading] = useState(true)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true) },
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    fetch("/api/announcements")
      .then(r => r.json())
      .then(json => { if (json.success) setAnnouncements(json.data) })
      .finally(() => setLoading(false))

    fetch("/api/events")
      .then(r => r.json())
      .then(json => { if (json.success) setEvents(json.data.slice(0, 3)) })
      .finally(() => setEventsLoading(false))
  }, [])

  return (
    <section ref={sectionRef} className="py-16 md:py-24 bg-secondary/50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
          <div>
            <p className={cn(
              "text-primary font-medium mb-2 transition-all duration-700",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            )}>
              Stay Updated
            </p>
            <h2 className={cn(
              "font-serif text-3xl md:text-4xl font-bold text-foreground transition-all duration-700 delay-100",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            )}>
              Announcements
            </h2>
          </div>
          <Button
            asChild
            variant="outline"
            className={cn(
              "transition-all duration-700 delay-200",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            )}
          >
            <Link href="/news">
              View All
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </Button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Announcements Column */}
          <div className="lg:col-span-2 space-y-4">
            {/* Skeletons */}
            {loading && [1, 2, 3].map(i => (
              <div key={i} className="bg-card rounded-xl p-5 border border-border animate-pulse">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-muted rounded-lg shrink-0" />
                  <div className="flex-1 space-y-2">
                    <div className="flex gap-2">
                      <div className="h-4 w-20 bg-muted rounded" />
                      <div className="h-4 w-24 bg-muted rounded" />
                    </div>
                    <div className="h-4 w-3/4 bg-muted rounded" />
                    <div className="h-3 w-full bg-muted rounded" />
                    <div className="h-3 w-5/6 bg-muted rounded" />
                  </div>
                </div>
              </div>
            ))}

            {/* Announcement Cards */}
            {!loading && announcements.map((item, index) => (
              <div
                key={item.id}
                className={cn(
                  "group bg-card rounded-xl p-5 md:p-6 border border-border border-l-4 border-l-accent hover:shadow-md transition-all duration-500",
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                )}
                style={{ transitionDelay: `${(index + 3) * 100}ms` }}
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center shrink-0">
                    <Megaphone className="w-5 h-5 text-accent" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <span className="text-xs font-medium text-accent bg-accent/10 px-2 py-1 rounded capitalize">
                        {item.type}
                      </span>
                      <span className="text-xs font-medium text-muted-foreground bg-secondary px-2 py-1 rounded">
                        {item.target_audience}
                      </span>
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(item.published_date).toLocaleDateString("en-IN", {
                          day: "numeric", month: "short", year: "numeric"
                        })}
                      </span>
                    </div>
                    <h3 className="font-semibold text-foreground group-hover:text-accent transition-colors mb-2">
                      {item.title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {item.content}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            {/* Empty state */}
            {!loading && announcements.length === 0 && (
              <div className="text-center py-12 text-muted-foreground">
                <Megaphone className="w-8 h-8 mx-auto mb-2 opacity-30" />
                <p className="text-sm">No announcements at this time.</p>
              </div>
            )}
          </div>

          {/* Upcoming Events Column */}
          <div className={cn(
            "bg-card rounded-xl border border-border p-6 transition-all duration-700 delay-500",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          )}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                <Calendar className="w-5 h-5 text-accent" />
              </div>
              <h3 className="font-serif text-xl font-semibold text-foreground">
                Upcoming Events
              </h3>
            </div>

            {/* Skeletons */}
            {eventsLoading && (
              <div className="space-y-4">
                {[1, 2, 3].map(i => (
                  <div key={i} className="flex gap-4 p-3 animate-pulse">
                    <div className="w-14 h-14 bg-muted rounded-lg shrink-0" />
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-muted rounded w-3/4" />
                      <div className="h-3 bg-muted rounded w-1/2" />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Event Cards */}
            {!eventsLoading && events.length > 0 && (
              <div className="space-y-4">
                {events.map((event) => {
                  const dateObj = new Date(event.event_date)
                  const day = dateObj.getUTCDate()
                  const month = dateObj.toLocaleString("en", { month: "short" })
                  return (
                    <div
                      key={event.id}
                      className="group flex items-start gap-4 p-3 rounded-lg hover:bg-secondary/50 transition-colors cursor-pointer"
                    >
                      <div className="w-14 h-14 bg-primary/10 rounded-lg flex flex-col items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                        <span className="text-lg font-bold text-primary group-hover:text-primary-foreground">
                          {day}
                        </span>
                        <span className="text-xs text-primary/80 group-hover:text-primary-foreground/80 uppercase">
                          {month}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-foreground group-hover:text-primary transition-colors">
                          {event.title}
                        </h4>
                        <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                          <Clock className="w-3 h-3" />
                          {formatTime(event.event_time)}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}

            {/* Empty state */}
            {!eventsLoading && events.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                <Calendar className="w-8 h-8 mx-auto mb-2 opacity-30" />
                <p className="text-sm">No upcoming events.</p>
              </div>
            )}

            <Button asChild variant="ghost" className="w-full mt-4">
              <Link href="/events">
                View All Events
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
