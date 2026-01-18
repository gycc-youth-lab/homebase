'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Container from '@/components/Container';
import { DisplayMD, TextMD } from '@/components/Typography';

const programPosters = [
    { src: '/images/gycc/about01_1.jpg', label: 'GYCC 2020', href: '/activities/gycc-2020' },
    { src: '/images/gycc/about01_2.jpg', label: 'GYCC 2021', href: '/activities/gycc-2021' },
    { src: '/images/gycc/about01_3.jpg', label: 'GYCC 2022/23 Korea', href: '/activities/gycc-2022-23' },
    { src: '/images/gycc/about01_4.jpg', label: 'GYCC 2022/23 Egypt', href: '/activities/gycc-2022-23' },
    { src: '/images/gycc/about01_5.jpg', label: 'GYCC 2023 Colombia', href: '/activities/gycc-2023' },
    { src: '/images/gycc/about01_6.jpg', label: 'GYCC 2024/25', href: '/activities/gycc-2024-25' },
    { src: '/images/gycc/about01_7.png', label: 'GYCC 2024/25 Vietnam', href: '/activities/gycc-2024-25' },
];

const AboutPage: React.FC = () => {
    return (
        <main className="min-h-screen">
            {/* Hero section */}
            <section className="bg-white w-full py-12 md:py-16 lg:py-24">
                <Container className="flex flex-col items-center gap-8 md:gap-12">
                    <div className="flex flex-col items-center gap-4 md:gap-6 w-full">
                        <TextMD weight="semibold" className="text-center text-[#1DADDF]">
                            GYCC
                        </TextMD>
                        <DisplayMD weight="semibold" className="text-center text-[#101828]">
                            About
                        </DisplayMD>
                    </div>

                    {/* Program posters grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 w-full">
                        {programPosters.map((poster, index) => (
                            <Link
                                key={index}
                                href={poster.href}
                                className="group relative aspect-[3/4] rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                            >
                                <Image
                                    src={poster.src}
                                    alt={poster.label}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                                    <TextMD weight="semibold" className="text-white text-center">
                                        {poster.label}
                                    </TextMD>
                                </div>
                            </Link>
                        ))}
                    </div>
                </Container>
            </section>

            {/* Background section */}
            <section className="bg-[#F9FAFB] w-full py-12 md:py-16 lg:py-24">
                <Container className="flex flex-col items-center gap-8 md:gap-12">
                    <div className="flex flex-col items-center gap-4 md:gap-6 w-full max-w-4xl">
                        <DisplayMD weight="semibold" className="text-center text-[#1DADDF]">
                            Background
                        </DisplayMD>

                        <div className="flex flex-col gap-6">
                            <TextMD className="text-[#475467]">
                                A global youth network has been established to raise awareness among international youth about climate challenges and countermeasures from the perspectives of youth.
                            </TextMD>
                            <TextMD className="text-[#475467]">
                                Youth from around the world have gathered to share their thoughts and reach conclusions through{' '}
                                <Link href="/activities" className="text-[#1DADDF] underline hover:text-[#028DBF]">(1) Team projects</Link>,{' '}
                                <Link href="/activities/gycc-2022-23" className="text-[#1DADDF] underline hover:text-[#028DBF]">(2) youth networking</Link>, and{' '}
                                <Link href="/our-voice/community" className="text-[#1DADDF] underline hover:text-[#028DBF]">(3) mentoring and lectures</Link>.
                            </TextMD>
                        </div>
                    </div>
                </Container>
            </section>

            {/* Program of GYCC section */}
            <section className="bg-white w-full py-12 md:py-16 lg:py-24">
                <Container className="flex flex-col items-center gap-8 md:gap-12">
                    <div className="flex flex-col items-center gap-4 md:gap-6 w-full max-w-4xl">
                        <DisplayMD weight="semibold" className="text-center text-[#1DADDF]">
                            Program of GYCC
                        </DisplayMD>

                        <div className="flex flex-col gap-6">
                            <TextMD className="text-[#475467]">
                                GYCC gathers youth around the world to be conscious and take action to combat climate change and better the environment. In regards to the theme of GYCC 22/23, Deforestation, we aim to raise awareness of such topics as Bio-economy, Illegal Logging, Climate Technology, Desertification, Forest Biodiversity and Water Quality.
                            </TextMD>
                            <TextMD className="text-[#475467]">
                                GYCC 22/23 has developed under the goal of &quot;Uniting Youth for a Greener Tomorrow&quot;, hoping that youth participants deliver their united voices to the world leaders at the 2023 P4G Bogota Summit.
                            </TextMD>
                            <TextMD className="text-[#475467]">
                                GYCC 22/23 participants have planned, refined and implemented their own action plan and policy proposals since GYCC 22 in Seoul, through out COP27 in Egypt and now ready to present them at 2023 P4G in Bogota. Lend an ear to the voices of youth gathered at GYCC 2022/23 for a greener tomorrow!
                            </TextMD>
                            <TextMD className="text-[#475467]">
                                Our journey from GYCC 2020 until now, moving toward 2023 P4G Colombia and COP28 UAE.
                            </TextMD>
                        </div>
                    </div>
                </Container>
            </section>

            {/* GYCC Youth Lab section */}
            <section className="bg-[#F9FAFB] w-full py-12 md:py-16 lg:py-24">
                <Container className="flex flex-col items-center gap-8 md:gap-12">
                    <div className="flex flex-col items-center gap-4 md:gap-6 w-full max-w-4xl">
                        <DisplayMD weight="semibold" className="text-center text-[#1DADDF]">
                            GYCC Youth Lab
                        </DisplayMD>

                        <div className="w-full aspect-video rounded-xl overflow-hidden shadow-lg">
                            <iframe
                                src="https://www.youtube.com/embed/ILSLBggypRU?rel=0"
                                className="w-full h-full"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                title="GYCC Youth Lab Introduction"
                            />
                        </div>
                    </div>
                </Container>
            </section>
        </main>
    );
};

export default AboutPage;
