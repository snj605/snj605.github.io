import type { Metadata } from 'next'
import { ThemeProvider } from '@/components/ui/ThemeProvider'
import './globals.css'

export const metadata: Metadata = {
  title: 'Samir Joshi | Java Backend Software Engineer · Spring Boot · Kafka',
  description:
    'Portfolio of Samir Joshi — Backend Software Engineer specializing in Java 17/21, Spring Boot 3, Apache Kafka, microservices, and cloud-native distributed systems. M.Tech · Atmiya University.',
  keywords: [
    'Samir Joshi',
    'Backend Engineer',
    'Java Developer',
    'Spring Boot 3',
    'Apache Kafka',
    'Microservices',
    'CloudSim',
    'Portfolio',
  ],
  openGraph: {
    title: 'Samir Joshi | Java Backend Software Engineer',
    description:
      'Production microservices, high-throughput Kafka streaming pipelines, and distributed systems — built with Java & Spring Boot.',
    type: 'website',
    locale: 'en_IN',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Inter via Google Fonts CDN */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="antialiased min-h-screen">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
