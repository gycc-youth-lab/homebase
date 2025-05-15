'use client'

import React from 'react';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavMenuButtonProps {
    isOpen: boolean;
    onClick: () => void;
    className?: string;
}

const NavMenuButton: React.FC<NavMenuButtonProps> = ({
    isOpen,
    onClick,
    className
}) => {
    return (
        <button
            onClick={onClick}
            className={cn(
                'p-2 rounded-lg transition-colors duration-200',
                'hover:bg-[#F2F4F7]',
                'focus:outline-none focus:ring-2 focus:ring-primary/20',
                isOpen && 'bg-white',
                className
            )}
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isOpen}
        >
            {isOpen ? (
                <X className="w-6 h-6 text-[#344054]" />
            ) : (
                <Menu className="w-6 h-6 text-[#344054] hover:text-[#182230]" />
            )}
        </button>
    );
};

export default NavMenuButton;
