"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Phone, Mail, MapPin, Clock } from "lucide-react"

const contactDetails = [
  {
    icon: Phone,
    title: "Phone",
    details: ["+0471 2202698", "+0471 2201497"],
    description: "Call us during school hours"
  },
  {
    icon: Mail,
    title: "Email",
    details: ["sreenandadnamschools@gmail.com"],
    description: "We respond within 24 hours"
  },
  {
    icon: MapPin,
    title: "Campuses",
    details: ["Public School: Near KSRTC Depot, Kurumkutty", "Kindergarten: Near Mahadeva Temple ,Parassala,"],
    description: "Visit us at either branch"
  },
  {
    icon: Clock,
    title: "Office Hours",
    details: ["Monday - Friday: 8:00 AM - 4:00 PM", "Saturday: 8:00 AM - 12:00 PM"],
    description: "Closed on Sundays & Public Holidays"
  }
]

export function ContactInfo() {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
            Get In Touch
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-pretty">
            Have questions about admissions, academics, or our programs?
            Reach out to us through any of the channels below.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {contactDetails.map((item, index) => (
            <Card
              key={index}
              className="group hover:shadow-lg transition-all duration-300 border-border/50 hover:border-primary/30"
            >
              <CardContent className="p-6 text-center">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 text-primary mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                  <item.icon className="w-7 h-7" />
                </div>
                <h3 className="font-semibold text-lg text-foreground mb-3">
                  {item.title}
                </h3>
                <div className="space-y-1 mb-3">
                  {item.details.map((detail, idx) => (
                    <p key={idx} className="text-sm text-foreground/80">
                      {detail}
                    </p>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground">
                  {item.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
