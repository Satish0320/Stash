import { ImageResponse } from 'next/og';
import { prisma } from '@/lib/prisma'; 

export const runtime = 'nodejs';

export const alt = 'Stash Collection';
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

// FIX: Type 'params' as a Promise
export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  
  // FIX: Await the params before using them
  const { slug } = await params;

  // 1. Fetch Data
  const folder = await prisma.folder.findUnique({
    where: { id: slug },
    select: {
      name: true,
      _count: {
        select: { links: true }
      }
    }
  });

  const folderName = folder?.name || 'Shared Collection';
  const linkCount = folder?._count?.links || 0;

  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(to bottom right, #f8fafc, #e2e8f0)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'white',
            padding: '60px 80px',
            borderRadius: '40px',
            boxShadow: '0 20px 50px rgba(0,0,0,0.1)',
            border: '1px solid #cbd5e1',
          }}
        >
          {/* Logo Row */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '40px' }}>
             {/* Stash Logo SVG */}
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="24" height="24" rx="6" fill="#2563eb" />
              <path d="M7 6H17C18.1046 6 19 6.89543 19 8V11C19 12.1046 18.1046 13 17 13H7C5.89543 13 5 13.8954 5 15V18C5 19.1046 5.89543 20 7 20H19" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <div style={{ fontSize: 32, fontWeight: 'bold', color: '#64748b' }}>Stash.</div>
          </div>

          {/* DYNAMIC FOLDER NAME */}
          <div style={{ fontSize: 72, fontWeight: 900, color: '#0f172a', textAlign: 'center', lineHeight: 1.1, maxWidth: '900px', marginBottom: '20px' }}>
            {folderName}
          </div>

          {/* Link Count */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: '#eff6ff', padding: '10px 24px', borderRadius: '100px', border: '1px solid #bfdbfe' }}>
            <div style={{ fontSize: 24, fontWeight: 600, color: '#2563eb' }}>
              {linkCount} {linkCount === 1 ? 'Link' : 'Links'} inside
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}