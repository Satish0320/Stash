import { ImageResponse } from 'next/og';

// Image metadata
export const size = {
  width: 32,
  height: 32,
};
export const contentType = 'image/png';

// Image generation
export default function Icon() {
  return new ImageResponse(
    (
      // ImageResponse JSX element
      <div
        style={{
          fontSize: 24,
          background: 'transparent',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
        }}
      >
        {/* Simplified "S" Logo for small sizes */}
        <svg
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Blue Background Shape */}
          <rect width="24" height="24" rx="6" fill="#2563eb" />
          
          {/* White 'S' Path */}
          <path
            d="M7 6H17C18.1046 6 19 6.89543 19 8V11C19 12.1046 18.1046 13 17 13H7C5.89543 13 5 13.8954 5 15V18C5 19.1046 5.89543 20 7 20H19"
            stroke="white"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    ),
    // ImageResponse options
    {
      ...size,
    }
  );
}