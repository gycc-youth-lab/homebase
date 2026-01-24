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
    youtubeId?: string;
    downloadUrl?: string;
    isUpcoming?: boolean;
    localPosterSrc?: string;
}

const events: EventData[] = [
    {
        id: 'korea',
        tabLabel: 'Korea',
        title: 'GYCC 2024 | Korea',
        theme: 'Uniting Youth for a Greener Tomorrow',
        dates: 'Oct 2024',
        location: 'Seoul, Korea',
        description: 'The GYCC 2024 Seoul gathering brought together youth climate leaders to develop innovative solutions and strengthen global collaboration for climate action.',
        posterKey: 'htdocs-full/images/new/GYCC_2024_seoul_townhall.jpg',
        logoKey: 'htdocs-full/images/new/gycc202425.png',
        youtubeId: 'nexYsCih648',
    },
    {
        id: 'azerbaijan',
        tabLabel: 'Azerbaijan (COP 29)',
        title: 'COP 29 | Azerbaijan',
        theme: 'Uniting Youth for a Greener Tomorrow',
        dates: 'Nov 2024',
        location: 'Baku, Azerbaijan',
        description: 'GYCC delegates participated in COP29 in Azerbaijan, advocating for youth-led climate solutions and engaging with global policymakers on critical environmental issues.',
        posterKey: 'htdocs-full/images/new/GYCC_2024_cop29_azerbaijan.png',
        logoKey: 'htdocs-full/images/new/gycc202425.png',
        youtubeId: 'nexYsCih648',
    },
    {
        id: 'vietnam',
        tabLabel: 'Vietnam (P4G)',
        title: 'P4G 2025 | Vietnam',
        theme: 'Uniting Youth for a Greener Tomorrow',
        dates: 'Apr 2025',
        location: 'Vietnam',
        description: 'At the upcoming P4G Summit in Vietnam, GYCC will continue to amplify youth voices and present actionable proposals for sustainable development.',
        posterKey: '', // Uses local image
        logoKey: 'htdocs-full/images/new/gycc202425.png',
        localPosterSrc: '/images/gycc/about01_7.png',
        isUpcoming: true,
    },
];

function Gycc2024Content() {
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
            // Remove duplicates and empty keys
            const uniqueKeys = [...new Set(allKeys)].filter(key => key);

            try {
                const response = await fetch('/api/presign-images', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ keys: uniqueKeys }),
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
        router.push(`/activities/gycc-2024?event=${newEvent}`, { scroll: false });
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
                                GYCC 2024-2025
                            </DisplayLG>
                        </div>
                        <TextMD className="text-center text-[#475467] max-w-3xl">
                            Explore the events and activities from the current GYCC program cycle, featuring gatherings in Korea, Azerbaijan, and Vietnam.
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
                        {currentEvent.isUpcoming && (
                            <span className="px-4 py-1 bg-[#1DADDF]/10 text-[#1DADDF] rounded-full text-sm font-medium">
                                Upcoming Event
                            </span>
                        )}
                    </div>

                    {/* Poster and event details */}
                    <div className="flex flex-col lg:flex-row gap-12 items-center w-full">
                        {/* Poster image */}
                        <div className="flex-1 relative h-[600px] max-w-lg">
                            {(currentEvent.localPosterSrc || imageUrls[currentEvent.posterKey]) && (
                                <Image
                                    src={currentEvent.localPosterSrc || imageUrls[currentEvent.posterKey]}
                                    alt={`${currentEvent.title} Poster`}
                                    fill
                                    style={{ objectFit: 'cover' }}
                                    className="rounded-lg"
                                    unoptimized={!currentEvent.localPosterSrc}
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

                    {/* Video section - only show if not upcoming */}
                    {currentEvent.youtubeId && !currentEvent.isUpcoming && (
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
                    )}

                    {/* Coming soon message for upcoming events */}
                    {currentEvent.isUpcoming && (
                        <div className="w-full max-w-4xl bg-white rounded-lg p-12 text-center">
                            <div className="text-6xl mb-4">🌏</div>
                            <h3 className="text-2xl font-semibold text-[#101828] mb-2">Coming Soon</h3>
                            <p className="text-[#475467]">
                                Stay tuned for updates on this upcoming event. More details will be announced as the event approaches.
                            </p>
                        </div>
                    )}
                </Container>
            </section>

            {/* Photo Gallery section - only show if not an upcoming event */}
            {!currentEvent.isUpcoming && (
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
                                Relive the moments from GYCC 2024-2025 through our photo collection, capturing the energy, collaboration, and dedication of youth climate leaders from around the world.
                            </TextMD>
                            <Link
                                href="/media/photos"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-[#1DADDF] text-white rounded-lg hover:bg-[#1a9bc9] transition-colors"
                            >
                                <ImageIcon className="w-5 h-5" />
                                View Photo Gallery
                            </Link>
                        </div>
                    </Container>
                </section>
            )}
        </main>
    );
}

const Gycc2024Page: React.FC = () => {
    return (
        <Suspense fallback={
            <main className="min-h-screen flex items-center justify-center">
                <div className="w-6 h-6 border-2 border-neutral-200 border-t-[#1DADDF] rounded-full animate-spin" />
            </main>
        }>
            <Gycc2024Content />
        </Suspense>
    );
};

export default Gycc2024Page;
