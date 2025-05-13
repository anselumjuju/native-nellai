import type { Metadata } from 'next';
import { Outfit } from 'next/font/google';
import './globals.css';
import { Toaster } from 'react-hot-toast';
import AuthListener from '@/components/AuthListener';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { ThemeProvider } from '@/components/theme-provider';
import ThemeUpdate from '@/components/ThemeUpdate';

const outfit = Outfit({
  variable: '--font-outfit',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Native Nellai',
  description: 'Discover authentic traditional and local products from Nellai.',
  keywords: ['Native Nellai', 'Traditional Products', 'Nellai', 'Tirunelveli', 'Indian Culture', 'Local Products'],
  metadataBase: new URL('https://native-nellai.vercel.app/'),
  openGraph: {
    title: 'Native Nellai',
    description: 'Discover authentic traditional and local products from Nellai.',
    url: 'https://native-nellai.vercel.app/',
    siteName: 'Native Nellai',
    images: [
      {
        url: '/images/banner.webp',
        width: 1200,
        height: 630,
        alt: 'Native Nellai Banner',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Native Nellai',
    description: 'Discover authentic traditional and local products from Nellai.',
    images: ['/images/banner.webp'],
  },
  icons: {
    icon: '/images/logo.webp',
    shortcut: '/images/logo.webp',
    apple: '/images/logo.webp',
  },
  authors: [{ name: 'R10S Digital Solutions' }],
  creator: 'R10S Digital Solutions',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <ThemeProvider attribute='class' defaultTheme='light' disableTransitionOnChange>
        <AuthListener />
        <ThemeUpdate />
        <body className={`${outfit.variable} font-outfit antialiased`}>
          <Header />
          <div className='min-h-[100vh]'>{children}</div>
          <Footer />
          <Toaster position='top-center' />
        </body>
      </ThemeProvider>
    </html>
  );
}
