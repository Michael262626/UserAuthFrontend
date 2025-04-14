// app/layout.tsx
import './globals.css'
import type { Metadata } from 'next'
import { ClientProvider } from './ClientProvider'

export const metadata: Metadata = {
  title: 'User auth App',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <ClientProvider>{children}</ClientProvider>
      </body>
    </html>
  )
}
