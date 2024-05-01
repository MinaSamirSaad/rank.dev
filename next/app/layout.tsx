import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';
import { ClerkProvider } from '@clerk/nextjs';
import SocketProvider from './(socket)/SocketProvider';
import ContextProvider from './(context)/GlobalContext';
import { NextUIProvider } from '@nextui-org/react';
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Rank.dev',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html className="h-full" lang="en" suppressHydrationWarning>
        <ContextProvider>
          <body
            className={`${inter.className} flex flex-col justify-between min-h-screen`}
          >
            <SocketProvider />
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <NextUIProvider>
                <div className="w-full">
                  <Navbar />
                </div>
                <div className="flex-grow">{children}</div>
                <Footer />
              </NextUIProvider>
            </ThemeProvider>
          </body>
        </ContextProvider>
      </html>
    </ClerkProvider>
  );
}
