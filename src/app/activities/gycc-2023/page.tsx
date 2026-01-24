'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { Tabs, Tab } from '@heroui/react';
import { Download, ImageIcon } from 'lucide-react';
import Container from '@/components/Container';
import { DisplayLG, DisplayMD, TextMD, TextLG } from '@/components/Typography';

interface EventData {
    id: string;
    tabLabel: string;
    title: string;
    theme: string;
    dates: string;
    location: string;
    description: string;
    posterKey: string;
    logoKey: string;
    youtubeId: string;
    downloadUrl?: string;
}

const events: EventData[] = [
    {
        id: 'korea',
        tabLabel: 'Korea',
        title: 'GYCC 2022 | Korea',
        theme: 'Uniting Youth for a Greener Tomorrow',
        dates: 'Jul 13 (Wed.) ~ Jul 16 (Sat.), 2022',
        location: 'Seoul, Korea',
        description: 'Youth delegates from around the world gathered in Seoul to collaborate on innovative climate solutions and strengthen the global youth climate network.',
        posterKey: 'htdocs-full/images/new/gycc202223_img01_1.jpg',
        logoKey: 'htdocs-full/images/new/gycc202223_img01_2.png',
        youtubeId: 'wh_mG942tJg',
    },
    {
        id: 'egypt',
        tabLabel: 'Egypt (COP 28)',
        title: 'COP 28 | Egypt',
        theme: 'The Metaverse: The Better-Verse',
        dates: 'Nov 19 (Sat.), 2022',
        location: 'Sharm El-Sheikh, Egypt',
        description: 'GYCC participated in COP28, bringing youth perspectives to the global climate negotiations and exploring innovative digital solutions for climate action.',
        posterKey: 'htdocs-full/images/new/gycc202223_img02_1.jpg',
        logoKey: 'htdocs-full/images/new/gycc202223_img02_2.png',
        youtubeId: 'l5sLktBMLS0',
    },
    {
        id: 'colombia',
        tabLabel: 'Colombia (P4G)',
        title: 'P4G 2023 | Colombia',
        theme: 'Uniting Youth for a Greener Tomorrow',
        dates: 'Sep 20 (Wed.) ~ Sep 23 (Sat.), 2023',
        location: 'Bogota, Colombia',
        description: 'At the P4G Summit in Colombia, GYCC delegates presented their action plans and engaged with world leaders on accelerating green growth partnerships.',
        posterKey: 'htdocs-full/images/new/gycc202223_img03_1.jpg',
        logoKey: 'htdocs-full/images/new/gycc202223_img03_2.png',
        youtubeId: 'nexYsCih648',
        downloadUrl: '/downloads/gycc-2023-colombia-final-report.pdf',
    },
];

function Gycc2023Content() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const eventParam = searchParams.get('event');

    const [activeEvent, setActiveEvent] = useState<string>(() => {
        const validIds = events.map(e => e.id);
        return eventParam && validIds.includes(eventParam) ? eventParam : 'korea';
    });

    const [imageUrls, setImageUrls] = useState<Record<string, string>>({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const validIds = events.map(e => e.id);
        if (eventParam && validIds.includes(eventParam)) {
            setActiveEvent(eventParam);
        }
    }, [eventParam]);

    useEffect(() => {
        const fetchPresignedUrls = async () => {
            const allKeys = events.flatMap(e => [e.posterKey, e.logoKey]);

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

    const handleTabChange = (key: React.Key) => {
        const newEvent = key.toString();
        setActiveEvent(newEvent);
        router.push(`/activities/gycc-2023?event=${newEvent}`, { scroll: false });
    };

    const currentEvent = events.find(e => e.id === activeEvent) || events[0];

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
                                GYCC 2022-2023
                            </DisplayLG>
                        </div>
                        <TextMD className="text-center text-[#475467] max-w-3xl">
                            Explore the events and activities from the GYCC 2022-2023 program cycle, featuring gatherings in Korea, Egypt, and Colombia.
                        </TextMD>
                    </div>

                    {/* Event Tabs */}
                    <div className="w-full flex justify-center">
                        <Tabs
                            selectedKey={activeEvent}
                            onSelectionChange={handleTabChange}
                            color="primary"
                            variant="underlined"
                            classNames={{
                                tabList: "gap-6 w-full relative rounded-none p-0 border-b border-divider",
                                cursor: "w-full bg-[#1DADDF]",
                                tab: "max-w-fit px-0 h-12",
                                tabContent: "group-data-[selected=true]:text-[#1DADDF]"
                            }}
                        >
                            {events.map((event) => (
                                <Tab key={event.id} title={event.tabLabel} />
                            ))}
                        </Tabs>
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
                            {currentEvent.theme}
                        </DisplayMD>
                    </div>

                    {/* Poster and event details */}
                    <div className="flex flex-col lg:flex-row gap-12 items-center w-full">
                        {/* Poster image */}
                        <div className="flex-1 relative h-[600px] max-w-lg">
                            {imageUrls[currentEvent.posterKey] && (
                                <Image
                                    src={imageUrls[currentEvent.posterKey]}
                                    alt={`${currentEvent.title} Poster`}
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
                                    {imageUrls[currentEvent.logoKey] && (
                                        <Image
                                            src={imageUrls[currentEvent.logoKey]}
                                            alt={`${currentEvent.title} Logo`}
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
                                        {currentEvent.theme}
                                    </DisplayMD>

                                    <TextLG className="text-[#475467]">
                                        <span className="font-semibold text-[#101828]">
                                            {currentEvent.dates}
                                        </span>
                                        <br />
                                        {currentEvent.location}
                                    </TextLG>
                                </div>
                            </div>

                            <TextMD className="text-[#475467] leading-relaxed">
                                {currentEvent.description}
                            </TextMD>

                            {currentEvent.downloadUrl && (
                                <a
                                    href={currentEvent.downloadUrl}
                                    download
                                    className="inline-flex items-center gap-2 px-6 py-3 bg-[#1DADDF] text-white rounded-lg hover:bg-[#1a9bc9] transition-colors w-fit"
                                >
                                    <Download className="w-5 h-5" />
                                    Download Final Report
                                </a>
                            )}
                        </div>
                    </div>

                    {/* Video section */}
                    <div className="w-full max-w-4xl">
                        <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                            <iframe
                                src={`https://www.youtube.com/embed/${currentEvent.youtubeId}?autoplay=0&mute=0&rel=0`}
                                className="absolute top-0 left-0 w-full h-full rounded-lg"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            />
                        </div>
                    </div>
                </Container>
            </section>

            {/* Photo Gallery section */}
            <section className="bg-white w-full py-24">
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
                            Relive the moments from GYCC 2022-2023 through our photo collection, capturing the energy, collaboration, and dedication of youth climate leaders from around the world.
                        </TextMD>
                        <Link
                            href="/media/photos/2023"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-[#1DADDF] text-white rounded-lg hover:bg-[#1a9bc9] transition-colors"
                        >
                            <ImageIcon className="w-5 h-5" />
                            View Photo Gallery
                        </Link>
                    </div>
                </Container>
            </section>
        </main>
    );
}

const Gycc2023Page: React.FC = () => {
    return (
        <Suspense fallback={
            <main className="min-h-screen flex items-center justify-center">
                <div className="w-6 h-6 border-2 border-neutral-200 border-t-[#1DADDF] rounded-full animate-spin" />
            </main>
        }>
            <Gycc2023Content />
        </Suspense>
    );
};

export default Gycc2023Page;
