import React, { useEffect, useState } from 'react'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from './theme-provider'
import { cn } from '../../lib/utils'

export function ModeToggle({ className }) {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setMounted(true) }, [])

  if (!mounted) {
    return <div className={cn('w-9 h-9 rounded-lg border border-border bg-background', className)} />
  }

  const isDark = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)

  return (
    <button
      type="button"
      aria-label="Toggle theme"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className={cn(
        'relative w-9 h-9 flex items-center justify-center rounded-lg',
        'glass border border-border/60 text-muted-foreground',
        'hover:text-primary hover:border-primary/40 hover:shadow-glow',
        'transition-all duration-200 overflow-hidden',
        className
      )}
    >
      <span className={`absolute transition-all duration-300 ${isDark ? 'opacity-100 rotate-0' : 'opacity-0 rotate-90'}`}>
        <Sun className="h-4 w-4" />
      </span>
      <span className={`absolute transition-all duration-300 ${isDark ? 'opacity-0 -rotate-90' : 'opacity-100 rotate-0'}`}>
        <Moon className="h-4 w-4" />
      </span>
    </button>
  )
}
