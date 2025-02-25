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
    const [lastKey, setLastKey] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isComplete, setIsComplete] = useState<boolean>(false);
    const hasFetched = useRef(false);

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
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {photos.map(photo => (
                <div key={photo.uuid} className="photo-item">
                    <img src={photo.url} alt={photo.filePath} style={{ width: '200px', height: '200px', margin: '10px' }} />
                </div>
            ))}
            {loading && <div>Loading...</div>}
            {!loading && !isComplete && <button onClick={fetchPhotos}>Load More</button>}
        </div>
    );
};

export default PhotoGallery