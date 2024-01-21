import { useRef, useEffect, HTMLAttributes } from 'react'
import * as styles from '@/components/atom/Observer/observer.css'

interface ObserverProps extends HTMLAttributes<HTMLDivElement> {
  callback: () => void
  condition?: boolean
  options?: IntersectionObserverInit
}

export function Observer({
  callback,
  condition,
  options = {
    rootMargin: '50%',
  },
  ...props
}: ObserverProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && condition) {
          callback()
        }
      })
    }

    const observer = new IntersectionObserver(handleIntersect, options)
    const observerRef = ref.current

    if (observerRef) {
      observer.observe(observerRef)
    }

    return () => {
      if (observerRef) {
        observer.unobserve(observerRef)
      }
    }
  }, [options, condition, callback])

  return (
    <>{condition && <div ref={ref} className={styles.root} {...props} />}</>
  )
}
