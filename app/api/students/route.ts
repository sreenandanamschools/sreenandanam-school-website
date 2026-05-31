import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

// Shared helper: pick the best enrollment from a student_enrollments array.
// The DB guarantees at most ONE active enrollment per student (partial unique index).
// If none is active, fall back to the most recently joined enrollment.
function resolveEnrollment(enrollments: any[]) {
  if (!enrollments?.length) return null
  const active = enrollments.find((e) => e.status === "active")
  if (active) return active
  // Sort by joined_on descending, pick most recent
  return [...enrollments].sort((a, b) =>
    new Date(b.joined_on ?? b.created_at).getTime() -
    new Date(a.joined_on ?? a.created_at).getTime()
  )[0]
}

// The enrollment select fragment — section comes from student_enrollments first,
// then falls back to the section column on the classes record itself.
const ENROLLMENT_SELECT = `
  status,
  section,
  roll_no,
  joined_on,
  created_at,
  classes ( class_name, section ),
  academic_years ( name, start_date, end_date, is_active )
`

function formatStudent(raw: any) {
  const enrollment = resolveEnrollment(raw.student_enrollments)
  return {
    ...raw,
    // Flatten enrollment data to the top level for easy consumption on the client
    classes: enrollment?.classes ?? null,
    academic_years: enrollment?.academic_years ?? null,
    // Enrollment-level section overrides class-level section
    section: enrollment?.section ?? enrollment?.classes?.section ?? null,
    roll_no: enrollment?.roll_no ?? null,
    enrollment_status: enrollment?.status ?? null,
  }
}

export async function GET(request: Request) {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )

    const { searchParams } = new URL(request.url)
    const studentId = searchParams.get("id") || searchParams.get("studentid")

    // ── Single student lookup ──────────────────────────────────────────────
    if (studentId) {
      const trimmedId = studentId.trim()
      const isUUID =
        /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(trimmedId)

      const selectQuery = `*, student_enrollments ( ${ENROLLMENT_SELECT} )`

      let data: any = null
      let error: any = null

      // 1. Try exact UUID match on the primary key
      if (isUUID) {
        const result = await supabase
          .from("students")
          .select(selectQuery)
          .eq("id", trimmedId)
          .maybeSingle()
        data = result.data
        error = result.error
      }

      // 2. Fallback: match on friendly studentid text column (prefix match)
      if (!data && !error) {
        const result = await supabase
          .from("students")
          .select(selectQuery)
          .ilike("studentid", `${trimmedId}%`)
          .maybeSingle()
        data = result.data
        error = result.error
      }

      // 3. Last resort: try matching on admission_no
      if (!data && !error) {
        const result = await supabase
          .from("students")
          .select(selectQuery)
          .ilike("admission_no", `${trimmedId}%`)
          .maybeSingle()
        data = result.data
        error = result.error
      }

      if (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 })
      }

      if (!data) {
        return NextResponse.json({ success: false, error: "Student not found" }, { status: 404 })
      }

      return NextResponse.json({ success: true, data: formatStudent(data) })
    }

    // ── All active students ────────────────────────────────────────────────
    const { data, error } = await supabase
      .from("students")
      .select(`*, student_enrollments ( ${ENROLLMENT_SELECT} )`)
      .eq("is_active", true)
      .order("full_name", { ascending: true })

    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      data: (data ?? []).map(formatStudent),
    })
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 })
  }
}
