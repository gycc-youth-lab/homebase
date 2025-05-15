import React, { useEffect, useState, useRef } from 'react';
import { Card, Modal, ModalContent, Image as HeroUiImage, Pagination, Spinner, Button } from "@heroui/react";
import Image from 'next/image';
import Link from 'next/link';

interface Photo {
    uuid: string;
    url: string;
    filePath: string;
}

type Props = {
    bucketName: string;
};

const IMAGES_PER_PAGE = 16;

const PhotoGallery: React.FC<Props> = ({ bucketName }) => {
    const [photos, setPhotos] = useState<Photo[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [totalImages, setCount] = useState<number>(0);
    const hasFetched = useRef(false);

    // for pagination
    const totalPages = Math.ceil(totalImages / IMAGES_PER_PAGE);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [currentImages, setCurrentImages] = useState<Photo[]>([]);

    const controlDisplay = (pgNum: number) => {
        const startIndex = (pgNum - 1) * IMAGES_PER_PAGE;
        const displayedImages = photos.slice(startIndex, startIndex + IMAGES_PER_PAGE);
        setCurrentImages(displayedImages);
    }

    // for modal
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    const fetchPhotos = async () => {
        setLoading(true);
        try {
            const apiUrl = `/api/fetch-dynamo?bucketName=${bucketName}`;

            const response = await fetch(apiUrl, {
                method: 'GET',
            });
            if (!response.ok) {
                setError('Failed to fetch photos');
            }
            const { images, count } = await response.json();
            setCount(count);
            setPhotos(images);
            setCurrentImages(images.slice(0, IMAGES_PER_PAGE));
        } catch (err) {
            console.error('Error fetching photos:', err);
            setError('Failed to fetch photos');
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

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center p-8 rounded-lg bg-red-50 text-red-600 my-8">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mb-4">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="8" x2="12" y2="12"></line>
                    <line x1="12" y1="16" x2="12.01" y2="16"></line>
                </svg>
                <p className="text-center font-medium">{error}</p>
                <button
                    onClick={() => { setError(null); fetchPhotos(); }}
                    className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                >
                    Try Again
                </button>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-8">
            {/* Back button */}
            <div className="flex items-center">
                <Link href='/media/photos' className='bg-none text-primary hover:text-primary/80 flex items-center gap-2'>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19 12H5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M12 19L5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Back to Galleries
                </Link>
            </div>

            {loading ? (
                <div className="flex flex-col items-center justify-center py-12">
                    <Spinner size="lg" color="primary" className="mb-4" />
                    <p className="text-[#475467] font-medium">Loading photos...</p>
                </div>
            ) : (
                <>
                    {totalImages === 0 && (
                        <div className="flex flex-col items-center justify-center p-8 rounded-lg bg-gray-50 text-gray-600 my-8">
                            <p className="text-center font-medium">No photos found in this gallery</p>
                        </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {currentImages.map(photo => (
                            <Card
                                key={photo.uuid}
                                isPressable
                                onPress={() => setSelectedImage(photo.url)}
                                className="relative w-full aspect-square overflow-hidden group border-gray-100 hover:border-[#1DADDF] transition-all duration-300"
                            >
                                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity z-10"></div>
                                <Image
                                    fill
                                    src={photo.url}
                                    alt={photo.filePath.split('/').pop() || 'Photo'}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                            </Card>
                        ))}
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="flex justify-center mt-8">
                            <Pagination
                                showControls
                                initialPage={currentPage}
                                total={totalPages}
                                onChange={(pageNum) => {
                                    setCurrentPage(pageNum);
                                    controlDisplay(pageNum);
                                    window.scrollTo({ top: 0, behavior: 'smooth' });
                                }}
                                classNames={{
                                    cursor: "bg-[#1DADDF]",
                                }}
                            />
                        </div>
                    )}
                </>
            )}

            {/* Lightbox Modal */}
            <Modal
                isOpen={!!selectedImage}
                onOpenChange={() => setSelectedImage(null)}
                size="full"
                classNames={{
                    backdrop: "bg-black/80 backdrop-blur-sm",
                }}
            >
                <ModalContent className="bg-transparent shadow-none max-w-5xl mx-auto">
                    {selectedImage && (
                        <div className="relative">
                            <button
                                onClick={() => setSelectedImage(null)}
                                className="absolute top-4 right-4 z-50 bg-black/30 hover:bg-black/50 text-white rounded-full p-2 transition-colors"
                                aria-label="Close modal"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="18" y1="6" x2="6" y2="18"></line>
                                    <line x1="6" y1="6" x2="18" y2="18"></line>
                                </svg>
                            </button>
                            <HeroUiImage
                                src={selectedImage}
                                alt="Enlarged image"
                                className="w-full rounded-lg shadow-2xl"
                            />
                        </div>
                    )}
                </ModalContent>
            </Modal>
        </div>
    );
};

export default PhotoGallery;