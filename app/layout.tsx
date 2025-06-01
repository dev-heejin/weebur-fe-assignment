import type { Metadata } from 'next';
import './globals.css';
import { Inter } from 'next/font/google';
import { Footer, Header } from '../components/shared';
import ReactQueryClientProvider from '@/app/providers/ReactQueryClientProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Weebur frontend assignment',
  description: '위버 프론트엔드 과제',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReactQueryClientProvider>
          <Header />
          <main className="relative mx-auto w-full max-w-[1200px] px-4 flex flex-col pt-[20px]">
            {children}
          </main>
          <Footer />
        </ReactQueryClientProvider>
      </body>
    </html>
  );
}
