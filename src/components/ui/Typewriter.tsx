'use client'

import { useEffect, useRef, useState } from 'react'

interface TypewriterProps {
  phrases: string[]
  className?: string
  typingSpeed?: number
  pauseMs?: number
}

export function Typewriter({ phrases, className, typingSpeed = 55, pauseMs = 2000 }: TypewriterProps) {
  const [displayed, setDisplayed] = useState('')
  const [phraseIdx, setPhraseIdx] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const current = phrases[phraseIdx]

    const tick = () => {
      if (!isDeleting) {
        // Typing
        if (displayed.length < current.length) {
          setDisplayed(current.slice(0, displayed.length + 1))
          timeoutRef.current = setTimeout(tick, typingSpeed)
        } else {
          // Full — pause then delete
          timeoutRef.current = setTimeout(() => setIsDeleting(true), pauseMs)
        }
      } else {
        // Deleting
        if (displayed.length > 0) {
          setDisplayed(current.slice(0, displayed.length - 1))
          timeoutRef.current = setTimeout(tick, typingSpeed / 2)
        } else {
          // Done deleting — next phrase
          setIsDeleting(false)
          setPhraseIdx((i) => (i + 1) % phrases.length)
        }
      }
    }

    timeoutRef.current = setTimeout(tick, typingSpeed)
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [displayed, isDeleting, phraseIdx, phrases, typingSpeed, pauseMs])

  return (
    <span className={className}>
      {displayed}
      <span
        className="inline-block w-[2px] h-[1em] align-middle ml-0.5"
        style={{
          background: 'var(--primary)',
          animation: 'blink 1s step-end infinite',
        }}
      />
      <style>{`@keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }`}</style>
    </span>
  )
}
