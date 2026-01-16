import { ImageResponse } from 'next/og';

// Route segment config
export const runtime = 'edge';

// Image metadata
export const alt = 'Stash - Stop losing your favorite links.';
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

// Image generation
export default async function Image() {
  return new ImageResponse(
    (
      // ImageResponse JSX element
      <div
        style={{
          background: 'linear-gradient(to bottom right, #f8fafc, #e2e8f0)',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
        }}
      >
        {/* Container for Logo + Text */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '24px',
            marginBottom: '20px',
          }}
        >
          {/* YOUR STASH SVG LOGO */}
          <svg
            width="130"
            height="130"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7 6H17C18.1046 6 19 6.89543 19 8V11C19 12.1046 18.1046 13 17 13H7C5.89543 13 5 13.8954 5 15V18C5 19.1046 5.89543 20 7 20H19"
              stroke="#2563eb" 
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M5 4V10"
              stroke="#0f172a"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <path
              d="M19 14V20"
              stroke="#0f172a"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </svg>
          
          {/* Brand Name */}
          <div style={{ fontSize: 110, fontWeight: 800, color: '#0f172a', fontFamily: 'sans-serif', letterSpacing: '-0.05em' }}>
            Stash.
          </div>
        </div>

        {/* Tagline */}
        <div style={{ fontSize: 36, fontWeight: 500, color: '#64748b', fontFamily: 'sans-serif', marginTop: '10px' }}>
          The visual bookmark manager for developers.
        </div>
      </div>
    ),
    // ImageResponse options
    {
      ...size,
    }
  );
}