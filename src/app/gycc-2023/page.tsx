'use client'

import ClientWrapper from '@/components/ClientWrapper';
import PhotoGallery from '@/components/PhotoGallery';

import React from "react";

const Gycc2023Page: React.FC = () => (
    <ClientWrapper>
        <>
            <p className='text-lg'>GYCC 2023 Photo Gallery</p>
            <PhotoGallery bucketName="gycc-2023" />
        </>
    </ClientWrapper>
);

export default Gycc2023Page;