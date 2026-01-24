'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card, Modal, ModalContent, ModalHeader, ModalBody } from '@heroui/react';
import { ImageIcon } from 'lucide-react';
import Container from '@/components/Container';
import { DisplayLG, DisplayMD, TextMD, TextLG } from '@/components/Typography';

// MinIO paths (keys for presigning)
const IMAGE_KEYS = {
    poster: 'htdocs-full/images/new/gycc2021_img01_1.jpg',
    logo: 'htdocs-full/images/new/gycc2021_img01_2.png',
    activitiesOverview: 'htdocs-full/images/new/gycc2021_img01_3.jpg',
};

const PDF_BASE = 'htdocs-full/gycc2021/pdf';

interface ActionPlanCategory {
    id: string;
    title: string;
    thumbnailKey: string;
    imageKeys: string[];
}

const actionPlanCategories: ActionPlanCategory[] = [
    {
        id: 'urban-cities',
        title: 'Urban Cities',
        thumbnailKey: `${PDF_BASE}/pdf_01.jpg`,
        imageKeys: [
            `${PDF_BASE}/1_Urban Cities_Page_1.jpg`,
            `${PDF_BASE}/1_Urban Cities_Page_2.jpg`,
            `${PDF_BASE}/1_Urban Cities_Page_3.jpg`,
            `${PDF_BASE}/1_Urban Cities_Page_4.jpg`,
            `${PDF_BASE}/1_Urban Cities_Page_5.jpg`,
            `${PDF_BASE}/1_Urban Cities_Page_6.jpg`,
        ]
    },
    {
        id: 'food',
        title: 'Food',
        thumbnailKey: `${PDF_BASE}/pdf_02.jpg`,
        imageKeys: [
            `${PDF_BASE}/2_Food_Page_1.jpg`,
            `${PDF_BASE}/2_Food_Page_2.jpg`,
            `${PDF_BASE}/2_Food_Page_3.jpg`,
            `${PDF_BASE}/2_Food_Page_4.jpg`,
            `${PDF_BASE}/2_Food_Page_5.jpg`,
            `${PDF_BASE}/2_Food_Page_6.jpg`,
        ]
    },
    {
        id: 'well-being',
        title: 'Well-Being',
        thumbnailKey: `${PDF_BASE}/pdf_03.jpg`,
        imageKeys: [
            `${PDF_BASE}/3_Well-Being_Page_1.jpg`,
            `${PDF_BASE}/3_Well-Being_Page_2.jpg`,
            `${PDF_BASE}/3_Well-Being_Page_3.jpg`,
            `${PDF_BASE}/3_Well-Being_Page_4.jpg`,
            `${PDF_BASE}/3_Well-Being_Page_5.jpg`,
            `${PDF_BASE}/3_Well-Being_Page_6.jpg`,
        ]
    },
    {
        id: 'rivers-oceans',
        title: 'Rivers & Oceans',
        thumbnailKey: `${PDF_BASE}/pdf_04.jpg`,
        imageKeys: [
            `${PDF_BASE}/4_Rivers&Oceans_Page_1.jpg`,
            `${PDF_BASE}/4_Rivers&Oceans_Page_2.jpg`,
            `${PDF_BASE}/4_Rivers&Oceans_Page_3.jpg`,
            `${PDF_BASE}/4_Rivers&Oceans_Page_4.jpg`,
            `${PDF_BASE}/4_Rivers&Oceans_Page_5.jpg`,
            `${PDF_BASE}/4_Rivers&Oceans_Page_6.jpg`,
        ]
    },
    {
        id: 'production-consumption',
        title: 'Production & Consumption',
        thumbnailKey: `${PDF_BASE}/pdf_05.jpg`,
        imageKeys: [
            `${PDF_BASE}/5_Production&Consumption_Page_1.jpg`,
            `${PDF_BASE}/5_Production&Consumption_Page_2.jpg`,
            `${PDF_BASE}/5_Production&Consumption_Page_3.jpg`,
            `${PDF_BASE}/5_Production&Consumption_Page_4.jpg`,
            `${PDF_BASE}/5_Production&Consumption_Page_5.jpg`,
            `${PDF_BASE}/5_Production&Consumption_Page_6.jpg`,
        ]
    },
    {
        id: 'sustainability',
        title: 'Sustainability',
        thumbnailKey: `${PDF_BASE}/pdf_06.jpg`,
        imageKeys: [
            `${PDF_BASE}/6_Sustainability_Page_1.jpg`,
            `${PDF_BASE}/6_Sustainability_Page_2.jpg`,
            `${PDF_BASE}/6_Sustainability_Page_3.jpg`,
            `${PDF_BASE}/6_Sustainability_Page_4.jpg`,
            `${PDF_BASE}/6_Sustainability_Page_5.jpg`,
            `${PDF_BASE}/6_Sustainability_Page_6.jpg`,
        ]
    },
];

