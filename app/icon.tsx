import { Logo } from '@/components/atom/Icon'
import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const size = {
  width: 32,
  height: 32,
}
export const contentType = 'image/svg'

export default function Icon() {
  return new ImageResponse(
    (
      <Logo
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      />
    ),
    {
      ...size,
    },
  )
}
