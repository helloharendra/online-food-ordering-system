import type { Metadata } from 'next'
import { Inter, Poppins } from 'next/font/google'
import './globals.css'
import { ContactProvider, DemoBar } from '@/components/ContactModal'
import { CartProvider } from '@/lib/cart'

const sans = Inter({ subsets: ['latin'], variable: '--font-sans' })
const display = Poppins({ subsets: ['latin'], variable: '--font-display', weight: ['600', '700', '800'] })

export const metadata: Metadata = {
  title: 'Tandoor House – Online Food Ordering System Demo | Naya Prayog Technologies',
  description: 'Premium restaurant online ordering website UI demo with menu, customisation, cart, delivery/pickup and checkout. Contact Naya Prayog Technologies for the complete project.',
}

const APP = 'Tandoor House'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${display.variable}`}>
      <body className="bg-slate-50 font-sans">
        <ContactProvider appName={APP}>
          <CartProvider>
            <DemoBar appName={APP} />
            {children}
            <footer className="mt-20 border-t border-slate-200 bg-white py-8 text-center text-sm text-slate-500">
              © {new Date().getFullYear()} Tandoor House · Online ordering UI demo by <a href="https://nayaprayog.com/" className="font-semibold text-brand-600">Naya Prayog Technologies</a>
            </footer>
          </CartProvider>
        </ContactProvider>
      </body>
    </html>
  )
}
