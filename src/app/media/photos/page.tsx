'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Container from '@/components/Container';

interface GalleryYear {
    year: string;
    path: string;
    coverImage: string;
    photoCount: string;
}

const galleries: GalleryYear[] = [
    {
        year: "2023",
        path: "/media/photos/2023",
        coverImage: "/images/thumbnails/2020.JPG",
        photoCount: "64 photos"
    },
    {
        year: "2021",
        path: "/media/photos/2021",
        coverImage: "/images/thumbnails/2021.JPG",
        photoCount: "102 photos"
    },
    {
        year: "2020",
        path: "/media/photos/2020",
        coverImage: "/images/thumbnails/2023.jpg",
        photoCount: "88 photos"
    }
];

export default function PhotosPage() {
    return (
        <main className="min-h-screen bg-white">
            <Container className="py-12 md:py-16">
                {/* Header */}
                <div className="mb-10">
                    <p className="text-[#1DADDF] text-sm font-medium mb-2">Media</p>
                    <h1 className="text-3xl md:text-4xl font-bold text-[#101828]">Photo Gallery</h1>
                </div>

                {/* Gallery List */}
                <div className="flex flex-col gap-4">
                    {galleries.map((gallery) => (
                        <Link
                            key={gallery.year}
                            href={gallery.path}
                            className="group flex items-center gap-6 p-4 rounded-lg border border-neutral-200 hover:border-[#1DADDF] transition-colors"
                        >
                            <div className="relative w-32 h-20 md:w-48 md:h-28 rounded overflow-hidden flex-shrink-0">
                                <Image
                                    src={gallery.coverImage}
                                    alt={`GYCC ${gallery.year}`}
                                    fill
                                    className="object-cover"
                                />
                            </div>

                            <div className="flex-1 min-w-0">
                                <h2 className="text-xl md:text-2xl font-semibold text-[#101828] group-hover:text-[#1DADDF] transition-colors">
                                    GYCC {gallery.year}
                                </h2>
                                <p className="text-neutral-500 text-sm mt-1">{gallery.photoCount}</p>
                            </div>

                            <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                className="text-neutral-300 group-hover:text-[#1DADDF] transition-colors flex-shrink-0"
                            >
                                <path d="M9 18l6-6-6-6" />
                            </svg>
                        </Link>
                    ))}
                </div>
            </Container>
        </main>
    );
}
