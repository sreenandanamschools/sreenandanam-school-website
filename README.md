# Sree Nandanam School Website & Administration System

A premium, highly responsive web application built with **Next.js 16 (App Router)**, **TypeScript**, **Tailwind CSS v4**, and **Supabase**. This system powers the public facing website for Sree Nandanam Public School, including academic programs, admissions workflow, announcements, career applications, event schedules, and a secure ID card printing portal for students and staff.

---

## 🚀 Key Features

*   **Public Website**: Dynamic pages covering About Us, Academics, Facilities, Events, Galleries, News, Admissions, and Contact sections.
*   **Student Wellbeing Hub**: Mental health and counselling section detailing professional support and psychological consulting services.
*   **Interactive Student & Teacher Lookup**: Dedicated lookup routing for student and teacher profiles with clean layouts designed for identity card printing.
*   **Media & Galleries**: Robust image loading powered by Cloudinary with category filtering (Academics, Facilities, Sports, Activities).
*   **Announcements & News Feed**: Real-time ticker and list feed showing official notices and press releases.
*   **Careers Portal**: Job applications processing with direct PDF resume upload to Cloudinary and registration into the database.

---

## 🛠️ Tech Stack & Key Libraries

| Technology | Purpose |
| :--- | :--- |
| **Next.js 16 (App Router)** | Framework for React, server-side rendering, and serverless API routing. |
| **TypeScript** | Type-safe development across frontend components and backend API endpoints. |
| **Tailwind CSS v4** | Clean, fluid layout and responsive utility styling. |
| **Supabase JS** | Database backend integration for students, teachers, events, careers, and news. |
| **Cloudinary / Next-Cloudinary** | Media asset delivery and PDF resume attachments processing. |
| **Radix UI** | Unstyled, accessible UI primitives (Accordion, Dialog, Tabs, Dropdowns). |
| **React Hook Form / Zod** | Client-side form management and data validation. |
| **Lucide React** | Consistent, modern vector iconography. |

---

## 📂 Directory Structure

```text
├── app/                       # Next.js App Router root
│   ├── api/                   # Serverless backend endpoints
│   │   ├── announcements/     # Fetch official school announcements
│   │   ├── careers/           # Submit careers applications & upload resumes
│   │   ├── events/            # Fetch academic & extracurricular events
│   │   ├── famous-visitors/   # Fetch visitors logs and photos
│   │   ├── gallery/           # Fetch Cloudinary asset links by category
│   │   ├── news/              # Fetch news articles
│   │   ├── students/          # Student details & enrollment lookup
│   │   └── teachers/          # Teacher details lookup
│   ├── about/                 # About the school, staff, and leadership pages
│   ├── academics/             # Curriculum and classes info pages
│   ├── admissions/            # Application process overview
│   ├── gallery/               # Photo gallery frontend
│   ├── s/                     # Secure id-card printing routes
│   │   └── id-card/
│   │       ├── student/[studentId]/  # Print-ready student profile
│   │       └── teacher/[teacherId]/  # Print-ready teacher profile
│   └── layout.tsx             # Root page wrappers and providers
├── components/                # Reusable React UI Components
│   ├── ui/                    # Shadcn/Radix atomic UI components
│   ├── home/                  # Home page specific sections
│   ├── admissions/            # Admissions portal elements
│   ├── shared/                # Navbar, Footer, and general layouts
│   └── navigation.tsx         # Responsive header component
├── hooks/                     # Custom React Hooks
│   ├── use-mobile.ts          # Detect mobile viewport sizes
│   ├── use-scroll-animation.ts# Intersection observer hooks for page reveals
│   └── use-toast.ts           # Visual notifications trigger
├── lib/                       # Utility and backend helper functions
│   ├── supabase.ts            # Supabase client instantiation
│   └── utils.ts               # CSS class merging tools
└── styles/                    # Global stylesheet & Tailwind directives
```

---

## ⚙️ Getting Started & Local Setup

### 1. Prerequisites
Ensure you have the following installed on your local development machine:
*   [Node.js](https://nodejs.org/) (Version `18.x` or higher recommended, target `20.x`)
*   `npm` or `pnpm` package manager

### 2. Environment Variables Configuration
Create a `.env.local` file in the root directory. Copy and configure the following variables:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here

# Cloudinary Configuration (Optional - for uploading resumes/media)
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

### 3. Installation
Install the project dependencies using your package manager:
```bash
npm install
# or
pnpm install
```

### 4. Running the Development Server
Start the local server. The website will be accessible at [http://localhost:3000](http://localhost:3000):
```bash
npm run dev
```

### 5. Building for Production
Verify correctness and bundle the application for production deployment:
```bash
npm run build
```

---

## 📊 Database Schemas

The following SQL structures are used in the Supabase database instance:

### 1. Careers Table (`careers`)
Stores job applications submitted via the Careers page.
```sql
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
```

### 2. Students & Enrollments Tables (`students`, `classes`, `academic_years`)
Powers student ID lookup card queries and details.
*   **`students`**: Contains student base records, photos, admission numbers, custom identifier tags (`studentid`), and active status indicators.
*   **`classes`**: Tracks grades and sections.
*   **`student_enrollments`**: Connects students to classes and academic years with status tracking.

### 3. Teachers Table (`teachers`)
Stores teacher details, photos, designations, department details, and custom string IDs (`teacherid`) for lookup rendering.
