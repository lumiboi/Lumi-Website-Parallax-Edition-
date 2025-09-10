import type { Metadata } from 'next';
import { Poppins, Rajdhani } from 'next/font/google';
import './globals.css';

// Yeni Providers katmanımızı import ediyoruz
import { Providers } from '@/components/providers';

// Geri kalan her şeyi layout'tan taşıdığımız için artık burada olmalarına gerek yok
import Header from '@/components/Header';
import CustomCursor from '@/components/CustomCursor';
import InteractiveBackground from '@/components/InteractiveBackground';

const poppins = Poppins({ subsets: ["latin"], weight: ['300', '400', '700'], variable: '--font-poppins' });
const rajdhani = Rajdhani({ subsets: ["latin"], weight: ['500', '700'], variable: '--font-rajdhani' });

export const metadata: Metadata = {
  title: 'Lumi Digital Experience',
  description: 'Crafted by Mert İsmail Ergün',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <body className={`${poppins.variable} ${rajdhani.variable} font-sans bg-background text-text cursor-none`}>
        <Providers>
          <Header />
          <CustomCursor />
          <InteractiveBackground />
          {children}
        </Providers>
      </body>
    </html>
  );
}