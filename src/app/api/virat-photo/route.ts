import { NextResponse } from 'next/server'

export async function GET() {
  const URLS = [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Virat_kohli.jpg/800px-Virat_kohli.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Virat_Kohli_portrait.jpg/800px-Virat_Kohli_portrait.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/9/9a/Virat_Kohli_in_2012_ODI_series.jpg',
  ]

  for (const url of URLS) {
    try {
      const res = await fetch(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36',
          'Referer':    'https://en.wikipedia.org/',
          'Accept':     'image/webp,image/png,image/jpeg,*/*',
        },
        // @ts-ignore
        next: { revalidate: 86400 },
      })
      if (res.ok) {
        const blob = await res.arrayBuffer()
        return new NextResponse(blob, {
          headers: {
            'Content-Type':  res.headers.get('content-type') || 'image/jpeg',
            'Cache-Control': 'public, max-age=86400',
          },
        })
      }
    } catch {}
  }

  // Fallback SVG avatar if all sources fail
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 800" fill="none">
    <rect width="600" height="800" fill="#111111"/>
    <circle cx="300" cy="280" r="120" fill="#1a1a1a" stroke="#C0C0C0" stroke-width="2"/>
    <path d="M80 800 Q80 520 300 520 Q520 520 520 800Z" fill="#1a1a1a"/>
    <text x="300" y="295" text-anchor="middle" font-family="serif" font-size="80" fill="#C0C0C0" font-weight="bold">VK</text>
    <text x="300" y="700" text-anchor="middle" font-family="monospace" font-size="28" fill="#C0C0C0">VIRAT KOHLI</text>
    <text x="300" y="740" text-anchor="middle" font-family="monospace" font-size="18" fill="rgba(192,192,192,0.5)">The King</text>
  </svg>`

  return new NextResponse(svg, {
    headers: { 'Content-Type': 'image/svg+xml', 'Cache-Control': 'public, max-age=3600' },
  })
}
