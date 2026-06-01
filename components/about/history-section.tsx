"use client";

import { useEffect, useState, useRef } from "react";
import { Calendar, MapPin, Users, Award, UserCircle2 } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

const milestones = [
  {
    year: "2008",
    title: "School Founded",
    description:
      "Sree Nandanam Public School was established with a vision to provide quality English medium education in rural Parassala.",
  },
  {
    year: "2012",
    title: "Pre-Primary Section Added",
    description:
      "Expanded our offerings to include a pre-primary section, providing early childhood education.",
  },
  {
    year: "2015",
    title: "Computer Lab Established",
    description:
      "Introduced computer-aided learning with a dedicated lab to prepare students for the digital age.",
  },
  {
    year: "2018",
    title: "Infrastructure Expansion",
    description:
      "Added new classrooms and activity rooms to accommodate growing student enrollment.",
  },
  {
    year: "2023",
    title: "15+ Years of Excellence",
    description:
      "Celebrated fifteen years of commitment to education and community service.",
  },
];

interface FamousVisitor {
  id: string;
  name: string;
  designation: string;
  description: string;
  image_url: string | null;
  visited_at: string;
}

export function HistorySection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const [visitors, setVisitors] = useState<FamousVisitor[]>([]);
  const [visitorsLoading, setVisitorsLoading] = useState(true);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    async function fetchVisitors() {
      try {
        const res = await fetch("/api/honorary-guests");
        const json = await res.json();
        if (json.success) {
          setVisitors(json.data);
        }
      } catch (err) {
      } finally {
        setVisitorsLoading(false);
      }
    }
    fetchVisitors();
  }, []);

  return (
    <section ref={sectionRef} className="py-16 md:py-24 bg-card">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left Column - About Text */}
          <div>
            <h2
              className={cn(
                "font-serif text-3xl md:text-4xl font-bold text-foreground mb-6 transition-all duration-700",
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4",
              )}
            >
              Our History
            </h2>
            <div
              className={cn(
                "space-y-4 text-muted-foreground leading-relaxed transition-all duration-700 delay-100",
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4",
              )}
            >
              <p>
                Sree Nandanam Public School was established in 2008 in the rural
                area of Parassala block in Thiruvananthapuram district, Kerala.
                Founded with a vision to provide accessible, quality education
                to children in the community, our school has grown to become a
                trusted institution for Kindergarten and primary education.
              </p>
              <p>
                Over the years, we have continuously improved our facilities and
                teaching methodologies to ensure that every student receives the
                best possible foundation for their future. Our commitment to
                excellence in education has made us a preferred choice for
                parents seeking quality English medium schooling.
              </p>
            </div>

            {/* Quick Facts */}
            <div
              className={cn(
                "grid grid-cols-2 gap-4 mt-8 transition-all duration-700 delay-200",
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4",
              )}
            >
              <div className="flex items-center gap-3 p-4 bg-background rounded-xl border border-border">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">Est. 2008</p>
                  <p className="text-sm text-muted-foreground">Founded</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-background rounded-xl border border-border">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">Parassala</p>
                  <p className="text-sm text-muted-foreground">Location</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-background rounded-xl border border-border">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">Co-Ed</p>
                  <p className="text-sm text-muted-foreground">School Type</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-background rounded-xl border border-border">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Award className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">English</p>
                  <p className="text-sm text-muted-foreground">Medium</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Timeline */}
          <div
            className={cn(
              "transition-all duration-700 delay-300",
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4",
            )}
          >
            <h3 className="font-serif text-2xl font-semibold text-foreground mb-8">
              Our Journey
            </h3>
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-[23px] top-0 bottom-0 w-0.5 bg-border" />

              {/* Milestones */}
              <div className="space-y-6">
                {milestones.map((milestone, index) => (
                  <div
                    key={milestone.year}
                    className={cn(
                      "relative flex gap-6 transition-all duration-500",
                      isVisible
                        ? "opacity-100 translate-x-0"
                        : "opacity-0 translate-x-4",
                    )}
                    style={{ transitionDelay: `${(index + 4) * 100}ms` }}
                  >
                    {/* Dot */}
                    <div className="relative z-10 w-12 h-12 bg-primary rounded-full flex items-center justify-center shrink-0 text-primary-foreground font-bold text-sm">
                      {milestone.year.slice(2)}
                    </div>

                    {/* Content */}
                    <div className="flex-1 pb-6">
                      <p className="text-sm text-primary font-medium mb-1">
                        {milestone.year}
                      </p>
                      <h4 className="font-semibold text-foreground mb-2">
                        {milestone.title}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {milestone.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Honorary Guests Section */}
        <div className="mt-24">
          <div className="text-center mb-12">
            <h2
              className={cn(
                "font-serif text-3xl md:text-4xl font-bold text-foreground mb-4 transition-all duration-700",
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4",
              )}
            >
              Honorary Guests
            </h2>
            <p
              className={cn(
                "text-muted-foreground max-w-2xl mx-auto transition-all duration-700 delay-100",
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4",
              )}
            >
              Over the years, we have been honored to host several distinguished
              personalities who have inspired our students and staff.
            </p>
          </div>

          {/* Loading Skeletons */}
          {visitorsLoading && (
            <div className="grid md:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="bg-background rounded-2xl overflow-hidden border border-border animate-pulse"
                >
                  <div className="aspect-4/3 bg-muted" />
                  <div className="p-6 space-y-3">
                    <div className="h-5 bg-muted rounded w-3/4" />
                    <div className="h-4 bg-muted rounded w-1/2" />
                    <div className="h-3 bg-muted rounded w-full" />
                    <div className="h-3 bg-muted rounded w-5/6" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Visitor Cards */}
          {!visitorsLoading && visitors.length > 0 && (
            <div className="grid md:grid-cols-3 gap-8">
              {visitors.map((visitor, index) => (
                <div
                  key={visitor.id}
                  className={cn(
                    "bg-background rounded-2xl overflow-hidden border border-border hover:shadow-lg hover:border-primary/30 transition-all duration-500 group",
                    isVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-4",
                  )}
                  style={{ transitionDelay: `${(index + 2) * 100}ms` }}
                >
                  <div className="aspect-4/3 bg-muted relative overflow-hidden">
                    {visitor.image_url ? (
                      <Image
                        src={visitor.image_url}
                        alt={visitor.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <UserCircle2 className="w-16 h-16 text-muted-foreground/30" />
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="font-serif text-xl font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                      {visitor.name}
                    </h3>
                    <p className="text-sm text-primary font-medium mb-3">
                      {visitor.designation}
                    </p>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {visitor.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Empty State */}
          {!visitorsLoading && visitors.length === 0 && (
            <div className="text-center py-16 text-muted-foreground">
              <UserCircle2 className="w-12 h-12 mx-auto mb-4 opacity-30" />
              <p className="text-sm">No records found.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
