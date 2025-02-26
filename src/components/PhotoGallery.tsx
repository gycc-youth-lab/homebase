import React, { useEffect, useState, useRef } from 'react';

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
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {photos.map(photo => (
                <div key={photo.uuid} className="photo-item">
                    <img src={photo.url} alt={photo.filePath} style={{ width: '200px', height: '200px', margin: '10px' }} />
                </div>
            ))}
            {loading && <div>Loading...</div>}
        </div>
    );
};

export default PhotoGallery