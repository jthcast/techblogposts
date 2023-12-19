import { useRef, useEffect, HTMLAttributes, ReactNode } from 'react'
import * as styles from '@/components/atom/Observer/Observer.css'

interface ObserverProps extends HTMLAttributes<HTMLDivElement> {
  callback: () => void
  condition?: boolean
  options?: IntersectionObserverInit
  indicator?: ReactNode
}

export function Observer({
  callback,
  condition,
  indicator,
  options = {
    rootMargin: '30%',
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
    <>
      {condition && (
        <div className={styles.root} {...props}>
          <div ref={ref}>{indicator}</div>
        </div>
      )}
    </>
  )
}
