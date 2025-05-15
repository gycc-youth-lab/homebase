import React from 'react';
import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';

const buttonVariants = cva(
    'inline-flex items-center justify-center rounded-lg font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
    {
        variants: {
            variant: {
                primary: 'bg-gradient-to-b from-secondary-DEFAULT to-primary-DEFAULT text-gray-900 shadow-sm hover:from-secondary-variant hover:to-primary-variant',
                secondary: 'border border-primary-DEFAULT text-gray-700 hover:border-primary-variant hover:bg-gray-50',
                destructive: 'bg-error-DEFAULT text-white hover:bg-error-variant',
                ghost: 'text-gray-700 hover:bg-gray-50',
                tab: 'border border-primary-DEFAULT text-gray-700 hover:border-primary-variant hover:bg-gray-50',
            },
            size: {
                sm: 'h-9 px-4 text-sm',
                md: 'h-10 px-6 py-2 text-base',
                lg: 'h-14 px-8 py-4 text-lg',
                icon: 'h-10 w-10',
            },
        },
        defaultVariants: {
            variant: 'primary',
            size: 'md',
        },
    }
);

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> { }

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, ...props }, ref) => {
        return (
            <button
                className={cn(buttonVariants({ variant, size, className }))}
                ref={ref}
                {...props}
            />
        );
    }
);

Button.displayName = 'Button';

export { Button, buttonVariants }; 