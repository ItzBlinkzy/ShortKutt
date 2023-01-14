import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Montserrat } from '@next/font/google'

const mont = Montserrat({
  subsets: ["latin"],
  variable: "--font-mont"
})
export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={`${mont.variable} font-sans`}>
      <Component {...pageProps} />
    </main>
  )
}
