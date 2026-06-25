import type { Metadata, Viewport } from 'next'
import '@/styles/globals.css'
import SmoothScrollProvider from '@/components/layout/SmoothScrollProvider'
import CustomCursor from '@/components/ui/CustomCursor'
import ScrollProgressBar from '@/components/ui/ScrollProgressBar'

export const metadata: Metadata = {
  title: 'ONE8 – The King Edition | Virat Kohli Fan Concept',
  description:
    'A premium fan-made concept website celebrating Virat Kohli\'s legacy. Experience the world of ONE8 through cinematic storytelling, bold design, and athletic energy.',
  keywords: ['Virat Kohli', 'ONE8', 'fan concept', 'premium sneakers', 'cricket legend', 'King Edition'],
  authors: [{ name: 'Fan Concept Project' }],
  robots: 'noindex, nofollow', // Fan project – keep out of search engines
  openGraph: {
    title:       'ONE8 – The King Edition',
    description: 'A cinematic fan tribute to Virat Kohli\'s journey from dream to legacy.',
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
        {/* Preconnect for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@300;400;500;600;700&family=DM+Mono:ital,wght@0,400;0,500&display=swap"
          rel="stylesheet"
        />
        {/* Fan Project Disclaimer */}
        <meta name="robots" content="noindex, nofollow" />
      </head>
      <body className="bg-king-black text-king-white antialiased" style={{
        '--font-display': "'Bebas Neue'",
        '--font-body':    "'Inter'",
        '--font-mono':    "'DM Mono'",
      } as React.CSSProperties}>
        {/* Gold scroll progress bar */}
        <ScrollProgressBar />

        {/* Custom gold cursor */}
        <CustomCursor />

        {/* Lenis smooth scroll wrapper */}
        <SmoothScrollProvider>
          {children}
        </SmoothScrollProvider>

        {/* Fan project disclaimer bar */}
        <div
          className="fixed bottom-0 left-0 right-0 z-50 text-center py-1.5 text-xs text-king-gray-lt"
          style={{ background: 'rgba(10,10,10,0.9)', borderTop: '1px solid rgba(201,168,76,0.1)' }}
        >
          ⚡ Fan-made concept project. Not affiliated with Virat Kohli or ONE8. For UI/UX portfolio purposes only.
        </div>
      </body>
    </html>
  )
}
