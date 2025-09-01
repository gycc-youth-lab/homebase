'use client';

import React from 'react';
import Link from 'next/link';
import { Card, Button } from '@heroui/react';
import Container from '@/components/Container';
import { DisplayLG, DisplayMD, TextMD, TextLG } from '@/components/Typography';
import JoinUsForm from '@/components/JoinUsForm';
import { ExternalLink, Users, Target, Globe, Lightbulb, Mail, Linkedin } from 'lucide-react';

const JoinPage: React.FC = () => {
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
                                Join the Movement
                            </TextMD>
                            <DisplayLG
                                weight="semibold"
                                className="text-center text-[#101828]"
                            >
                                Be Part of the Change
                            </DisplayLG>
                        </div>
                        <TextMD className="text-center text-[#475467] max-w-3xl">
                            Join a global network of passionate youth leaders working together to address climate change through innovative solutions, collaborative action, and meaningful impact.
                        </TextMD>
                    </div>
                </Container>
            </section>

            {/* Organization highlights section */}
            <section className="bg-[#F9FAFB] w-full py-24">
                <Container className="flex flex-col items-center gap-16">
                    <div className="flex flex-col items-center gap-6 w-full">
                        <div className="flex flex-col gap-3 w-full">
                            <TextMD
                                weight="semibold"
                                className="text-center text-[#1DADDF]"
                            >
                                Why GYCC?
                            </TextMD>
                            <DisplayMD
                                weight="semibold"
                                className="text-center text-[#101828]"
                            >
                                Leading Youth Climate Action Worldwide
                            </DisplayMD>
                        </div>
                        <TextMD className="text-center text-[#475467] max-w-3xl">
                            Since 2020, GYCC has been at the forefront of youth-led climate action, creating lasting impact through education, innovation, and global collaboration.
                        </TextMD>
                    </div>

                    {/* Impact metrics */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 w-full">
                        <div className="flex flex-col gap-4 items-center p-6 bg-white rounded-xl shadow-sm">
                            <div className="w-12 h-12 flex items-center justify-center bg-[#E0F4FA] rounded-full">
                                <Globe className="w-6 h-6 text-[#1DADDF]" />
                            </div>
                            <div className="text-center">
                                <TextLG weight="semibold" className="text-[#101828]">35+</TextLG>
                                <TextMD className="text-[#475467]">Countries Represented</TextMD>
                            </div>
                        </div>

                        <div className="flex flex-col gap-4 items-center p-6 bg-white rounded-xl shadow-sm">
                            <div className="w-12 h-12 flex items-center justify-center bg-[#E0F4FA] rounded-full">
                                <Users className="w-6 h-6 text-[#1DADDF]" />
                            </div>
                            <div className="text-center">
                                <TextLG weight="semibold" className="text-[#101828]">500+</TextLG>
                                <TextMD className="text-[#475467]">Youth Participants</TextMD>
                            </div>
                        </div>

                        <div className="flex flex-col gap-4 items-center p-6 bg-white rounded-xl shadow-sm">
                            <div className="w-12 h-12 flex items-center justify-center bg-[#E0F4FA] rounded-full">
                                <Target className="w-6 h-6 text-[#1DADDF]" />
                            </div>
                            <div className="text-center">
                                <TextLG weight="semibold" className="text-[#101828]">50+</TextLG>
                                <TextMD className="text-[#475467]">Action Plans Developed</TextMD>
                            </div>
                        </div>

                        <div className="flex flex-col gap-4 items-center p-6 bg-white rounded-xl shadow-sm">
                            <div className="w-12 h-12 flex items-center justify-center bg-[#E0F4FA] rounded-full">
                                <Lightbulb className="w-6 h-6 text-[#1DADDF]" />
                            </div>
                            <div className="text-center">
                                <TextLG weight="semibold" className="text-[#101828]">25+</TextLG>
                                <TextMD className="text-[#475467]">Innovative Projects</TextMD>
                            </div>
                        </div>
                    </div>

                    {/* What we offer */}
                    <div className="w-full max-w-4xl">
                        <div className="flex flex-col gap-8">
                            <DisplayMD
                                weight="semibold"
                                className="text-center text-[#101828]"
                            >
                                What You&apos;ll Gain
                            </DisplayMD>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="flex flex-col gap-4 p-6 bg-white rounded-xl border border-[#E4E7EC]">
                                    <TextLG weight="semibold" className="text-[#101828]">Global Network</TextLG>
                                    <TextMD className="text-[#475467]">
                                        Connect with like-minded youth from around the world, building lasting relationships and collaborative partnerships.
                                    </TextMD>
                                </div>

                                <div className="flex flex-col gap-4 p-6 bg-white rounded-xl border border-[#E4E7EC]">
                                    <TextLG weight="semibold" className="text-[#101828]">Skill Development</TextLG>
                                    <TextMD className="text-[#475467]">
                                        Enhance your leadership, project management, and climate action skills through hands-on workshops and mentorship.
                                    </TextMD>
                                </div>

                                <div className="flex flex-col gap-4 p-6 bg-white rounded-xl border border-[#E4E7EC]">
                                    <TextLG weight="semibold" className="text-[#101828]">Real Impact</TextLG>
                                    <TextMD className="text-[#475467]">
                                        Participate in meaningful projects that create tangible change in communities worldwide.
                                    </TextMD>
                                </div>

                                <div className="flex flex-col gap-4 p-6 bg-white rounded-xl border border-[#E4E7EC]">
                                    <TextLG weight="semibold" className="text-[#101828]">Platform Access</TextLG>
                                    <TextMD className="text-[#475467]">
                                        Gain access to international conferences, policy discussions, and climate action platforms.
                                    </TextMD>
                                </div>
                            </div>
                        </div>
                    </div>
                </Container>
            </section>

            {/* Two-part join section */}
            <section className="bg-white w-full py-24">
                <Container className="flex flex-col items-center gap-16">
                    <div className="flex flex-col items-center gap-6 w-full">
                        <DisplayMD
                            weight="semibold"
                            className="text-center text-[#101828]"
                        >
                            Choose Your Level of Engagement
                        </DisplayMD>
                        <TextMD className="text-center text-[#475467] max-w-3xl">
                            Whether you want to stay informed or actively contribute, we have options that fit your commitment level and interests.
                        </TextMD>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 w-full">
                        {/* Newsletter signup section */}
                        <Card className="p-8 border border-[#E4E7EC] shadow-sm">
                            <div className="flex flex-col gap-6 h-full">
                                <div className="flex flex-col gap-4">
                                    <div className="w-12 h-12 flex items-center justify-center bg-[#E0F4FA] rounded-full">
                                        <Mail className="w-6 h-6 text-[#1DADDF]" />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <TextLG weight="semibold" className="text-[#101828]">
                                            Stay in the Loop
                                        </TextLG>
                                        <TextMD className="text-[#475467]">
                                            Perfect for those who want to stay informed about our latest activities, events, and climate action opportunities.
                                        </TextMD>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-4">
                                    <div className="flex flex-col gap-3">
                                        <h4 className="font-semibold text-[#101828]">You&apos;ll receive:</h4>
                                        <ul className="text-[#475467] space-y-1">
                                            <li>• Monthly newsletter with updates</li>
                                            <li>• Event invitations and opportunities</li>
                                            <li>• Climate action resources and tips</li>
                                            <li>• Success stories from our network</li>
                                        </ul>
                                    </div>
                                </div>

                                <div className="flex-1 flex flex-col justify-end">
                                    <JoinUsForm className="w-full" />
                                </div>
                            </div>
                        </Card>

                        {/* Active contribution section */}
                        <Card className="p-8 border border-[#1DADDF] shadow-sm bg-gradient-to-br from-[#F0F9FF] to-white">
                            <div className="flex flex-col gap-6 h-full">
                                <div className="flex flex-col gap-4">
                                    <div className="w-12 h-12 flex items-center justify-center bg-[#1DADDF] rounded-full">
                                        <Users className="w-6 h-6 text-white" />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <TextLG weight="semibold" className="text-[#101828]">
                                            Active Contribution
                                        </TextLG>
                                        <TextMD className="text-[#475467]">
                                            For dedicated individuals ready to take on leadership roles and drive meaningful climate action through GYCC initiatives.
                                        </TextMD>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-4">
                                    <div className="flex flex-col gap-3">
                                        <h4 className="font-semibold text-[#101828]">Opportunities include:</h4>
                                        <ul className="text-[#475467] space-y-1">
                                            <li>• Leadership positions in projects</li>
                                            <li>• Conference participation and speaking</li>
                                            <li>• Grant writing and fundraising</li>
                                            <li>• Research and policy development</li>
                                            <li>• Mentoring other youth participants</li>
                                        </ul>
                                    </div>
                                </div>

                                <div className="flex-1 flex flex-col justify-end gap-4">
                                    <Link
                                        href="https://docs.google.com/forms/d/e/1FAIpQLSeOopCqxAfT9_1769iWx3dy4fO4o7Om1sU12xy0X9U9qPA-hw/viewform?hl=ko"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-full"
                                    >
                                        <Button
                                            className="w-full bg-[#1DADDF] text-white font-semibold py-3 px-4 rounded-lg shadow-sm hover:bg-[#0E9BB8] transition-colors"
                                            size="lg"
                                            endContent={<ExternalLink className="w-4 h-4" />}
                                        >
                                            Apply to Join as Active Member
                                        </Button>
                                    </Link>

                                    <Link
                                        href="https://www.linkedin.com/company/gyccyouthlab/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-full"
                                    >
                                        <Button
                                            variant="bordered"
                                            className="w-full border-[#1DADDF] text-[#1DADDF] font-semibold py-3 px-4 rounded-lg hover:bg-[#1DADDF] hover:text-white transition-colors"
                                            size="lg"
                                            endContent={<Linkedin className="w-4 h-4" />}
                                        >
                                            Connect on LinkedIn
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </Card>
                    </div>
                </Container>
            </section>

            {/* Contact section for additional inquiries */}
            <section className="bg-[#F9FAFB] w-full py-24">
                <Container className="flex flex-col items-center gap-12">
                    <div className="flex flex-col items-center gap-6 w-full">
                        <div className="flex flex-col gap-3 w-full">
                            <TextMD
                                weight="semibold"
                                className="text-center text-[#1DADDF]"
                            >
                                Need More Information?
                            </TextMD>
                            <DisplayMD
                                weight="semibold"
                                className="text-center text-[#101828]"
                            >
                                Contact Our Outreach Team
                            </DisplayMD>
                        </div>

                        <TextMD className="text-center text-[#475467] max-w-3xl">
                            Have questions about joining GYCC, our programs, or how you can get involved? Our outreach team is here to help guide you through the process.
                        </TextMD>

                        <div className="mt-6 flex flex-col items-center gap-4">
                            <div className="p-6 bg-white rounded-xl shadow-sm flex flex-col items-center gap-4 max-w-md border">
                                <div className="w-16 h-16 rounded-full overflow-hidden bg-[#E0F4FA] flex items-center justify-center">
                                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M20 10C20 14.4183 16.4183 18 12 18C10.4963 18 9.09464 17.6216 7.87045 16.9608L4 18L5.03955 14.1296C4.37837 12.9054 4 11.5037 4 10C4 5.58172 7.58172 2 12 2C16.4183 2 20 5.58172 20 10Z" stroke="#1DADDF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>

                                <div className="text-center">
                                    <TextLG weight="semibold" className="text-[#101828]">Outreach Team</TextLG>
                                    <TextMD className="text-[#475467]">Community Engagement</TextMD>
                                    <TextMD className="text-[#1DADDF] mt-2">outreach@gyccyouthlab.org</TextMD>
                                </div>

                                <TextMD className="text-center text-[#475467] mt-2">
                                    We are excited to learn about your interests and help you find the perfect way to contribute to global youth climate action.
                                </TextMD>
                            </div>
                        </div>
                    </div>
                </Container>
            </section>
        </main>
    );
};

export default JoinPage;