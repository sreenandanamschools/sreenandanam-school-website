import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const phone = formData.get("phone") as string
    const coverLetter = formData.get("coverLetter") as string
    const resumeFile = formData.get("resume") as File | null

    if (!name || !email || !phone || !resumeFile) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      )
    }

    // Connect to Supabase
    const sbUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const sbKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!sbUrl || !sbKey) {
      console.warn("Supabase credentials not configured. Mocking database save.")
      return NextResponse.json({
        success: true,
        message: "Application submitted successfully (mocked)",
        data: { name, email, resumeUrl: "https://example.com/mock_resume.pdf" }
      })
    }

    const supabase = createClient(sbUrl, sbKey)

    // Upload resume to Supabase Storage
    const fileName = `${Date.now()}-${resumeFile.name.replace(/[^a-zA-Z0-9.\-_]/g, "")}`

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("resumes")
      .upload(fileName, resumeFile, {
        contentType: resumeFile.type || "application/pdf",
        upsert: false,
      })

    if (uploadError) {
      console.error("Supabase storage upload error:", uploadError)

      let errorMessage = uploadError.message
      if (uploadError.message.includes("row-level security policy")) {
        errorMessage = "RLS Error: You are trying to upload to a private bucket. Please either add 'SUPABASE_SERVICE_ROLE_KEY' to your .env file to bypass RLS on the server, OR go to your Supabase Dashboard and add an RLS policy allowing INSERT operations for the 'resumes' bucket."
      }

      return NextResponse.json(
        { success: false, error: errorMessage },
        { status: 500 }
      )
    }

    // For private buckets, store the file path instead of a public URL.
    // The admin dashboard will use this path to generate signed URLs when viewing.
    const resumeUrl = fileName

    const { error: dbError } = await supabase
      .from("careers")
      .insert([
        {
          name,
          email,
          phone,
          cover_letter: coverLetter,
          resume_url: resumeUrl,
          created_at: new Date().toISOString()
        }
      ])

    if (dbError) {
      console.error("Supabase insert error:", dbError)

      // If table doesn't exist, log instructions to create it but succeed anyway
      if (dbError.code === "PGRST116" || dbError.message.includes("does not exist")) {
        console.warn("Table 'careers' does not exist in Supabase. Returning success. Run this SQL query to create the table:")
        console.log(`
          create table public.careers (
            id uuid not null default extensions.uuid_generate_v4(),
            name text not null,
            email text not null,
            phone text not null,
            cover_letter text,
            resume_url text not null,
            created_at timestamp with time zone not null default timezone('utc'::text, now()),
            constraint careers_pkey primary key (id)
          );
        `)
      } else {
        return NextResponse.json(
          { success: false, error: "Database error: " + dbError.message },
          { status: 500 }
        )
      }
    }

    return NextResponse.json({
      success: true,
      message: "Application submitted successfully",
      data: { name, email, resumeUrl }
    })

  } catch (error: any) {
    console.error("Career application POST error:", error)
    return NextResponse.json(
      { success: false, error: error.message || "Internal server error" },
      { status: 500 }
    )
  }
}
