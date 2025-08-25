import './globals.css'
import Nav from '@/components/Nav'
import BackHome from '@/components/BackHome'

export const metadata = {
  title: 'Biblical Counselling',
  description: 'Scripture-anchored encouragement and guidance.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Nav />
        <main className="mx-auto max-w-6xl px-4 py-6">{children}</main>
      </body>
    </html>
  )
}
