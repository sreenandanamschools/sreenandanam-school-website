import { NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

export async function GET() {

  if (!supabase) {
    return NextResponse.json({
      success: false,
      error: "Supabase client not initialized. Please configure your environment variables.",
      images: [],
    })
  }

  try {
    const { data, error } = await supabase
      .from("gallery")
      .select("*")
      .order("created_at", { ascending: false })

    if (error) {
      throw error
    }

    const images = (data || []).map((row: any) => ({
      id: row.id,
      category: (row.category || "activities").toLowerCase(),
      title: row.title || "Gallery Photo",
      description: row.description || `Photo from school's ${row.category || "activities"} section.`,
      image: row.image_url,
    }))

    return NextResponse.json({
      success: true,
      images,
    })
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message || "Failed to fetch gallery images from Supabase database.",
      images: [],
    }, { status: 500 })
  }
}
