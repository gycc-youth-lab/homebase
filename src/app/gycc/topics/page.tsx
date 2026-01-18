'use client';

import React from 'react';
import Image from 'next/image';
import Container from '@/components/Container';
import { DisplayMD, TextMD, TextLG } from '@/components/Typography';

const TopicsPage: React.FC = () => {
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
                            Topics
                        </DisplayMD>
                    </div>

                    <div className="flex flex-col items-center gap-4 w-full max-w-4xl">
                        <DisplayMD weight="semibold" className="text-center text-[#1DADDF]">
                            Discussion Topics of GYCC
                        </DisplayMD>
                    </div>
                </Container>
            </section>

            {/* Main Themes section */}
            <section className="bg-[#F9FAFB] w-full py-12 md:py-16 lg:py-24">
                <Container className="flex flex-col items-center gap-8 md:gap-12">
                    <div className="flex flex-col items-center gap-6 w-full">
                        <TextLG weight="semibold" className="text-[#1DADDF]">
                            GYCC 2022/23 Main Themes and Discussion Topics
                        </TextLG>
                        <div className="w-full max-w-5xl rounded-xl overflow-hidden shadow-sm">
                            <Image
                                src="/images/gycc/topics01_1.jpg"
                                alt="GYCC 2022/23 Main Themes and Discussion Topics"
                                width={1200}
                                height={800}
                                className="w-full h-auto"
                            />
                        </div>
                    </div>
                </Container>
            </section>

            {/* Detailed Topics section */}
            <section className="bg-white w-full py-12 md:py-16 lg:py-24">
                <Container className="flex flex-col items-center gap-8 md:gap-12">
                    <div className="flex flex-col items-center gap-6 w-full">
                        <TextLG weight="semibold" className="text-[#1DADDF]">
                            GYCC 2022/23 Detailed Discussion Topics
                        </TextLG>
                        <div className="w-full max-w-5xl rounded-xl overflow-hidden shadow-sm">
                            <Image
                                src="/images/gycc/topics01_2.jpg"
                                alt="GYCC 2022/23 Detailed Discussion Topics"
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

export default TopicsPage;
