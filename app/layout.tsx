import type { Metadata } from 'next';
import './globals.css';
import { Inter } from 'next/font/google';

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
        <main className="relative mx-auto w-[1200px] flex flex-col pb-[120px]">{children}</main>
      </body>
    </html>
  );
}
