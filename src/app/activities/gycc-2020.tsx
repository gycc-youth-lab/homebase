'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Card, Modal, ModalContent, ModalHeader, ModalBody } from '@heroui/react';
import Container from '@/components/Container';
import { DisplayLG, DisplayMD, TextMD, TextLG } from '@/components/Typography';
import PhotoGallery from '@/components/PhotoGallery';

// Type definitions for action plan categories
interface ActionPlanCategory {
    id: string;
    title: string;
    thumbnailSrc: string;
    images: string[];
}

const Gycc2020Page: React.FC = () => {
    const [selectedCategory, setSelectedCategory] = useState<ActionPlanCategory | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Action plan categories data based on the HTML file
    const actionPlanCategories: ActionPlanCategory[] = [
        {
            id: 'urban-cities',
            title: 'Urban Cities',
            thumbnailSrc: '/images/gycc2020/pdf_01.jpg',
            images: [
                '/images/gycc2020/action-plans/1_Urban Cities_Page_1.jpg',
                '/images/gycc2020/action-plans/1_Urban Cities_Page_2.jpg',
                '/images/gycc2020/action-plans/1_Urban Cities_Page_3.jpg',
                '/images/gycc2020/action-plans/1_Urban Cities_Page_4.jpg',
                '/images/gycc2020/action-plans/1_Urban Cities_Page_5.jpg',
                '/images/gycc2020/action-plans/1_Urban Cities_Page_6.jpg',
                '/images/gycc2020/action-plans/1_Urban Cities_Page_7.jpg',
                '/images/gycc2020/action-plans/1_Urban Cities_Page_8.jpg',
            ]
        },
        {
            id: 'food',
            title: 'Food',
            thumbnailSrc: '/images/gycc2020/pdf_02.jpg',
            images: [
                '/images/gycc2020/action-plans/2_Food_Page_1.jpg',
                '/images/gycc2020/action-plans/2_Food_Page_2.jpg',
                '/images/gycc2020/action-plans/2_Food_Page_3.jpg',
                '/images/gycc2020/action-plans/2_Food_Page_4.jpg',
                '/images/gycc2020/action-plans/2_Food_Page_5.jpg',
                '/images/gycc2020/action-plans/2_Food_Page_6.jpg',
                '/images/gycc2020/action-plans/2_Food_Page_7.jpg',
                '/images/gycc2020/action-plans/2_Food_Page_8.jpg',
                '/images/gycc2020/action-plans/2_Food_Page_9.jpg',
            ]
        },
        {
            id: 'well-being',
            title: 'Well-Being',
            thumbnailSrc: '/images/gycc2020/pdf_03.jpg',
            images: [
                '/images/gycc2020/action-plans/3_Well-Being_Page_01.jpg',
                '/images/gycc2020/action-plans/3_Well-Being_Page_02.jpg',
                '/images/gycc2020/action-plans/3_Well-Being_Page_03.jpg',
                '/images/gycc2020/action-plans/3_Well-Being_Page_04.jpg',
                '/images/gycc2020/action-plans/3_Well-Being_Page_05.jpg',
                '/images/gycc2020/action-plans/3_Well-Being_Page_06.jpg',
                '/images/gycc2020/action-plans/3_Well-Being_Page_07.jpg',
                '/images/gycc2020/action-plans/3_Well-Being_Page_08.jpg',
                '/images/gycc2020/action-plans/3_Well-Being_Page_09.jpg',
                '/images/gycc2020/action-plans/3_Well-Being_Page_10.jpg',
                '/images/gycc2020/action-plans/3_Well-Being_Page_11.jpg',
                '/images/gycc2020/action-plans/3_Well-Being_Page_12.jpg',
            ]
        },
        {
            id: 'rivers-oceans',
            title: 'Rivers & Oceans',
            thumbnailSrc: '/images/gycc2020/pdf_04.jpg',
            images: [
                '/images/gycc2020/action-plans/4_river&oceans_Page_1.jpg',
                '/images/gycc2020/action-plans/4_river&oceans_Page_2.jpg',
                '/images/gycc2020/action-plans/4_river&oceans_Page_3.jpg',
                '/images/gycc2020/action-plans/4_river&oceans_Page_4.jpg',
                '/images/gycc2020/action-plans/4_river&oceans_Page_5.jpg',
                '/images/gycc2020/action-plans/4_river&oceans_Page_6.jpg',
                '/images/gycc2020/action-plans/4_river&oceans_Page_7.jpg',
            ]
        },
        {
            id: 'production-consumption',
            title: 'Production & Consumption',
            thumbnailSrc: '/images/gycc2020/pdf_05.jpg',
            images: [
                '/images/gycc2020/action-plans/5_Production & Consumption_Page_01.jpg',
                '/images/gycc2020/action-plans/5_Production & Consumption_Page_02.jpg',
                '/images/gycc2020/action-plans/5_Production & Consumption_Page_03.jpg',
                '/images/gycc2020/action-plans/5_Production & Consumption_Page_04.jpg',
                '/images/gycc2020/action-plans/5_Production & Consumption_Page_05.jpg',
                '/images/gycc2020/action-plans/5_Production & Consumption_Page_06.jpg',
                '/images/gycc2020/action-plans/5_Production & Consumption_Page_07.jpg',
                '/images/gycc2020/action-plans/5_Production & Consumption_Page_08.jpg',
                '/images/gycc2020/action-plans/5_Production & Consumption_Page_09.jpg',
                '/images/gycc2020/action-plans/5_Production & Consumption_Page_10.jpg',
                '/images/gycc2020/action-plans/5_Production & Consumption_Page_11.jpg',
                '/images/gycc2020/action-plans/5_Production & Consumption_Page_12.jpg',
            ]
        },
        {
            id: 'sustainability',
            title: 'Sustainability',
            thumbnailSrc: '/images/gycc2020/pdf_06.jpg',
            images: [
                '/images/gycc2020/action-plans/6_Sustainability_Page_01.jpg',
                '/images/gycc2020/action-plans/6_Sustainability_Page_02.jpg',
                '/images/gycc2020/action-plans/6_Sustainability_Page_03.jpg',
                '/images/gycc2020/action-plans/6_Sustainability_Page_04.jpg',
                '/images/gycc2020/action-plans/6_Sustainability_Page_05.jpg',
                '/images/gycc2020/action-plans/6_Sustainability_Page_06.jpg',
                '/images/gycc2020/action-plans/6_Sustainability_Page_07.jpg',
                '/images/gycc2020/action-plans/6_Sustainability_Page_08.jpg',
                '/images/gycc2020/action-plans/6_Sustainability_Page_09.jpg',
                '/images/gycc2020/action-plans/6_Sustainability_Page_10.jpg',
                '/images/gycc2020/action-plans/6_Sustainability_Page_11.jpg',
                '/images/gycc2020/action-plans/6_Sustainability_Page_12.jpg',
                '/images/gycc2020/action-plans/6_Sustainability_Page_13.jpg',
            ]
        },
    ];

    const handleCategoryClick = (category: ActionPlanCategory) => {
        setSelectedCategory(category);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedCategory(null);
    };

    return (
        <main className="min-h-screen">
            {/* Header section */}
            <section className="bg-white w-full py-24">
                <Container className="flex flex-col items-center gap-12">
                    <div className="flex flex-col items-center gap-6 w-full">
                        <div className="flex flex-col gap-3 w-full">
                            <TextMD
                                weight="semibold"
                                className="text-center text-[#1DADDF]"
                            >
                                Activities
                            </TextMD>
                            <DisplayLG
                                weight="semibold"
                                className="text-center text-[#101828]"
                            >
                                GYCC 2020
                            </DisplayLG>
                        </div>
                        <TextMD className="text-center text-[#475467] max-w-3xl">
                            Explore the comprehensive program, action plans, and memories from GYCC 2020 - a pivotal moment in youth climate action.
                        </TextMD>
                    </div>
                </Container>
            </section>

            {/* Program Overview section */}
            <section className="bg-[#F9FAFB] w-full py-24">
                <Container className="flex flex-col items-center gap-16">
                    <div className="flex flex-col items-center gap-6 w-full">
                        <DisplayMD
                            weight="semibold"
                            className="text-center text-[#101828]"
                        >
                            Hot Earth needs Cool Youth
                        </DisplayMD>
                    </div>

                    {/* Poster and event details */}
                    <div className="flex flex-col lg:flex-row gap-12 items-center w-full">
                        {/* Poster image */}
                        <div className="flex-1 relative h-[600px] max-w-lg">
                            <Image
                                src="/images/gycc2020/gycc2020_img01_1.jpg"
                                alt="GYCC 2020 Poster"
                                fill
                                style={{ objectFit: 'cover' }}
                                className="rounded-lg"
                            />
                        </div>

                        {/* Event details */}
                        <div className="flex-1 flex flex-col gap-8">
                            <div className="flex flex-col gap-6">
                                <div className="relative h-16">
                                    <Image
                                        src="/images/gycc2020/gycc2020_img01_2.png"
                                        alt="GYCC 2020 Logo"
                                        fill
                                        style={{ objectFit: 'contain', objectPosition: 'left' }}
                                    />
                                </div>

                                <div className="flex flex-col gap-4">
                                    <DisplayMD
                                        weight="semibold"
                                        className="text-[#1DADDF]"
                                    >
                                        Hot Earth needs Cool Youth
                                    </DisplayMD>

                                    <TextLG className="text-[#475467]">
                                        <span className="font-semibold text-[#101828]">
                                            Nov 8<span className="font-normal"> (Sun.)</span> ~ Nov 13<span className="font-normal"> (Fri.)</span>, 2020
                                        </span>
                                        <br />
                                        Seoul, Korea
                                    </TextLG>
                                </div>
                            </div>

                            <TextMD className="text-[#475467] leading-relaxed">
                                In the GYCC 2020 program, <span className="font-semibold text-[#101828]">105 participants from 35 countries</span> were given an opportunity to discuss key themes and share their own action plans for addressing climate change challenges.
                            </TextMD>
                        </div>
                    </div>

                    {/* Video section */}
                    <div className="w-full max-w-4xl">
                        <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                            <iframe
                                src="https://www.youtube.com/embed/uOmQnRIen28?autoplay=0&mute=0&rel=0"
                                className="absolute top-0 left-0 w-full h-full rounded-lg"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            />
                        </div>
                    </div>

                    {/* Activities overview */}
                    <div className="flex flex-col items-center gap-8 w-full">
                        <DisplayMD
                            weight="semibold"
                            className="text-center text-[#101828]"
                        >
                            Look through the activities prepared by GYCC
                        </DisplayMD>
                        <div className="w-full max-w-4xl relative h-[500px]">
                            <Image
                                src="/images/gycc2020/gycc2020_img01_3.jpg"
                                alt="GYCC 2020 Activities Overview"
                                fill
                                style={{ objectFit: 'contain' }}
                                className="rounded-lg"
                            />
                        </div>
                    </div>
                </Container>
            </section>

            {/* Action Plans section */}
            <section className="bg-white w-full py-24">
                <Container className="flex flex-col items-center gap-16">
                    <div className="flex flex-col items-center gap-6 w-full">
                        <div className="flex flex-col gap-3 w-full">
                            <TextMD
                                weight="semibold"
                                className="text-center text-[#1DADDF]"
                            >
                                Solutions
                            </TextMD>
                            <DisplayMD
                                weight="semibold"
                                className="text-center text-[#101828]"
                            >
                                Action Plans
                            </DisplayMD>
                        </div>
                        <TextMD className="text-center text-[#475467] max-w-3xl">
                            Discover the comprehensive action plans developed by participants across six key climate themes. Click on any category to explore detailed proposals and solutions.
                        </TextMD>
                    </div>

                    {/* Action plan categories grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
                        {actionPlanCategories.map((category) => (
                            <Card
                                key={category.id}
                                isPressable
                                onPress={() => handleCategoryClick(category)}
                                className="w-full overflow-hidden border border-gray-200 hover:border-[#1DADDF] transition-all duration-300 hover:shadow-lg"
                            >
                                <div className="p-6 flex flex-col gap-4">
                                    <div className="w-full h-60 relative rounded-lg overflow-hidden">
                                        <Image
                                            src={category.thumbnailSrc}
                                            alt={`${category.title} Action Plan Preview`}
                                            fill
                                            style={{ objectFit: 'cover' }}
                                        />
                                    </div>

                                    <div className="flex flex-col gap-2">
                                        <h3 className="text-xl font-semibold text-[#101828] text-center">
                                            {category.title}
                                        </h3>
                                        <p className="text-[#475467] text-center text-sm">
                                            Click to view action plan details
                                        </p>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                </Container>
            </section>

            {/* Photo Gallery section */}
            <section className="bg-[#F9FAFB] w-full py-24">
                <Container className="flex flex-col items-center gap-16">
                    <div className="flex flex-col items-center gap-6 w-full">
                        <div className="flex flex-col gap-3 w-full">
                            <TextMD
                                weight="semibold"
                                className="text-center text-[#1DADDF]"
                            >
                                Memories
                            </TextMD>
                            <DisplayMD
                                weight="semibold"
                                className="text-center text-[#101828]"
                            >
                                Photo Gallery
                            </DisplayMD>
                        </div>
                        <TextMD className="text-center text-[#475467] max-w-3xl">
                            Relive the moments from GYCC 2020 through our photo collection, capturing the energy, collaboration, and dedication of youth climate leaders from around the world.
                        </TextMD>
                    </div>

                    <div className="w-full">
                        <PhotoGallery bucketName="gycc-2020" />
                    </div>
                </Container>
            </section>

            {/* Action Plan Modal */}
            <Modal
                isOpen={isModalOpen}
                onOpenChange={closeModal}
                size="5xl"
                scrollBehavior="inside"
                className="max-h-[90vh]"
            >
                <ModalContent>
                    <ModalHeader className="flex flex-col gap-1">
                        <h2 className="text-2xl font-semibold text-[#101828]">
                            {selectedCategory?.title} Action Plan
                        </h2>
                        <p className="text-[#475467] font-normal">
                            Detailed proposals and solutions for {selectedCategory?.title.toLowerCase()} climate challenges
                        </p>
                    </ModalHeader>
                    <ModalBody className="pb-6">
                        {selectedCategory && (
                            <div className="flex flex-col gap-6">
                                {selectedCategory.images.map((imageSrc, index) => (
                                    <div key={index} className="w-full relative">
                                        <Image
                                            src={imageSrc}
                                            alt={`${selectedCategory.title} Action Plan Page ${index + 1}`}
                                            width={800}
                                            height={1000}
                                            style={{ objectFit: 'contain' }}
                                            className="w-full h-auto rounded-lg"
                                        />
                                    </div>
                                ))}
                            </div>
                        )}
                    </ModalBody>
                </ModalContent>
            </Modal>
        </main>
    );
};

export default Gycc2020Page;