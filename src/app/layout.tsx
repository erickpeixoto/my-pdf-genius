import Navbar from '@/components/Navbar'
import Providers from '@/components/Providers'
import { cn, constructMetadata } from '@/lib/utils'
import { Inter } from 'next/font/google'
import './globals.css'

import 'react-loading-skeleton/dist/skeleton.css'
import 'simplebar-react/dist/simplebar.min.css'

import { Toaster } from '@/components/ui/toaster'
import PlausibleProvider from 'next-plausible'

const inter = Inter({ subsets: ['latin'] })

export const metadata = constructMetadata()

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en' className='light' suppressHydrationWarning>
        <PlausibleProvider domain='my-pdf-genius.vercel.app' trackLocalhost={true} enabled={true}>
            <Providers>
              <body
                className={cn(
                  'min-h-screen font-sans antialiased bg-gray-100  ',
                  inter.className
                )}>
                      <Toaster />
                       <Navbar />
                       {children}
              </body>
            </Providers>
       </PlausibleProvider>
    </html>
  )
}
