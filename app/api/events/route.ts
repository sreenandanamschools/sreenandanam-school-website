import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

export async function GET(request: Request) {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )

    const { searchParams } = new URL(request.url)
    const showAll = searchParams.get("all") === "true"

    let query = supabase
      .from("events")
      .select("*")

    if (!showAll) {
      query = query.gte("event_date", new Date().toISOString().split("T")[0])
    }

    const { data, error } = await query
      .order("event_date", { ascending: showAll ? false : true })

    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true, data })
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 })
  }
}
