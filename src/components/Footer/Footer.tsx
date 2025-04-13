'use client'

import React from 'react';
import Image from "next/image";
import { Instagram, Mail, Youtube, Linkedin } from 'lucide-react';

import logo from '@images/logo.svg'

const Footer: React.FC = () => {
    return (
        <footer className="bg-[#F9FAFB] py-12">
            <div className="max-w-[80%] mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                    {/* Logo and Copyright */}
                    <div className="flex flex-col md:flex-row items-center gap-3">
                        <Image
                            src={logo}
                            alt="GYCC logo"
                            width={196}
                            height={45}
                            className="h-auto object-contain"
                        />
                        <p className="text-[#667085] text-base">
                            © 2025 GYCC All rights reserved.
                        </p>
                    </div>

                    {/* Social Icons */}
                    <div className="flex items-center gap-6">
                        <a
                            href="mailto:admin@gyccyouthlab.org"
                            className="text-[#98A2B3] hover:text-[#667085] transition-colors"
                            aria-label="Email us"
                        >
                            <Mail size={24} />
                        </a>
                        <a
                            href="https://www.instagram.com/gycc_global"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#98A2B3] hover:text-[#667085] transition-colors"
                            aria-label="Follow us on Instagram"
                        >
                            <Instagram size={24} />
                        </a>
                        <a
                            href="https://www.youtube.com/@youthlabgycc6379"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#98A2B3] hover:text-[#667085] transition-colors"
                        >
                            <Youtube size={24} />
                        </a>
                        <a
                            href="https://www.linkedin.com/company/gyccyouthlab"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#98A2B3] hover:text-[#667085] transition-colors"
                        >
                            <Linkedin size={24} />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;