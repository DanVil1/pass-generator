import { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  fullWidth?: boolean;
}

export function Button({
  children,
  variant = 'primary',
  fullWidth = false,
  className = '',
  ...props
}: ButtonProps) {
  const baseStyles =
    'font-semibold py-3 px-4 rounded-lg transition-all flex items-center justify-center gap-2';

  const variants = {
    primary: 'bg-white text-neutral-900 hover:bg-neutral-200 uppercase tracking-wide',
    secondary: 'bg-neutral-800 border border-neutral-700 hover:border-neutral-600 text-white',
    ghost: 'hover:bg-neutral-800 text-neutral-400 hover:text-white p-2',
  };

  const widthClass = fullWidth ? 'w-full' : '';

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${widthClass} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
