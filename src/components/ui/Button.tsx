import type { ButtonHTMLAttributes, ReactNode } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'destructive' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  children: ReactNode
}

const variants = {
  primary: 'bg-primary text-on-primary hover:bg-primary-container active:scale-[0.98]',
  secondary: 'bg-mint text-primary hover:bg-mint-dark/40 active:scale-[0.98]',
  destructive: 'bg-error-container text-error hover:bg-error/10',
  ghost: 'bg-transparent text-on-surface-variant hover:bg-surface-container',
}

const sizes = {
  sm: 'h-9 px-3 text-sm',
  md: 'h-12 px-4 text-sm font-semibold',
  lg: 'h-14 px-6 text-base font-semibold',
}

export function Button({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 rounded-xl font-display transition-all disabled:opacity-50 ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
