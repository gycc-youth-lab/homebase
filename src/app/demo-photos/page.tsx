'use client';

import React, { useEffect, useState } from 'react';

const DemoPhotosPage: React.FC = () => {
    const [imageUrls, setImageUrls] = useState<string[]>([]);
    const [loading, setLoading] = useState<boolean>(true);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/fetch-dynamo?bucketName=gycc-2023', {
                    method: 'GET',
                })
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = await response.json();
                const urls: string[] = data.map((obj: { url: string }) => obj.url);
                setImageUrls(urls);
            } catch (error) {
                console.error('Error fetching image URLs:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Demo Photos</h1>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {imageUrls.map((url, index) => (
                    <img key={index} src={url} alt={`Demo ${index}`} style={{ width: '200px', height: '200px', margin: '10px' }} />
                ))}
            </div>
        </div>
    );
};

export default DemoPhotosPage;