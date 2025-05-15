'use client';

import React from "react";
import PhotoGallery from '@/components/PhotoGallery';

const Gycc2023Page: React.FC = () => (
    <div className="py-12">
        <h1 className="text-3xl font-semibold text-[#101828] mb-8 text-center">GYCC 2023 Photo Gallery</h1>
        <PhotoGallery bucketName="gycc-2023" />
    </div>
);

export default Gycc2023Page;