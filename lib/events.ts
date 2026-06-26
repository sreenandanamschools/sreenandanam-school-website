export interface Event {
  id: string
  title: string
  event_date: string   // ISO date string e.g. "2026-03-30"
  event_time: string   // e.g. "09:00:00"
  location: string
  description: string
  image_url?: string   // Primary DB image column
  image?: string       // Fallback DB image column
}

/**
 * Resolves the display image for an event.
 * First checks if the database record provides a custom 'image_url' or 'image' field.
 * If neither is present, falls back to a relevant local image based on title keyword matching.
 */
export function getEventImage(event: { title: string; image_url?: string; image?: string }): string {
  // Explicitly fetch and return the image from the database column if populated
  if (event.image_url) return event.image_url
  if (event.image) return event.image

  const title = event.title.toLowerCase()
  if (title.includes("sport") || title.includes("athletic") || title.includes("play") || title.includes("game")) {
    return "/images/sports.jpg"
  }
  if (
    title.includes("cultural") ||
    title.includes("celebration") ||
    title.includes("arts") ||
    title.includes("day") ||
    title.includes("festival") ||
    title.includes("independence") ||
    title.includes("annual")
  ) {
    return "/images/cultural.jpg"
  }
  if (
    title.includes("parent") ||
    title.includes("teacher") ||
    title.includes("meeting") ||
    title.includes("ptm") ||
    title.includes("orientation") ||
    title.includes("class")
  ) {
    return "/images/classroom.jpg"
  }
  if (title.includes("science") || title.includes("lab") || title.includes("exhibition") || title.includes("project")) {
    return "/images/science.jpg"
  }
  if (title.includes("computer") || title.includes("tech") || title.includes("coding")) {
    return "/images/computer-lab.jpg"
  }
  if (title.includes("library") || title.includes("book") || title.includes("read")) {
    return "/images/library.jpg"
  }
  if (title.includes("art") || title.includes("draw") || title.includes("paint")) {
    return "/images/art-class.jpg"
  }
  if (title.includes("assembly") || title.includes("morning") || title.includes("prayer")) {
    return "/images/assembly.jpg"
  }
  
  // Default fallback image
  return "/images/hero-school.jpg"
}

export function formatTime(timeStr: string) {
  if (!timeStr) return ""
  const [h, m] = timeStr.split(":").map(Number)
  const ampm = h >= 12 ? "PM" : "AM"
  const hour = h % 12 || 12
  return `${hour}:${String(m).padStart(2, "0")} ${ampm}`
}

export function formatDate(dateStr: string) {
  if (!dateStr) return ""
  return new Date(dateStr).toLocaleDateString("en-IN", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}
