import { ImageResponse } from 'next/og'

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#0A0A0A',
          backgroundImage:
            'radial-gradient(ellipse 60% 60% at 50% 100%, rgba(192,192,192,0.15) 0%, transparent 70%)',
        }}
      >
        {/* ONE8 wordmark */}
        <div
          style={{
            fontSize: 130,
            fontWeight: 900,
            letterSpacing: 8,
            color: '#C0C0C0',
            fontFamily: 'Georgia, serif',
            display: 'flex',
          }}
        >
          ONE8
        </div>
        {/* Subtitle */}
        <div
          style={{
            fontSize: 28,
            letterSpacing: 12,
            color: 'rgba(255,255,255,0.55)',
            textTransform: 'uppercase',
            marginTop: 12,
            display: 'flex',
          }}
        >
          The King Edition
        </div>
        {/* Tagline */}
        <div
          style={{
            fontSize: 18,
            color: 'rgba(192,192,192,0.6)',
            marginTop: 30,
            letterSpacing: 2,
            display: 'flex',
          }}
        >
          Greatness Isn't Given. It's Earned.
        </div>
      </div>
    ),
    { ...size }
  )
}
