'use client'

import ClientWrapper from '@/components/ClientWrapper';
import PhotoGallery from '@/components/PhotoGallery';
import Tabs from '@/components/Tabs/Tabs';
import { Divider } from "@heroui/divider";

import React from "react";

const tabContent = [
    {
        title: "Program",
        content: (
            <div>placeholder for program</div>
        )
    },
    {
        title: "Action Plan",
        content: (
            <div>placeholder for action Plan</div>
        )
    },
    {
        title: "Photo Gallery",
        content: (
            <>
                <p className='text-lg'>GYCC 2023 Photo Gallery</p>
                <PhotoGallery bucketName="gycc-2023" />
            </>
        )
    },

]

const Gycc2023Page: React.FC = () => (
    <ClientWrapper>
        <>
            <h1 className='text-3xl font-bold'>GYCC 2022/23</h1>
            <Divider className="my-4" />
            <Tabs content={tabContent} />
        </>
    </ClientWrapper>
);

export default Gycc2023Page;