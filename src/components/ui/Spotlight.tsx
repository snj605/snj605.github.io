'use client'

import { useRef, useState } from 'react'
import { motion } from 'motion/react'
import { cn } from '@/lib/utils'

interface SpotlightProps {
  children: React.ReactNode
  className?: string
  color?: string
}

export function Spotlight({ children, className, color = '#38bdf8' }: SpotlightProps) {
  const divRef = useRef<HTMLDivElement>(null)
  const [isFocused, setIsFocused] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [opacity, setOpacity] = useState(0)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return
    const rect = divRef.current.getBoundingClientRect()
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top })
    setOpacity(1)
  }

  const handleMouseLeave = () => {
    setOpacity(0)
    setIsFocused(false)
  }

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsFocused(true)}
      onMouseLeave={handleMouseLeave}
      className={cn('relative overflow-hidden', className)}
    >
      {children}

      {/* Cursor spotlight */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-2xl"
        style={{
          opacity,
          background: `radial-gradient(300px circle at ${position.x}px ${position.y}px, ${color}18, transparent 70%)`,
        }}
        animate={{ opacity }}
        transition={{ duration: 0.2 }}
      />

      {/* Border glow that follows cursor */}
      {isFocused && (
        <div
          className="pointer-events-none absolute inset-0 rounded-2xl"
          style={{
            background: `radial-gradient(200px circle at ${position.x}px ${position.y}px, ${color}30, transparent 70%)`,
            maskImage: 'linear-gradient(black,black)',
            WebkitMaskImage: 'linear-gradient(#000,#000)',
          }}
        />
      )}
    </div>
  )
}
