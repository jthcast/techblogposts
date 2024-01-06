import { Logo } from '@/components/atom/Icon'
import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const alt = 'TechBlogPosts'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Logo
          style={{
            width: '400px',
            height: '400px',
          }}
        />
      </div>
    ),
    {
      ...size,
    },
  )
}
