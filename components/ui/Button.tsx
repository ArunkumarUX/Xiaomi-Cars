'use client'

import { cn } from '@/lib/utils'
import { ButtonHTMLAttributes, forwardRef } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost' | 'dark'
  size?: 'sm' | 'md' | 'lg'
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#E31937] focus:ring-offset-2 focus:ring-offset-[#1A1A1A] rounded-lg',
          {
            // Variants
            'bg-[#E31937] text-white hover:bg-[#E55C00] active:bg-[#CC5200]': variant === 'primary',
            'border-2 border-[#E31937] text-[#E31937] hover:bg-[#E31937] hover:text-white': variant === 'outline',
            'text-white hover:text-[#E31937]': variant === 'ghost',
            'bg-[#242424] text-white border border-[#2E2E2E] hover:border-[#E31937] hover:text-[#E31937]': variant === 'dark',
            // Sizes
            'px-4 py-2 text-sm': size === 'sm',
            'px-6 py-3 text-base': size === 'md',
            'px-8 py-4 text-lg': size === 'lg',
          },
          className
        )}
        {...props}
      >
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'

export default Button
