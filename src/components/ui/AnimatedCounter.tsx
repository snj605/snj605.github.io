'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'motion/react'

interface AnimatedCounterProps {
  value: string       // e.g. "50+" or "18%"
  className?: string
  duration?: number
}

export function AnimatedCounter({ value, className, duration = 1500 }: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [displayed, setDisplayed] = useState('0')

  // Parse: number prefix + suffix (e.g. "50+" → num=50, suffix="+")
  const match = value.match(/^(\d+(?:\.\d+)?)(.*)$/)
  const targetNum = match ? parseFloat(match[1]) : 0
  const suffix = match ? match[2] : value

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true) },
      { threshold: 0.5 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isVisible) return
    const start = Date.now()
    const tick = () => {
      const elapsed = Date.now() - start
      const progress = Math.min(elapsed / duration, 1)
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      const current = Math.round(eased * targetNum)
      setDisplayed(current + suffix)
      if (progress < 1) requestAnimationFrame(tick)
      else setDisplayed(value)
    }
    requestAnimationFrame(tick)
  }, [isVisible, targetNum, suffix, duration, value])

  return (
    <span ref={ref} className={className}>
      {displayed}
    </span>
  )
}
