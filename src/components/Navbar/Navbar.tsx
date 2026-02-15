'use client'

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { useSession, signIn, signOut } from 'next-auth/react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import Container from '@/components/Container';
import NavMenuButton from '@/components/NavMenuButton';


import logo from '@images/logo.svg';

interface NavItem {
    label?: string;
    href?: string;
    children?: NavItem[];
    isDivider?: boolean;
}

const navigation: NavItem[] = [
    {
        label: 'GYCC',
        children: [
            { label: 'About', href: '/gycc/about' },
            { label: 'Topics', href: '/gycc/topics' },
            { label: 'Youth Lab', href: '/gycc/youth-lab' },
            { label: 'Participants', href: '/gycc/participants' },
        ],
    },
    {
        label: 'Activities',
        children: [
            { label: 'P4G 2025 | Vietnam', href: '/activities/gycc-2024?event=vietnam' },
            { label: 'COP 29 | Azerbaijan', href: '/activities/gycc-2024?event=azerbaijan' },
            { label: 'GYCC 2024 | Korea', href: '/activities/gycc-2024?event=korea' },
            { isDivider: true },
            { label: 'P4G 2023 | Colombia', href: '/activities/gycc-2023?event=colombia' },
            { label: 'COP 28 | Egypt', href: '/activities/gycc-2023?event=egypt' },
            { label: 'GYCC 2023 | Korea', href: '/activities/gycc-2023?event=korea' },
            { isDivider: true },
            { label: 'P4G 2021 | Korea', href: '/activities/gycc-2021' },
            { isDivider: true },
            { label: 'GYCC 2020 | Korea', href: '/activities/gycc-2020' }
        ],
    },
    {
        label: 'Our Voice',
        children: [
            { label: 'Policy Proposals', href: '/our-voice/policy-proposals' },
            { label: 'From Our Community', href: '/our-voice/community' },
        ]
    },
    { label: 'Blog', href: '/blog' },
    {
        label: 'Media',
        children: [
            { label: 'Photos', href: '/media/photos' },
        ],
    },
    {
        label: 'Donate',
        href: '/donate'
    },
    { label: 'Join', href: '/join' },
];

const Navbar = () => {
    const { data: session, status } = useSession();
    const [isOpen, setIsOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

    // Prevent body scroll when mobile menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

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
                                    onMouseEnter={() => setActiveDropdown(item.label ?? null)}
                                    onMouseLeave={() => setActiveDropdown(null)}
                                >
                                    {item.href ? <Link
                                        href={item.href ?? '#'}
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
                                    </Link> :
                                        <div
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
                                        </div>}
                                    {item.children && activeDropdown === item.label && (
                                        <div className="absolute top-full left-0 w-48 py-2 bg-white rounded-lg shadow-lg border border-[#EAECF0]">
                                            {item.children!.map((child, i) =>
                                                child.isDivider ? (
                                                    <div
                                                        key={`divider-${i}`}
                                                        className="my-2 border-t border-[#EAECF0]"
                                                    />
                                                ) : (
                                                    <Link
                                                        key={child.label}
                                                        href={child.href!}
                                                        className="block px-4 py-2 text-sm text-[#475467] hover:bg-[#F9FAFB] hover:text-[#182230]"
                                                    >
                                                        {child.label}
                                                    </Link>
                                                )
                                            )}

                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* Auth Section */}
                        <div className="flex items-center gap-3 ml-4">
                            {status === "authenticated" && session?.user ? (
                                <>
                                    {session.user.image && (
                                        <Image
                                            src={session.user.image}
                                            alt={session.user.name || "User"}
                                            width={32}
                                            height={32}
                                            className="rounded-full"
                                        />
                                    )}
                                    <button
                                        onClick={() => signOut()}
                                        className="text-sm font-medium text-[#475467] hover:text-[#182230] transition-colors"
                                    >
                                        Sign Out
                                    </button>
                                </>
                            ) : status === "unauthenticated" ? (
                                <button
                                    onClick={() => signIn("google")}
                                    className="px-4 py-2 text-sm font-semibold text-white bg-primary rounded-lg hover:opacity-90 transition-opacity"
                                >
                                    Sign In
                                </button>
                            ) : null}
                        </div>
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
                        className="fixed inset-0 top-16 bg-white z-40 md:hidden overflow-y-auto"
                    >
                        <Container>
                            <div className="py-6 space-y-6 pb-24">
                                {/* Mobile Nav Links */}
                                <div className="space-y-4">
                                    {navigation.map((item) => (
                                        <div key={item.label}>
                                            <Link
                                                href={item.href ?? '#'}
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
                                                    {item.children!.map(child =>
                                                        child.isDivider ? (
                                                            <div
                                                                key={Math.random()}
                                                                className="my-2 border-t border-[#EAECF0]"
                                                            />
                                                        ) : (
                                                            <Link
                                                                key={child.label}
                                                                href={child.href!}
                                                                onClick={() => setIsOpen(false)}
                                                                className="block py-2 text-base text-[#475467] hover:text-[#182230]"
                                                            >
                                                                {child.label}
                                                            </Link>
                                                        )
                                                    )}

                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>

                                {/* Mobile Auth */}
                                <div className="pt-4 border-t border-[#EAECF0]">
                                    {status === "authenticated" && session?.user ? (
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                {session.user.image && (
                                                    <Image
                                                        src={session.user.image}
                                                        alt={session.user.name || "User"}
                                                        width={32}
                                                        height={32}
                                                        className="rounded-full"
                                                    />
                                                )}
                                                <span className="text-sm text-[#475467]">{session.user.name}</span>
                                            </div>
                                            <button
                                                onClick={() => { signOut(); setIsOpen(false); }}
                                                className="text-sm font-medium text-[#475467] hover:text-[#182230]"
                                            >
                                                Sign Out
                                            </button>
                                        </div>
                                    ) : status === "unauthenticated" ? (
                                        <button
                                            onClick={() => { signIn("google"); setIsOpen(false); }}
                                            className="w-full px-4 py-2 text-sm font-semibold text-white bg-primary rounded-lg hover:opacity-90 transition-opacity"
                                        >
                                            Sign In
                                        </button>
                                    ) : null}
                                </div>
                            </div>
                        </Container>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
};

export default Navbar;
