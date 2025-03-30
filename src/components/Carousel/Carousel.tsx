"use client"

import type React from "react"
import { useState, useRef, useEffect, type TouchEvent } from "react"
import { Card, CardBody, Button } from "@heroui/react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { carouselItems } from "./content"

interface CarouselProps {
    items?: React.ReactNode[]
    autoPlay?: boolean
    autoPlayInterval?: number
}

export default function Carousel({ items = carouselItems, autoPlay = false, autoPlayInterval = 3000 }: CarouselProps) {
    const [activeIndex, setActiveIndex] = useState(0)
    const touchStartX = useRef<number | null>(null)
    const touchEndX = useRef<number | null>(null)
    const minSwipeDistance = 50 // Minimum distance required for a swipe

    const handlePrev = () => {
        setActiveIndex((prevIndex) => (prevIndex === 0 ? items.length - 1 : prevIndex - 1))
    }

    const handleNext = () => {
        setActiveIndex((prevIndex) => (prevIndex === items.length - 1 ? 0 : prevIndex + 1))
    }

    // Touch handlers for mobile swipe
    const onTouchStart = (e: TouchEvent) => {
        touchStartX.current = e.targetTouches[0].clientX
    }

    const onTouchMove = (e: TouchEvent) => {
        touchEndX.current = e.targetTouches[0].clientX
    }

    const onTouchEnd = () => {
        if (!touchStartX.current || !touchEndX.current) return

        const distance = touchStartX.current - touchEndX.current
        const isLeftSwipe = distance > minSwipeDistance
        const isRightSwipe = distance < -minSwipeDistance

        if (isLeftSwipe) {
            handleNext()
        }
        if (isRightSwipe) {
            handlePrev()
        }

        // Reset values
        touchStartX.current = null
        touchEndX.current = null
    }

    useEffect(() => {
        if (!autoPlay) return

        const interval = setInterval(() => {
            handleNext()
        }, autoPlayInterval)

        return () => clearInterval(interval)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeIndex, autoPlay, autoPlayInterval])

    return (
        <div className="relative m-auto w-full h-full max-w-xl">
            <div
                className="overflow-hidden w-full h-full"
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
            >
                <div
                    className="flex transition-transform duration-500 ease-in-out h-full"
                    style={{ transform: `translateX(-${activeIndex * 100}%)` }}
                >
                    {items.map((item, index) => (
                        <div key={index} className="w-full h-full flex flex-shrink-0">
                            <Card className="w-11/12 h-5/6 align-middle m-auto" shadow="sm">
                                <CardBody className="p-6 overflow-hidden">{item}</CardBody>
                            </Card>
                        </div>
                    ))}
                </div>
            </div>

            {/* Responsive navigation buttons */}
            <Button
                isIconOnly
                className="absolute left-1 sm:left-2 top-1/2 -translate-y-1/2 bg-white/40 backdrop-blur-md hover:bg-white/60 z-10 w-8 h-8 sm:w-10 sm:h-10"
                onPress={handlePrev}
                size="sm"
                radius="full"
            >
                <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
            </Button>

            <Button
                isIconOnly
                className="absolute right-1 sm:right-2 top-1/2 -translate-y-1/2 bg-white/40 backdrop-blur-md hover:bg-white/60 z-10 w-8 h-8 sm:w-10 sm:h-10"
                onPress={handleNext}
                size="sm"
                radius="full"
            >
                <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
            </Button>

            {/* Responsive indicator dots */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1 sm:gap-2 z-10">
                {items.map((_, index) => (
                    <button
                        key={index}
                        className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full transition-all ${index === activeIndex ? "bg-[#0664a5]" : "bg-[#92a5bb]"
                            }`}
                        onClick={() => setActiveIndex(index)}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    )
}