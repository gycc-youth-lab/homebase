'use client';

import React from 'react';
import Container from '@/components/Container';
import { DisplayMD, TextMD, TextLG } from '@/components/Typography';

const DonatePage: React.FC = () => {
    return (
        <main className="min-h-screen">
            {/* Mission section */}
            <section className="bg-white w-full py-24">
                <Container className="flex flex-col items-center gap-12">
                    <div className="flex flex-col items-center gap-6 w-full">
                        <div className="flex flex-col gap-3 w-full">
                            <TextMD
                                weight="semibold"
                                className="text-center text-[#1DADDF]"
                            >
                                Support Our Cause
                            </TextMD>
                            <DisplayMD
                                weight="semibold"
                                className="text-center text-[#101828]"
                            >
                                Our Mission
                            </DisplayMD>
                        </div>
                        <TextMD className="text-center text-[#475467] max-w-3xl">
                            The Global Youth Climate Challenge is dedicated to empowering young people worldwide to take meaningful action against climate change. We believe that the youth are not just the leaders of tomorrow, but the changemakers of today. Through education, innovation, and community engagement, we are building a global network of climate-conscious youth working towards a sustainable future.
                        </TextMD>
                        <TextMD className="text-center text-[#475467] max-w-3xl">
                            Your donation helps us extend our reach to more communities, develop educational resources, and support youth-led climate initiatives across the globe. Together, we can create lasting change for our planet.
                        </TextMD>
                    </div>
                </Container>
            </section>

            {/* How we use donations section */}
            <section className="bg-[#F9FAFB] w-full py-24">
                <Container className="flex flex-col items-center gap-12">
                    <div className="flex flex-col items-center gap-6 w-full">
                        <div className="flex flex-col gap-3 w-full">
                            <TextMD
                                weight="semibold"
                                className="text-center text-[#1DADDF]"
                            >
                                Transparency
                            </TextMD>
                            <DisplayMD
                                weight="semibold"
                                className="text-center text-[#101828]"
                            >
                                How We Use Your Donation
                            </DisplayMD>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full mt-4">
                            <div className="flex flex-col gap-4 items-center p-6 bg-white rounded-xl shadow-sm">
                                <div className="w-12 h-12 flex items-center justify-center bg-[#E0F4FA] rounded-full">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#1DADDF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M9.09 9C9.3251 8.33167 9.78915 7.76811 10.4 7.40913C11.0108 7.05016 11.7289 6.91894 12.4272 7.03871C13.1255 7.15849 13.7588 7.52152 14.2151 8.06353C14.6713 8.60553 14.9211 9.29152 14.92 10C14.92 12 11.92 13 11.92 13" stroke="#1DADDF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M12 17H12.01" stroke="#1DADDF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                                <TextLG weight="semibold" className="text-center text-[#101828]">
                                    Education Programs
                                </TextLG>
                                <TextMD className="text-center text-[#475467]">
                                    40% of donations fund educational workshops, resources, and training for youth to understand climate challenges and develop solutions.
                                </TextMD>
                            </div>

                            <div className="flex flex-col gap-4 items-center p-6 bg-white rounded-xl shadow-sm">
                                <div className="w-12 h-12 flex items-center justify-center bg-[#E0F4FA] rounded-full">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M8 7H5C3.89543 7 3 7.89543 3 9V18C3 19.1046 3.89543 20 5 20H19C20.1046 20 21 19.1046 21 18V9C21 7.89543 20.1046 7 19 7H16M15 3H9C7.89543 3 7 3.89543 7 5V7H17V5C17 3.89543 16.1046 3 15 3Z" stroke="#1DADDF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M12 12L12 16" stroke="#1DADDF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M9 14L12 16L15 14" stroke="#1DADDF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                                <TextLG weight="semibold" className="text-center text-[#101828]">
                                    Project Grants
                                </TextLG>
                                <TextMD className="text-center text-[#475467]">
                                    35% supports direct action through grants for youth-led climate initiatives and community projects around the world.
                                </TextMD>
                            </div>

                            <div className="flex flex-col gap-4 items-center p-6 bg-white rounded-xl shadow-sm">
                                <div className="w-12 h-12 flex items-center justify-center bg-[#E0F4FA] rounded-full">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M3 20.4V5.6C3 4.16406 4.11929 3 5.5 3H18.5C19.8807 3 21 4.16406 21 5.6V20.4C21 20.7314 20.7314 21 20.4 21H3.6C3.26863 21 3 20.7314 3 20.4Z" stroke="#1DADDF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M8 3V21" stroke="#1DADDF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                                <TextLG weight="semibold" className="text-center text-[#101828]">
                                    Operations & Advocacy
                                </TextLG>
                                <TextMD className="text-center text-[#475467]">
                                    25% covers operational costs and global advocacy efforts, ensuring youth voices are represented in climate policy discussions.
                                </TextMD>
                            </div>
                        </div>
                    </div>
                </Container>
            </section>

            {/* Bank account section */}
            <section className="bg-white w-full py-24">
                <Container className="flex flex-col items-center gap-12">
                    <div className="flex flex-col items-center gap-6 w-full">
                        <div className="flex flex-col gap-3 w-full">
                            <TextMD
                                weight="semibold"
                                className="text-center text-[#1DADDF]"
                            >
                                Donation Details
                            </TextMD>
                            <DisplayMD
                                weight="semibold"
                                className="text-center text-[#101828]"
                            >
                                Make Your Contribution
                            </DisplayMD>
                        </div>

                        <div className="flex flex-col items-center gap-4 max-w-3xl">
                            <TextMD className="text-center text-[#475467]">
                                Your generous contribution will directly support our mission to empower youth climate action worldwide. All donations are carefully managed to maximize impact.
                            </TextMD>

                            <div className="w-full max-w-lg mt-6 p-3 border border-[#E4E7EC] rounded-xl bg-[#F9FAFB]">
                                <div className="flex flex-col gap-4 items-center">
                                    <TextLG weight="semibold" className="text-[#101828]">Bank Transfer Information</TextLG>

                                    <div className="w-full p-4 bg-white rounded-lg border border-[#E4E7EC]">
                                        <div className="flex flex-col gap-2">
                                            <div className="flex justify-between">
                                                <span className="text-[#475467]">Bank:</span>
                                                <span className="text-[#101828] font-medium">Hanabank</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-[#475467]">Account Number:</span>
                                                <span className="text-[#101828] font-medium">494-910024-19904</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-[#475467]">SWIFT Code:</span>
                                                <span className="text-[#101828] font-medium">HNBNKRSE</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-[#475467]">Account Name:</span>
                                                <span className="text-[#101828] font-medium">글로벌청년기후변화챌린지</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-[#475467]">Account Name (English):</span>
                                                <span className="text-[#101828] font-medium">Global Youth Climate Challenges</span>
                                            </div>
                                        </div>
                                    </div>

                                    <TextMD className="text-[#475467] italic mt-2">
                                        Please include your name in the transfer memo for our records.
                                    </TextMD>
                                </div>
                            </div>
                        </div>
                    </div>
                </Container>
            </section>

            {/* Contact section */}
            <section className="w-full py-24">
                <Container className="flex flex-col items-center gap-12">
                    <div className="flex flex-col items-center gap-6 w-full">
                        <div className="flex flex-col gap-3 w-full">
                            <TextMD
                                weight="semibold"
                                className="text-center text-[#1DADDF]"
                            >
                                Have Questions?
                            </TextMD>
                            <DisplayMD
                                weight="semibold"
                                className="text-center text-[#101828]"
                            >
                                Contact Our Grant Department
                            </DisplayMD>
                        </div>

                        <TextMD className="text-center text-[#475467] max-w-3xl">
                            For additional information about donations, tax receipts, or partnership opportunities, please contact our grant department head.
                        </TextMD>

                        <div className="mt-6 flex flex-col items-center gap-4">
                            <div className="p-6 bg-white rounded-xl shadow-sm flex flex-col items-center gap-4 max-w-md border">
                                <div className="w-16 h-16 rounded-full overflow-hidden bg-[#E0F4FA] flex items-center justify-center">
                                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M20 10C20 14.4183 16.4183 18 12 18C10.4963 18 9.09464 17.6216 7.87045 16.9608L4 18L5.03955 14.1296C4.37837 12.9054 4 11.5037 4 10C4 5.58172 7.58172 2 12 2C16.4183 2 20 5.58172 20 10Z" stroke="#1DADDF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>

                                <div className="text-center">
                                    <TextLG weight="semibold" className="text-[#101828]">Finance Team</TextLG>
                                    <TextMD className="text-[#1DADDF] mt-2">funds@gyccyouthlab.org</TextMD>
                                </div>

                                <TextMD className="text-center text-[#475467] mt-2">
                                    We welcome all inquiries and are happy to provide more information about how your donation will be used to support our mission.
                                </TextMD>
                            </div>
                        </div>
                    </div>
                </Container>
            </section>
        </main>
    );
};

export default DonatePage;