const Gycc2021Page: React.FC = () => {
    const [selectedCategory, setSelectedCategory] = useState<ActionPlanCategory | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [imageUrls, setImageUrls] = useState<Record<string, string>>({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPresignedUrls = async () => {
            const allKeys = [
                IMAGE_KEYS.poster,
                IMAGE_KEYS.logo,
                IMAGE_KEYS.activitiesOverview,
                ...actionPlanCategories.map(c => c.thumbnailKey),
            ];

            try {
                const response = await fetch('/api/presign-images', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ keys: allKeys }),
                });

                if (response.ok) {
                    const { urls } = await response.json();
                    setImageUrls(urls);
                }
            } catch (error) {
                console.error('Error fetching presigned URLs:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPresignedUrls();
    }, []);

    const fetchActionPlanImages = async (category: ActionPlanCategory) => {
        const missingKeys = category.imageKeys.filter(key => !imageUrls[key]);

        if (missingKeys.length > 0) {
            try {
                const response = await fetch('/api/presign-images', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ keys: missingKeys }),
                });

                if (response.ok) {
                    const { urls } = await response.json();
                    setImageUrls(prev => ({ ...prev, ...urls }));
                }
            } catch (error) {
                console.error('Error fetching action plan images:', error);
            }
        }
    };

    const handleCategoryClick = async (category: ActionPlanCategory) => {
        setSelectedCategory(category);
        setIsModalOpen(true);
        await fetchActionPlanImages(category);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedCategory(null);
    };

    if (loading) {
        return (
            <main className="min-h-screen flex items-center justify-center">
                <div className="w-6 h-6 border-2 border-neutral-200 border-t-[#1DADDF] rounded-full animate-spin" />
            </main>
        );
    }

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
                                P4G 2021 | Korea
                            </DisplayLG>
                        </div>
                        <TextMD className="text-center text-[#475467] max-w-3xl">
                            Explore the comprehensive program, action plans, and key achievements from GYCC 2021 - amplifying youth voices for climate action at the P4G Summit.
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
                            Voice of the Earth, Voice for the Earth
                        </DisplayMD>
                    </div>

                    {/* Poster and event details */}
                    <div className="flex flex-col lg:flex-row gap-12 items-center w-full">
                        {/* Poster image */}
                        <div className="flex-1 relative h-[600px] max-w-lg">
                            {imageUrls[IMAGE_KEYS.poster] && (
                                <Image
                                    src={imageUrls[IMAGE_KEYS.poster]}
                                    alt="GYCC 2021 Poster"
                                    fill
                                    style={{ objectFit: 'cover' }}
                                    className="rounded-lg"
                                    unoptimized
                                />
                            )}
                        </div>

                        {/* Event details */}
                        <div className="flex-1 flex flex-col gap-8">
                            <div className="flex flex-col gap-6">
                                <div className="relative h-16">
                                    {imageUrls[IMAGE_KEYS.logo] && (
                                        <Image
                                            src={imageUrls[IMAGE_KEYS.logo]}
                                            alt="GYCC 2021 Logo"
                                            fill
                                            style={{ objectFit: 'contain', objectPosition: 'left' }}
                                            unoptimized
                                        />
                                    )}
                                </div>

                                <div className="flex flex-col gap-4">
                                    <DisplayMD
                                        weight="semibold"
                                        className="text-[#1DADDF]"
                                    >
                                        Voice of the Earth, Voice for the Earth
                                    </DisplayMD>

                                    <TextLG className="text-[#475467]">
                                        <span className="font-semibold text-[#101828]">
                                            May 22<span className="font-normal"> (Sat.)</span> ~ May 29<span className="font-normal"> (Sat.)</span>, 2021
                                        </span>
                                        <br />
                                        Seoul, Korea
                                    </TextLG>
                                </div>
                            </div>

                            <TextMD className="text-[#475467] leading-relaxed">
                                In conjunction with the 2021 P4G Seoul Summit, <span className="font-semibold text-[#101828]">67 participants from 36 countries</span> gathered virtually to discuss key climate themes and develop actionable proposals for world leaders.
                            </TextMD>
                        </div>
                    </div>

                    {/* Video section */}
                    <div className="w-full max-w-4xl">
                        <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                            <iframe
                                src="https://www.youtube.com/embed/JRiW4qEAQf4?autoplay=0&mute=0&rel=0"
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
                            {imageUrls[IMAGE_KEYS.activitiesOverview] && (
                                <Image
                                    src={imageUrls[IMAGE_KEYS.activitiesOverview]}
                                    alt="GYCC 2021 Activities Overview"
                                    fill
                                    style={{ objectFit: 'contain' }}
                                    className="rounded-lg"
                                    unoptimized
                                />
                            )}
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
                                    <div className="w-full h-60 relative rounded-lg overflow-hidden bg-gray-100">
                                        {imageUrls[category.thumbnailKey] && (
                                            <Image
                                                src={imageUrls[category.thumbnailKey]}
                                                alt={`${category.title} Action Plan Preview`}
                                                fill
                                                style={{ objectFit: 'cover' }}
                                                unoptimized
                                            />
                                        )}
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

            {/* Key Achievements section */}
            <section className="bg-[#1DADDF] w-full py-24">
                <Container className="flex flex-col items-center gap-16">
                    <div className="flex flex-col items-center gap-6 w-full">
                        <div className="flex flex-col gap-3 w-full">
                            <TextMD
                                weight="semibold"
                                className="text-center text-white/80"
                            >
                                Impact
                            </TextMD>
                            <DisplayMD
                                weight="semibold"
                                className="text-center text-white"
                            >
                                Key Achievements
                            </DisplayMD>
                        </div>
                        <TextMD className="text-center text-white/90 max-w-3xl">
                            GYCC 2021 achieved significant milestones in amplifying youth voices at the international stage.
                        </TextMD>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
                        <div className="bg-white/10 rounded-xl p-8 backdrop-blur-sm">
                            <h3 className="text-4xl font-bold text-white mb-2">67</h3>
                            <p className="text-white/80">Youth participants from 36 countries</p>
                        </div>
                        <div className="bg-white/10 rounded-xl p-8 backdrop-blur-sm">
                            <h3 className="text-4xl font-bold text-white mb-2">6</h3>
                            <p className="text-white/80">Action plans delivered to world leaders</p>
                        </div>
                        <div className="bg-white/10 rounded-xl p-8 backdrop-blur-sm">
                            <h3 className="text-4xl font-bold text-white mb-2">P4G</h3>
                            <p className="text-white/80">Summit participation and recognition</p>
                        </div>
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
                            Relive the moments from GYCC 2021 through our photo collection, capturing the energy, collaboration, and dedication of youth climate leaders from around the world.
                        </TextMD>
                        <Link
                            href="/media/photos/2021"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-[#1DADDF] text-white rounded-lg hover:bg-[#1a9bc9] transition-colors"
                        >
                            <ImageIcon className="w-5 h-5" />
                            View Photo Gallery
                        </Link>
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
                                {selectedCategory.imageKeys.map((imageKey, index) => (
                                    <div key={index} className="w-full relative">
                                        {imageUrls[imageKey] ? (
                                            <Image
                                                src={imageUrls[imageKey]}
                                                alt={`${selectedCategory.title} Action Plan Page ${index + 1}`}
                                                width={800}
                                                height={1000}
                                                style={{ objectFit: 'contain' }}
                                                className="w-full h-auto rounded-lg"
                                                unoptimized
                                            />
                                        ) : (
                                            <div className="w-full h-[400px] bg-gray-100 rounded-lg flex items-center justify-center">
                                                <div className="w-6 h-6 border-2 border-neutral-200 border-t-[#1DADDF] rounded-full animate-spin" />
                                            </div>
                                        )}
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

export default Gycc2021Page;
