import type { Metadata, Viewport } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { SchemaOrg } from '@/components/seo/schema-org'
import './globals.css'

const playfair = Playfair_Display({ 
  subsets: ["latin"],
  variable: '--font-serif'
});

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-sans'
});

export const metadata: Metadata = {
  title: {
    default: 'SREE NANDANAM PUBLIC SCHOOL | Quality Education in Parassala, Kerala',
    template: '%s | SREE NANDANAM PUBLIC SCHOOL'
  },
  description: 'SREE NANDANAM PUBLIC SCHOOL offers quality primary and upper primary education in Parassala, Thiruvananthapuram, Kerala. Established in 2008, we provide English medium education with modern computer-aided learning facilities.',
  keywords: ['Sree Nandanam Public School', 'education', 'Kerala', 'Parassala', 'Thiruvananthapuram', 'primary school', 'upper primary', 'English medium', 'best school in parassala'],
  authors: [{ name: 'Sree Nandanam Public School' }],
  creator: 'Sree Nandanam Public School',
  publisher: 'Sree Nandanam Public School',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://sreenandanamschools.com"),
  icons: {
    icon: [
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      {
        rel: 'mask-icon',
        url: '/android-chrome-512x512.png',
      },
    ],
  },
  openGraph: {
    title: 'SREE NANDANAM PUBLIC SCHOOL | Parassala, Kerala',
    description: 'Empowering students through quality education since 2008. Explore our campus, facilities, and academic excellence.',
    url: 'https://sreenandanamschools.com',
    siteName: 'Sree Nandanam Public School',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SREE NANDANAM PUBLIC SCHOOL',
    description: 'Empowering students through quality education since 2008 in Parassala, Kerala.',
  },
}

export const viewport: Viewport = {
  themeColor: '#4a7c59',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased`}>
        <SchemaOrg />
        {children}
        <Analytics />
      </body>
    </html>
  )
}
