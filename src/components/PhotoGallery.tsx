import React, { useEffect, useState, useRef } from 'react';
import { Card, Modal, ModalContent, Image as HeroUiImage } from "@heroui/react";
import Image from 'next/image';

interface Photo {
    uuid: string;
    url: string;
    filePath: string;
}

type Props = {
    bucketName: string;
};

const PhotoGallery: React.FC<Props> = ({ bucketName }) => {
    const [photos, setPhotos] = useState<Photo[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const hasFetched = useRef(false);

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

            setPhotos(images);
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
        <div className='grid grid-cols-4 gap-4 p-4'>
            {photos.map(photo => (
                <Card key={photo.uuid} isPressable
                    onPress={() => setSelectedImage(photo.url)}
                    className="relative w-full aspect-square overflow-hidden">
                    <Image fill src={photo.url} alt={photo.filePath}
                        className="w-full h-full object-cover" />
                </Card>
            ))}

            {/* Lightbox Modal */}
            <Modal isOpen={!!selectedImage} onOpenChange={() => setSelectedImage(null)} size="lg">
                <ModalContent>
                    {selectedImage && <HeroUiImage src={selectedImage} alt="Enlarged image" width="100%" height="auto" />}
                </ModalContent>
            </Modal>
            {loading && <div>Loading...</div>}
        </div>
    );
};

export default PhotoGallery