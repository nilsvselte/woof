import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Doggos',
  description: 'DOGS!',
  icons: {
    icon: "/favicon.ico",
  }
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}
        <div id="image/movie container">
        </div>
      </body>
    </html>
  )
}
