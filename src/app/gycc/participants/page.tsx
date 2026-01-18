'use client';

import React from 'react';
import Image from 'next/image';
import Container from '@/components/Container';
import { DisplayMD, TextMD, TextLG } from '@/components/Typography';

const stats = [
    { value: '52', label: 'Total Participants' },
    { value: '43', label: 'Overseas Participants' },
    { value: '9', label: 'Korean Nationals' },
    { value: '37', label: 'Different Countries' },
];

const ParticipantsPage: React.FC = () => {
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
                            Participants
                        </DisplayMD>
                    </div>

                    <div className="flex flex-col items-center gap-4 w-full max-w-4xl">
                        <DisplayMD weight="semibold" className="text-center text-[#1DADDF]">
                            GYCC 2022/23 Youth Participants
                        </DisplayMD>
                    </div>
                </Container>
            </section>

            {/* Stats section */}
            <section className="bg-[#F9FAFB] w-full py-12 md:py-16">
                <Container>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                        {stats.map((stat, index) => (
                            <div
                                key={index}
                                className="flex flex-col items-center gap-2 p-6 bg-white rounded-xl shadow-sm"
                            >
                                <span className="text-3xl md:text-4xl font-bold text-[#1DADDF]">
                                    {stat.value}
                                </span>
                                <TextMD className="text-center text-[#475467]">
                                    {stat.label}
                                </TextMD>
                            </div>
                        ))}
                    </div>
                </Container>
            </section>

            {/* Participants Distribution section */}
            <section className="bg-white w-full py-12 md:py-16 lg:py-24">
                <Container className="flex flex-col items-center gap-8 md:gap-12">
                    <div className="flex flex-col items-center gap-6 w-full">
                        <TextLG weight="semibold" className="text-[#1DADDF]">
                            Total number of Participants: 52 (Overseas Participants: 43, Korean Nationals: 9)
                        </TextLG>
                        <div className="w-full max-w-5xl rounded-xl overflow-hidden shadow-sm">
                            <Image
                                src="/images/gycc/participants01_1.jpg"
                                alt="GYCC 2022/23 Participants Distribution"
                                width={1200}
                                height={800}
                                className="w-full h-auto"
                            />
                        </div>
                    </div>
                </Container>
            </section>

            {/* Countries by Continent section */}
            <section className="bg-[#F9FAFB] w-full py-12 md:py-16 lg:py-24">
                <Container className="flex flex-col items-center gap-8 md:gap-12">
                    <div className="flex flex-col items-center gap-6 w-full">
                        <TextLG weight="semibold" className="text-[#1DADDF]">
                            Participants&apos; countries by continent (37 different countries)
                        </TextLG>
                        <div className="w-full max-w-5xl rounded-xl overflow-hidden shadow-sm">
                            <Image
                                src="/images/gycc/participants01_2.jpg"
                                alt="GYCC 2022/23 Participants by Continent"
                                width={1200}
                                height={800}
                                className="w-full h-auto"
                            />
                        </div>
                    </div>
                </Container>
            </section>
        </main>
    );
};

export default ParticipantsPage;
