import type { Metadata } from "next";
import { Inter, DM_Sans } from "next/font/google";
import "./globals.css";
import { HeroUIProvider } from "@heroui/react";
import Container from '@/components/Container';
import Footer from '@/components/Footer/Footer';


const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})
const dm_sans = DM_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-dm-sans',
})

export const metadata: Metadata = {
  title: "GYCC Youth Lab",
  description: "Official Website by GYCC Youth Lab est. 2020",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${dm_sans.className} ${inter.className} antialiased`}
      >
        <HeroUIProvider>
          <div className="flex flex-col min-h-screen">
            <Container className="flex-grow">
              {children}
            </Container>
            <Footer />
          </div>
        </HeroUIProvider>
      </body>
    </html>
  );
}
