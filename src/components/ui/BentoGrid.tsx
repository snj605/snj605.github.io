'use client'

import { cn } from '@/lib/utils'

interface BentoGridProps {
  children: React.ReactNode
  className?: string
}

interface BentoCardProps {
  children: React.ReactNode
  className?: string
  colSpan?: 1 | 2 | 3
  rowSpan?: 1 | 2
}

export function BentoGrid({ children, className }: BentoGridProps) {
  return (
    <div
      className={cn(
        'grid grid-cols-3 gap-4 auto-rows-[180px]',
        'max-lg:grid-cols-2 max-sm:grid-cols-1',
        className
      )}
    >
      {children}
    </div>
  )
}

export function BentoCard({ children, className, colSpan = 1, rowSpan = 1 }: BentoCardProps) {
  const colClass = {
    1: 'col-span-1',
    2: 'col-span-2',
    3: 'col-span-3',
  }[colSpan]

  const rowClass = {
    1: 'row-span-1',
    2: 'row-span-2',
  }[rowSpan]

  return (
    <div
      className={cn(
        'glass-panel rounded-2xl p-5 flex flex-col gap-3 overflow-hidden relative',
        'transition-all duration-300 cursor-default',
        'hover:border-cyan-400/25 hover:shadow-[0_0_40px_-10px_rgba(56,189,248,0.3)]',
        colClass,
        rowClass,
        className
      )}
    >
      {children}
    </div>
  )
}
