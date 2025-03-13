"use client";
import { useState, useEffect } from "react";
import { Button, Card, CardHeader, CardBody } from "@heroui/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Slide1, Slide2, Slide3 } from './TestContent'

const cards = [Slide1, Slide2, Slide3];

export default function TestCarousel() {
    const [current, setCurrent] = useState(0);
    const totalSlides = cards.length;

    const nextSlide = () => setCurrent((prev) => (prev + 1) % totalSlides);
    const prevSlide = () => setCurrent((prev) => (prev - 1 + totalSlides) % totalSlides);

    useEffect(() => {
        const interval = setInterval(nextSlide, 3000); // Auto-scroll every 3s
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative w-full max-w-3xl mx-auto">
            {/* Carousel Wrapper */}
            <div className="overflow-hidden relative rounded-lg">
                <div
                    className="flex transition-transform duration-500 ease-in-out"
                    style={{ transform: `translateX(-${current * 100}%)` }}
                >
                    {cards.map((Component, index) => (
                        <div key={index} className="w-full flex-shrink-0 p-4">
                            {(<Component />)}
                        </div>
                    ))}
                </div>
            </div>

            {/* Navigation Dots */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {cards.map((_, index) => (
                    <button
                        key={index}
                        className={`h-3 w-3 rounded-full transition-all ${index === current ? "bg-primary scale-125" : "bg-gray-400"
                            }`}
                        onClick={() => setCurrent(index)}
                    />
                ))}
            </div>

            {/* Navigation Buttons */}
            <Button
                isIconOnly
                onPress={prevSlide}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-primary-500 text-white"
            >
                <ChevronLeft size={20} />
            </Button>
            <Button
                isIconOnly
                onPress={nextSlide}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-primary-500 text-white"
            >
                <ChevronRight size={20} />
            </Button>
        </div>
    );
}
