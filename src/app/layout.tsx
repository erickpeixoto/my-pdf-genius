import Navbar from '@/components/Navbar'
import Providers from '@/components/Providers'
import { cn, constructMetadata } from '@/lib/utils'
import { Inter } from 'next/font/google'
import './globals.css'
import { Locale, i18n } from '../../i18n.config'

import 'react-loading-skeleton/dist/skeleton.css'
import 'simplebar-react/dist/simplebar.min.css'

import { Toaster } from '@/components/ui/toaster'
import PlausibleProvider from 'next-plausible'

const inter = Inter({ subsets: ['latin'] })

export const metadata = constructMetadata()

export async function generateStaticParams() {
  return i18n.locales.map(locale => ({ lang: locale }))
}
export default function RootLayout({
  children,
  params
}: {
  children: React.ReactNode,
  params: { lang: Locale }
}) {
  return (
    <html lang={params.lang} className='light bg-[#000f12]' suppressHydrationWarning>
      
        <PlausibleProvider domain={process.env.APPLICATION_URL as string} trackLocalhost={true} enabled={true}>
            <Providers>
              <body
                className={cn(
                  'min-h-screen font-sans antialiased',
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
