import type { Metadata } from 'next';
import { Outfit } from 'next/font/google';
import './globals.css';
import { Toaster } from 'react-hot-toast';
import { UserProvider } from '@/context/UserContext';

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
      <UserProvider>
        <body className={`${outfit.variable} font-outfit antialiased`}>
          {children}
          <Toaster position='bottom-right' />
        </body>
      </UserProvider>
    </html>
  );
}
