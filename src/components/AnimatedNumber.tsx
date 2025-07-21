import { useEffect, useRef, useState } from 'react'
import { useInView } from 'react-intersection-observer'

export function AnimatedNumber({
  value,
  suffix = '',
  prefix = '',
  duration = 2000,
  decimals = 0,
}: {
  value: number
  suffix?: string
  prefix?: string
  duration?: number
  decimals?: number
}) {
  const [currentValue, setCurrentValue] = useState(0)
  const startTime = useRef<number | null>(null)
  const frameId = useRef<number | null>(null)
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.5,
  })

  useEffect(() => {
    if (!inView) return

    const animate = (timestamp: number) => {
      if (!startTime.current) startTime.current = timestamp
      const progress = timestamp - startTime.current

      if (progress < duration) {
        const nextValue = (progress / duration) * value
        setCurrentValue(nextValue)
        frameId.current = requestAnimationFrame(animate)
      } else {
        setCurrentValue(value)
      }
    }

    frameId.current = requestAnimationFrame(animate)

    return () => {
      if (frameId.current) {
        cancelAnimationFrame(frameId.current)
      }
    }
  }, [inView, value, duration])

  return (
    <span ref={ref}>
      {prefix}
      {currentValue.toFixed(decimals)}
      {suffix}
    </span>
  )
} 