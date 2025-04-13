'use client'

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import Container from '@/components/Container';
import NavMenuButton from '@/components/NavMenuButton';

import logo from '@images/logo.svg';

interface NavItem {
    label: string;
    href: string;
    children?: NavItem[];
}

const navigation: NavItem[] = [
    { label: 'Home', href: '/' },
    {
        label: 'Gallery',
        href: '/gallery',
        children: [
            { label: 'Photo Gallery', href: '/gallery/photos' },
            { label: 'Video Gallery', href: '/gallery/videos' },
        ],
    },
    {
        label: 'Resources',
        href: '/resources',
        children: [
            { label: 'Articles', href: '/resources/articles' },
            { label: 'Downloads', href: '/resources/downloads' },
        ],
    },
    { label: 'Contact', href: '/contact' },
];

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-[#EAECF0]">
            <Container>
                <nav className="h-16 flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex-shrink-0">
                        <Image
                            src={logo}
                            alt="GYCC Logo"
                            width={120}
                            height={40}
                            className="h-10 w-auto"
                            priority
                        />
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8">
                        {/* Nav Links */}
                        <div className="flex items-center gap-8">
                            {navigation.map((item) => (
                                <div
                                    key={item.label}
                                    className="relative"
                                    onMouseEnter={() => setActiveDropdown(item.label)}
                                    onMouseLeave={() => setActiveDropdown(null)}
                                >
                                    <Link
                                        href={item.href}
                                        className={cn(
                                            'flex items-center gap-1 px-1 py-2',
                                            'text-[#475467] hover:text-[#182230]',
                                            'text-base font-semibold transition-colors'
                                        )}
                                    >
                                        {item.label}
                                        {item.children && (
                                            <ChevronDown className="w-4 h-4 text-[#475467]" />
                                        )}
                                    </Link>
                                    {item.children && activeDropdown === item.label && (
                                        <div className="absolute top-full left-0 w-48 py-2 bg-white rounded-lg shadow-lg border border-[#EAECF0]">
                                            {item.children.map((child) => (
                                                <Link
                                                    key={child.label}
                                                    href={child.href}
                                                    className="block px-4 py-2 text-sm text-[#475467] hover:bg-[#F9FAFB] hover:text-[#182230]"
                                                >
                                                    {child.label}
                                                </Link>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* Auth Buttons: not implemented yet */}
                        {/* <div className="flex items-center gap-3">
                            <Link
                                href="/login"
                                className="px-4 py-2 text-base font-semibold text-[#475467] hover:text-[#182230]"
                            >
                                Log in
                            </Link>
                            <Link
                                href="/signup"
                                className="px-4 py-2 text-base font-semibold text-white bg-primary hover:bg-primary-variant rounded-lg transition-colors"
                            >
                                Sign up
                            </Link>
                        </div> */}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <NavMenuButton isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
                    </div>
                </nav>
            </Container>

            {/* Mobile Navigation */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 top-20 bg-white z-40 md:hidden"
                    >
                        <Container>
                            <div className="py-6 space-y-6">
                                {/* Mobile Nav Links */}
                                <div className="space-y-4">
                                    {navigation.map((item) => (
                                        <div key={item.label}>
                                            <Link
                                                href={item.href}
                                                className={cn(
                                                    'flex items-center justify-between py-2',
                                                    'text-[#475467] hover:text-[#182230]',
                                                    'text-lg font-semibold transition-colors'
                                                )}
                                                onClick={() => !item.children && setIsOpen(false)}
                                            >
                                                {item.label}
                                                {item.children && (
                                                    <ChevronRight className="w-5 h-5 text-[#475467]" />
                                                )}
                                            </Link>
                                            {item.children && (
                                                <div className="pl-4 mt-2 space-y-2 border-l border-[#EAECF0]">
                                                    {item.children.map((child) => (
                                                        <Link
                                                            key={child.label}
                                                            href={child.href}
                                                            className="block py-2 text-base text-[#475467] hover:text-[#182230]"
                                                            onClick={() => setIsOpen(false)}
                                                        >
                                                            {child.label}
                                                        </Link>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>

                                {/* Mobile Auth Buttons: not implemented yet */}
                                {/* <div className="space-y-3">
                                    <Link
                                        href="/signup"
                                        className="block w-full py-2.5 px-4 text-center text-white bg-primary hover:bg-primary-variant rounded-lg font-semibold transition-colors"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        Sign up
                                    </Link>
                                    <Link
                                        href="/login"
                                        className="block w-full py-2.5 px-4 text-center text-[#475467] hover:text-[#182230] font-semibold"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        Log in
                                    </Link>
                                </div> */}
                            </div>
                        </Container>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
};

export default Navbar; 