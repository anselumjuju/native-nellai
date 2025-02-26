import type { Metadata } from 'next';
import { Outfit } from 'next/font/google';
import './globals.css';
import { Toaster } from 'react-hot-toast';
import AuthListener from '@/components/AuthListener';
import Header from '@/components/layout/Header';

const outfit = Outfit({
  variable: '--font-outfit',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Native Nellai',
  description: 'Discover authentic traditional and local products from Nellai.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <AuthListener />
      <body className={`${outfit.variable} font-outfit antialiased`}>
        <div className='w-full px-3 md:px-5 border-b shadow-sm'>
          <Header />
        </div>
        {children}
        <Toaster position='top-center' />
      </body>
    </html>
  );
}
