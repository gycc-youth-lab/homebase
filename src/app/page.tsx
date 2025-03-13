import Carousel from "@/components/Carousel/Carousel";

export default function Home() {
  return (
    <main className="min-h-screen p-2 sm:p-4">
      <div className="w-full h-[300px] sm:h-[400px] md:h-[500px]">
        <Carousel />
      </div>
    </main>
  );
}
