'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Card } from '@heroui/react';
import { DisplayMD, TextMD } from '@/components/Typography';
import Image from 'next/image';
import Container from '@/components/Container';

interface GalleryLink {
    title: string;
    year: string;
    description: string;
    thumbnailSrc: string;
    href: string;
}

const PhotosPage: React.FC = () => {
    const router = useRouter();

    const galleryLinks: GalleryLink[] = [
        {
            title: "GYCC 2023 Photos",
            year: "2023",
            description: "Photos from our activities and events throughout 2023, including workshops, conferences, and community engagements.",
            thumbnailSrc: "/images/homepage/main_2025.png", // You may want to replace this with actual thumbnail images
            href: "/media/photos/2023"
        },
        {
            title: "GYCC 2021 Photos",
            year: "2021",
            description: "A collection of memories from our 2021 initiatives, showcasing youth climate action across different regions.",
            thumbnailSrc: "/images/homepage/main_sl01_2.png", // You may want to replace this with actual thumbnail images
            href: "/media/photos/2021"
        },
        {
            title: "GYCC 2020 Photos",
            year: "2020",
            description: "A collection of memories from our 2020 initiatives, showcasing youth climate action across different regions.",
            thumbnailSrc: "/images/homepage/main_sl01_2.png", // You may want to replace this with actual thumbnail images
            href: "/media/photos/2020"
        }
    ];

    return (
        <main className="min-h-screen">
            <section className="bg-white w-full py-24">
                <Container className="flex flex-col items-center gap-12">
                    <div className="flex flex-col items-center gap-6 w-full">
                        <div className="flex flex-col gap-3 w-full">
                            <TextMD
                                weight="semibold"
                                className="text-center text-[#1DADDF]"
                            >
                                Media
                            </TextMD>
                            <DisplayMD
                                weight="semibold"
                                className="text-center text-[#101828]"
                            >
                                Photo Galleries
                            </DisplayMD>
                        </div>
                        <TextMD className="text-center text-[#475467] max-w-3xl">
                            Explore our photo collections from various years of the Global Youth Climate Challenge activities, events, and initiatives around the world.
                        </TextMD>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full mt-8">
                        {galleryLinks.map((gallery, index) => (
                            <Card
                                key={index}
                                isPressable
                                onPress={() => router.push(gallery.href)}
                                className="w-full overflow-hidden border border-gray-200 hover:border-[#1DADDF] transition-all duration-300"
                            >
                                <div className="p-6 flex flex-col gap-4">
                                    <div className="w-full h-60 relative rounded-lg overflow-hidden">
                                        <Image
                                            src={gallery.thumbnailSrc}
                                            alt={gallery.title}
                                            fill
                                            style={{ objectFit: 'cover' }}
                                        />
                                    </div>

                                    <div className="flex flex-col gap-2">
                                        <div className="bg-[#E0F4FA] border border-[#B0E2F2] rounded-2xl px-3 py-1 w-fit">
                                            <span className="text-[#1DADDF] font-medium text-sm">{gallery.year}</span>
                                        </div>
                                        <h3 className="text-xl font-semibold text-[#101828]">{gallery.title}</h3>
                                        <p className="text-[#475467]">{gallery.description}</p>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                </Container>
            </section>
        </main>
    );
};

export default PhotosPage;