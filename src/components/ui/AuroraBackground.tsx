'use client'

import { useEffect, useRef } from 'react'

export function AuroraBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId: number
    let t = 0

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      t += 0.004

      // Three overlapping aurora blobs
      const blobs = [
        {
          x: Math.sin(t * 0.7) * canvas.width * 0.3 + canvas.width * 0.5,
          y: Math.cos(t * 0.5) * canvas.height * 0.2 + canvas.height * 0.3,
          r: canvas.width * 0.5,
          color1: 'rgba(56,189,248,0.07)',
          color2: 'rgba(56,189,248,0)',
        },
        {
          x: Math.cos(t * 0.6) * canvas.width * 0.25 + canvas.width * 0.4,
          y: Math.sin(t * 0.8) * canvas.height * 0.25 + canvas.height * 0.5,
          r: canvas.width * 0.4,
          color1: 'rgba(129,140,248,0.08)',
          color2: 'rgba(129,140,248,0)',
        },
        {
          x: Math.sin(t * 0.5 + 1) * canvas.width * 0.3 + canvas.width * 0.6,
          y: Math.cos(t * 0.7 + 2) * canvas.height * 0.2 + canvas.height * 0.6,
          r: canvas.width * 0.35,
          color1: 'rgba(192,132,252,0.06)',
          color2: 'rgba(192,132,252,0)',
        },
      ]

      blobs.forEach(({ x, y, r, color1, color2 }) => {
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, r)
        gradient.addColorStop(0, color1)
        gradient.addColorStop(1, color2)
        ctx.fillStyle = gradient
        ctx.fillRect(0, 0, canvas.width, canvas.height)
      })

      animId = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(animId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    />
  )
}
