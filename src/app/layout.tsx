import './globals.css'
import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Next Ecommerce Website',
  description: 'Buy and Selling Ecommerce Website ',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
          <main className="">
            {children}
          </main>
      </body>
    </html>
  )
}