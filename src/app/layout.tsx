import type { Metadata, Viewport } from 'next'
import '@/styles/globals.css'
import SmoothScrollProvider from '@/components/layout/SmoothScrollProvider'
import CustomCursor         from '@/components/ui/CustomCursor'
import ScrollProgressBar    from '@/components/ui/ScrollProgressBar'

export const metadata: Metadata = {
  title:       'ONE8 - The King Edition | Virat Kohli Fan Concept',
  description: "A premium fan-made concept celebrating Virat Kohli's legacy through cinematic storytelling and bold design.",
  keywords:    ['Virat Kohli','ONE8','fan concept','cricket','King Edition'],
  authors:     [{ name: 'Fan Concept Project' }],
  robots:      'noindex, nofollow',
  openGraph: {
    title:       'ONE8 - The King Edition',
    description: "A cinematic fan tribute to Virat Kohli's journey from dream to legacy.",
    type:        'website',
    locale:      'en_IN',
  },
}

export const viewport: Viewport = {
  themeColor:   '#0A0A0A',
  colorScheme:  'dark',
  initialScale: 1,
  width:        'device-width',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@300;400;500;600;700&family=DM+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className="bg-[#0A0A0A] text-white antialiased"
        style={{ '--font-display':"'Bebas Neue'", '--font-body':"'Inter'", '--font-mono':"'DM Mono'" } as React.CSSProperties}
      >
        <ScrollProgressBar />
        <CustomCursor />
        <SmoothScrollProvider>
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  )
}
