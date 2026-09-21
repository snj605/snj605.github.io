'use client'

import { useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react'
import { cn } from '@/lib/utils'

interface Card3DProps {
  children: React.ReactNode
  className?: string
  glareEnabled?: boolean
}

export function Card3D({ children, className, glareEnabled = true }: Card3DProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)

  const springConfig = { stiffness: 200, damping: 22 }
  const rotateX = useSpring(useTransform(rawY, [-0.5, 0.5], [12, -12]), springConfig)
  const rotateY = useSpring(useTransform(rawX, [-0.5, 0.5], [-12, 12]), springConfig)

  const glareX = useSpring(useTransform(rawX, [-0.5, 0.5], [0, 100]), springConfig)
  const glareY = useSpring(useTransform(rawY, [-0.5, 0.5], [0, 100]), springConfig)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    rawX.set(x)
    rawY.set(y)
  }

  const handleMouseLeave = () => {
    rawX.set(0)
    rawY.set(0)
    setIsHovered(false)
  }

  return (
    <div style={{ perspective: '1200px' }} className={cn('w-full h-full', className)}>
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        className="relative w-full h-full rounded-2xl"
      >
        {children}

        {/* Specular glare overlay */}
        {glareEnabled && isHovered && (
          <motion.div
            className="absolute inset-0 rounded-2xl pointer-events-none overflow-hidden"
            style={{
              background: `radial-gradient(circle at ${glareX.get()}% ${glareY.get()}%, rgba(255,255,255,0.09) 0%, transparent 70%)`,
              zIndex: 20,
            }}
          />
        )}
      </motion.div>
    </div>
  )
}
