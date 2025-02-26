import React, { useEffect, useState, useRef } from 'react';
import { Card, Modal, ModalContent, Image as HeroUiImage, Pagination } from "@heroui/react";
import Image from 'next/image';

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
        return <div>{error}</div>;
    }

    return (
        <>
            {loading && <div>Loading...</div>}
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4'>
                {currentImages.map(photo => (
                    <Card key={photo.uuid} isPressable
                        onPress={() => setSelectedImage(photo.url)}
                        className="relative w-full aspect-square overflow-hidden">
                        <Image fill src={photo.url} alt={photo.filePath} // TODO: figure out how to use HeroUiImage here
                            className="w-full h-full object-cover" />
                    </Card>
                ))}
            </div>
            {/* Pagination */}
            {!loading && <Pagination showControls initialPage={currentPage} total={totalPages} onChange={(pageNum) => { setCurrentPage(pageNum); controlDisplay(pageNum); }} />}
            {/* Lightbox Modal */}
            <Modal isOpen={!!selectedImage} onOpenChange={() => setSelectedImage(null)} size="lg">
                <ModalContent>
                    {selectedImage && <HeroUiImage src={selectedImage} alt="Enlarged image" width="100%" height="auto" />}
                </ModalContent>
            </Modal>
        </>
    );
};

export default PhotoGallery;