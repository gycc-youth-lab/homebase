import React from 'react';
import { cn } from '@/lib/utils';

interface DividerProps {
    className?: string;
    orientation?: 'horizontal' | 'vertical';
}

export const Divider = ({
    className,
    orientation = 'horizontal',
    ...props
}: DividerProps) => {
    return (
        <div
            className={cn(
                'bg-divider',
                orientation === 'horizontal' ? 'h-px w-full' : 'h-full w-px',
                className
            )}
            {...props}
        />
    );
}; 