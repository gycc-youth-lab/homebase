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
    const [lastKey, setLastKey] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isComplete, setIsComplete] = useState<boolean>(false);
    const hasFetched = useRef(false);

    // for modal
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    const fetchPhotos = async () => {
        if (isComplete) {
            return;
        }
        setLoading(true);
        try {
            let apiUrl = `/api/fetch-dynamo?bucketName=${bucketName}`;
            if (lastKey) {
                apiUrl += `&lastEvaluatedKey=${lastKey}`;
            }
            const response = await fetch(apiUrl, {
                method: 'GET',
            });
            if (!response.ok) {
                setError('Failed to fetch photos');
            }
            const { images, lastEvaluatedKey } = await response.json();
            const lastUUID = lastEvaluatedKey?.uuid.S;
            if (!lastUUID) {
                setIsComplete(true);
            }
            setPhotos((prevPhotos) => [...prevPhotos, ...images]);
            setLastKey(lastUUID);
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
            {!loading && !isComplete && <button onClick={fetchPhotos}>Load More</button>}
        </div>
    );
};

export default PhotoGallery