'use client';

import React from 'react';
import Image from 'next/image';
import Container from '@/components/Container';
import { DisplayMD, TextMD } from '@/components/Typography';

const YouthLabPage: React.FC = () => {
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
                            Youth Lab
                        </DisplayMD>
                    </div>

                    {/* Youth Lab image */}
                    <div className="w-full max-w-5xl rounded-xl overflow-hidden shadow-lg">
                        <Image
                            src="/images/gycc/youthlab01_1.jpg"
                            alt="GYCC Youth Lab"
                            width={1200}
                            height={800}
                            className="w-full h-auto"
                        />
                    </div>
                </Container>
            </section>
        </main>
    );
};

export default YouthLabPage;
