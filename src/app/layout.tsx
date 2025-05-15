import type { Metadata } from "next";
import { Inter, DM_Sans } from "next/font/google";
import "./globals.css";
import { HeroUIProvider } from "@heroui/react";
import Container from '@/components/Container';
import Footer from '@/components/Footer/Footer';
import Navbar from "@/components/Navbar";


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
  description: "GYCC Youth Lab est. 2020",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${dm_sans.variable}`}>
      <body
        className="antialiased"
      >
        <HeroUIProvider>
          <>
            <Navbar />
            <Container className="pt-16 flex-grow">
              {children}
            </Container>
            <Footer />
          </>
        </HeroUIProvider>
      </body>
    </html>
  );
}
