'use client';

import React, { useEffect, useState, useRef, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Container from '@/components/Container';

interface Photo {
    uuid: string;
    url: string;
    filePath: string;
}

type Props = {
    bucketName: string;
    year: string;
};

const IMAGES_PER_PAGE = 24;

const PhotoGallery: React.FC<Props> = ({ bucketName, year }) => {
    const [photos, setPhotos] = useState<Photo[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [totalImages, setCount] = useState(0);
    const hasFetched = useRef(false);

    const totalPages = Math.ceil(totalImages / IMAGES_PER_PAGE);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentImages, setCurrentImages] = useState<Photo[]>([]);

    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

    const controlDisplay = (pgNum: number) => {
        const startIndex = (pgNum - 1) * IMAGES_PER_PAGE;
        setCurrentImages(photos.slice(startIndex, startIndex + IMAGES_PER_PAGE));
    };

    const fetchPhotos = async () => {
        setLoading(true);
        try {
            const response = await fetch(`/api/photos?bucketName=${bucketName}`);
            if (!response.ok) throw new Error('Failed to fetch');
            const { images, count } = await response.json();
            setCount(count);
            setPhotos(images);
            setCurrentImages(images.slice(0, IMAGES_PER_PAGE));
        } catch {
            setError('Failed to load photos');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!hasFetched.current) {
            fetchPhotos();
            hasFetched.current = true;
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleKeyDown = useCallback((e: KeyboardEvent) => {
        if (selectedIndex === null) return;
        if (e.key === 'Escape') setSelectedIndex(null);
        if (e.key === 'ArrowRight' && selectedIndex < currentImages.length - 1) {
            setSelectedIndex(selectedIndex + 1);
        }
        if (e.key === 'ArrowLeft' && selectedIndex > 0) {
            setSelectedIndex(selectedIndex - 1);
        }
    }, [selectedIndex, currentImages.length]);

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [handleKeyDown]);

    useEffect(() => {
        document.body.style.overflow = selectedIndex !== null ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [selectedIndex]);

    if (error) {
        return (
            <Container className="py-12">
                <div className="text-center py-20">
                    <p className="text-neutral-500 mb-4">{error}</p>
                    <button
                        onClick={() => { setError(null); fetchPhotos(); }}
                        className="text-[#1DADDF] text-sm underline hover:no-underline"
                    >
                        Try again
                    </button>
                </div>
            </Container>
        );
    }

    return (
        <main className="min-h-screen bg-white">
            <Container className="py-12 md:py-16">
                {/* Header */}
                <div className="mb-8">
                    <Link
                        href="/media/photos"
                        className="inline-flex items-center gap-2 text-neutral-500 hover:text-[#1DADDF] text-sm mb-4 transition-colors"
                    >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M19 12H5M12 19l-7-7 7-7" />
                        </svg>
                        Back to galleries
                    </Link>

                    <div className="flex items-baseline gap-4">
                        <h1 className="text-3xl md:text-4xl font-bold text-[#101828]">GYCC {year}</h1>
                        {!loading && (
                            <span className="text-neutral-400 text-sm">{totalImages} photos</span>
                        )}
                    </div>
                </div>

                {/* Gallery */}
                {loading ? (
                    <div className="flex items-center justify-center py-20">
                        <div className="w-6 h-6 border-2 border-neutral-200 border-t-[#1DADDF] rounded-full animate-spin" />
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                            {currentImages.map((photo, idx) => (
                                <button
                                    key={photo.uuid}
                                    onClick={() => setSelectedIndex(idx)}
                                    className="relative aspect-[4/3] overflow-hidden rounded-lg bg-neutral-100 group focus:outline-none focus:ring-2 focus:ring-[#1DADDF] focus:ring-offset-2"
                                >
                                    <Image
                                        src={photo.url}
                                        alt=""
                                        fill
                                        unoptimized
                                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                                    />
                                </button>
                            ))}
                        </div>

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div className="flex items-center justify-center gap-2 mt-10">
                                <button
                                    onClick={() => {
                                        if (currentPage > 1) {
                                            setCurrentPage(currentPage - 1);
                                            controlDisplay(currentPage - 1);
                                            window.scrollTo({ top: 0, behavior: 'smooth' });
                                        }
                                    }}
                                    disabled={currentPage === 1}
                                    className="p-2 disabled:opacity-30 hover:bg-neutral-100 rounded transition-colors"
                                >
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M15 18l-6-6 6-6" />
                                    </svg>
                                </button>

                                <div className="flex items-center gap-1">
                                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                                        <button
                                            key={page}
                                            onClick={() => {
                                                setCurrentPage(page);
                                                controlDisplay(page);
                                                window.scrollTo({ top: 0, behavior: 'smooth' });
                                            }}
                                            className={`w-9 h-9 text-sm rounded transition-colors ${
                                                currentPage === page
                                                    ? 'bg-[#1DADDF] text-white'
                                                    : 'hover:bg-neutral-100 text-neutral-600'
                                            }`}
                                        >
                                            {page}
                                        </button>
                                    ))}
                                </div>

                                <button
                                    onClick={() => {
                                        if (currentPage < totalPages) {
                                            setCurrentPage(currentPage + 1);
                                            controlDisplay(currentPage + 1);
                                            window.scrollTo({ top: 0, behavior: 'smooth' });
                                        }
                                    }}
                                    disabled={currentPage === totalPages}
                                    className="p-2 disabled:opacity-30 hover:bg-neutral-100 rounded transition-colors"
                                >
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M9 18l6-6-6-6" />
                                    </svg>
                                </button>
                            </div>
                        )}
                    </>
                )}
            </Container>

            {/* Lightbox */}
            {selectedIndex !== null && currentImages[selectedIndex] && (
                <div
                    className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
                    onClick={() => setSelectedIndex(null)}
                >
                    {/* Close */}
                    <button
                        onClick={() => setSelectedIndex(null)}
                        className="absolute top-4 right-4 z-10 text-white/70 hover:text-white p-2"
                    >
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <path d="M18 6L6 18M6 6l12 12" />
                        </svg>
                    </button>

                    {/* Counter */}
                    <div className="absolute top-4 left-4 text-white/50 text-sm">
                        {selectedIndex + 1} / {currentImages.length}
                    </div>

                    {/* Prev */}
                    {selectedIndex > 0 && (
                        <button
                            onClick={(e) => { e.stopPropagation(); setSelectedIndex(selectedIndex - 1); }}
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white p-2"
                        >
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                <path d="M15 18l-6-6 6-6" />
                            </svg>
                        </button>
                    )}

                    {/* Image */}
                    <div className="max-w-[90vw] max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={currentImages[selectedIndex].url}
                            alt=""
                            className="max-w-full max-h-[90vh] object-contain"
                        />
                    </div>

                    {/* Next */}
                    {selectedIndex < currentImages.length - 1 && (
                        <button
                            onClick={(e) => { e.stopPropagation(); setSelectedIndex(selectedIndex + 1); }}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white p-2"
                        >
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                <path d="M9 18l6-6-6-6" />
                            </svg>
                        </button>
                    )}
                </div>
            )}
        </main>
    );
};

export default PhotoGallery;
