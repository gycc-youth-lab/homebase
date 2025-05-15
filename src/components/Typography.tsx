import React, { ElementType } from 'react';
import { cn } from '@/lib/utils';

interface TypographyProps<C extends ElementType = 'p'> {
    variant?: 'text-sm' | 'text-md' | 'text-lg' | 'text-xl' | 'display-sm' | 'display-md' | 'display-lg' | 'display-xl';
    weight?: 'regular' | 'medium' | 'semibold' | 'bold';
    as?: C;
    font?: 'title' | 'content';
    className?: string;
    children: React.ReactNode;
}

const variantStyles = {
    'text-sm': 'text-sm leading-5', // 14px/20px
    'text-md': 'text-base leading-6', // 16px/24px
    'text-lg': 'text-lg leading-7', // 18px/28px
    'text-xl': 'text-xl leading-[30px]', // 20px/30px
    'display-sm': 'text-[30px] leading-[38px]', // 30px/38px
    'display-md': 'text-[36px] leading-[44px] tracking-[-0.02em]', // 36px/44px
    'display-lg': 'text-[48px] leading-[60px] tracking-[-0.02em]', // 48px/60px
    'display-xl': 'text-[60px] leading-[72px] tracking-[-0.02em]', // 60px/72px
};

const weightStyles = {
    regular: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold',
};

// font-title uses DM Sans (--font-dm-sans)
// font-content uses Inter (--font-inter)
const fontStyles = {
    title: 'font-title', // DM Sans
    content: 'font-content', // Inter
};

const Typography = <C extends ElementType = 'p'>({
    variant = 'text-md',
    weight = 'regular',
    as,
    font = 'content', // Default to Inter
    className,
    children,
    ...props
}: TypographyProps<C> & Omit<React.ComponentPropsWithoutRef<C>, keyof TypographyProps<C>>) => {
    const Component = as || 'p';
    return (
        <Component
            className={cn(
                variantStyles[variant],
                weightStyles[weight],
                fontStyles[font],
                className
            )}
            {...props}
        >
            {children}
        </Component>
    );
};

// Preset components for common use cases
export const DisplayXL = (props: Omit<TypographyProps, 'variant'>) => (
    <Typography variant="display-xl" {...props} />
);

export const DisplayLG = (props: Omit<TypographyProps, 'variant'>) => (
    <Typography variant="display-lg" {...props} />
);

export const DisplayMD = (props: Omit<TypographyProps, 'variant'>) => (
    <Typography variant="display-md" {...props} />
);

export const DisplaySM = (props: Omit<TypographyProps, 'variant'>) => (
    <Typography variant="display-sm" {...props} />
);

export const TextXL = (props: Omit<TypographyProps, 'variant'>) => (
    <Typography variant="text-xl" {...props} />
);

export const TextLG = (props: Omit<TypographyProps, 'variant'>) => (
    <Typography variant="text-lg" {...props} />
);

export const TextMD = (props: Omit<TypographyProps, 'variant'>) => (
    <Typography variant="text-md" {...props} />
);

export const TextSM = (props: Omit<TypographyProps, 'variant'>) => (
    <Typography variant="text-sm" {...props} />
); 