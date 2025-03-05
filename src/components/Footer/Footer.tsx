'use client'

import React from 'react';
import Image from "next/image";
import { Mail } from 'lucide-react';

import logo from '@images/footer/ft_logo.png'
import mofa from '@images/footer/ft_logo_icon.png'

const Footer: React.FC = () => {
    return (
        <footer className="bg-[#282828] text-white py-[44px] text-center md:text-left">
            <div className="flex justify-around items-center max-w-[1200px] mx-auto px-4 flex flex-col md:flex-row overflow-hidden">
                {/* logo */}
                <div className="mb-4 md:mb-0 md:mr-5 relative">
                    <Image src={logo} alt="GYCC logo" width={196} height={45} className="h-auto object-contain" />
                </div>
                {/* info */}
                <div className="text-[12px] font-gmarketSansMedium tracking-[-0.04em] mb-4 md:mb-0">
                    <div className='text-[17px] font-bold'>
                        Secretariat of GYCC 2024/25
                    </div>
                    Copyrights (c) Global Youth Climate Challenges 2025. All rights reserved.
                </div>
                {/* mofa */}
                <div className="mb-4 md:mb-0 md:mr-5 cursor-pointer" onClick={() => window.open('https://www.mofa.go.kr/eng/index.do')}>
                    <Image src={mofa} alt="MOFA logo" width={156} height={42} className="h-auto object-contain" />
                </div>
                {/* email */}
                <div className="footer-item">
                    <a href="mailto:admin@gyccyouthlab.org">
                        <Mail size={30} className="inline-block mr-2" />
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;