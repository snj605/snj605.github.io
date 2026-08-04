import React from 'react'
import { getPortfolioData } from '../data/portfolioData'

export default function Footer() {
  const { footer } = getPortfolioData()

  return (
    <footer className="border-t border-[hsl(var(--border))] py-6">
      <div className="container flex flex-col sm:flex-row items-center justify-between gap-2 text-sm text-[hsl(var(--muted-foreground))]">
        <p>© {footer.year} {footer.name}. All rights reserved.</p>
        <p>Built with React & Tailwind CSS</p>
      </div>
    </footer>
  )
}
