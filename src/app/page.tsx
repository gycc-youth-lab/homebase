'use client'

import Carousel from "@/components/Carousel/Carousel";
import { Divider } from "@/components/Divider";
export default function Home() {
  return (
    // <main className="min-h-screen">
    <div className="w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px]">
      <Divider />
      <Carousel />
    </div>
    // </main>
  );
}
