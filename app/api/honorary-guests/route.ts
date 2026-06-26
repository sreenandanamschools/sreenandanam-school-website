import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

export async function GET() {
  try {
    const sbUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const sbKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!sbUrl || !sbKey) {
      return NextResponse.json(
        { success: false, error: "Supabase credentials not configured" },
        { status: 500 }
      )
    }

    const supabase = createClient(sbUrl, sbKey)

    const { data, error } = await supabase
      .from("honorary-guests")
      .select("*")
      .order("visited_at", { ascending: false })

    if (error) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true, data })
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || "Internal server error" },
      { status: 500 }
    )
  }
}
