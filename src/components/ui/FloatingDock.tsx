'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'motion/react'
import { cn } from '@/lib/utils'

interface DockItem {
  label: string
  icon: React.ReactNode
  href: string
  target?: string
}

interface FloatingDockProps {
  items: DockItem[]
  className?: string
}

export function FloatingDock({ items, className }: FloatingDockProps) {
  const mouseX = useMotionValue(Infinity)
  const [activeLabel, setActiveLabel] = useState<string | null>(null)

  return (
    <motion.nav
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className={cn(
        'flex items-end justify-center gap-3 px-4 pb-3 pt-4',
        'rounded-2xl bg-card border border-border shadow-sm',
        className
      )}
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.5 }}
    >
      {items.map((item) => (
        <DockIcon
          key={item.label}
          item={item}
          mouseX={mouseX}
          activeLabel={activeLabel}
          setActiveLabel={setActiveLabel}
        />
      ))}
    </motion.nav>
  )
}

function DockIcon({
  item,
  mouseX,
  activeLabel,
  setActiveLabel,
}: {
  item: DockItem
  mouseX: any
  activeLabel: string | null
  setActiveLabel: (l: string | null) => void
}) {
  const iconRef = useRef<HTMLAnchorElement>(null)

  // Magnetic distance-based scaling
  const size = useSpring(40, { stiffness: 300, damping: 22 })

  useEffect(() => {
    const unsubscribe = mouseX.on('change', (mx: number) => {
      if (!iconRef.current) return
      const rect = iconRef.current.getBoundingClientRect()
      const center = rect.left + rect.width / 2
      const distance = Math.abs(mx - center)
      const scale = Math.max(40, 64 - distance * 0.25)
      size.set(scale)
    })
    return () => unsubscribe()
  }, [mouseX, size])

  return (
    <div className="relative flex flex-col items-center gap-1">
      {/* Tooltip */}
      {activeLabel === item.label && (
        <motion.span
          initial={{ opacity: 0, y: 4, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 4, scale: 0.9 }}
          className="absolute -top-9 px-2.5 py-1 rounded-lg text-xs font-medium whitespace-nowrap bg-card text-primary border border-primary/20 shadow-sm"
        >
          {item.label}
        </motion.span>
      )}

      <motion.a
        ref={iconRef}
        href={item.href}
        target={item.target}
        style={{ width: size, height: size }}
        onMouseEnter={() => setActiveLabel(item.label)}
        onMouseLeave={() => setActiveLabel(null)}
        className="flex items-center justify-center rounded-xl bg-muted border border-border text-muted-foreground hover:text-primary transition-colors cursor-pointer"
        whileTap={{ scale: 0.9 }}
      >
        <span className="text-lg">{item.icon}</span>
      </motion.a>
    </div>
  )
}
