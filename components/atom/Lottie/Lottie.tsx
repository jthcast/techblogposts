import { HTMLAttributes, useEffect, useRef } from 'react'
import lottie, { AnimationConfig } from 'lottie-web'

interface LottieComponentProps extends HTMLAttributes<HTMLDivElement> {
  json: unknown
  animationConfigs?: Partial<AnimationConfig>
}

export default function Lottie({
  json,
  animationConfigs,
  ...props
}: LottieComponentProps) {
  const lottieContainer = useRef<HTMLDivElement | null>(null)
  const jsonRef = useRef<unknown>(json)

  useEffect(() => {
    if (lottieContainer.current && jsonRef.current) {
      lottie.loadAnimation({
        container: lottieContainer.current,
        animationData: jsonRef.current,
        renderer: 'svg',
        autoplay: true,
        loop: true,
        ...animationConfigs,
      })
    }

    return () => {
      if (lottieContainer.current) lottieContainer.current = null
    }
  }, [animationConfigs])

  return <div ref={lottieContainer} {...props} />
}
