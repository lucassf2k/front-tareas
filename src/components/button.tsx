import { HTMLAttributes, ReactNode } from 'react';
import { tv, type VariantProps } from 'tailwind-variants';

const button = tv({
  base: 'border-none rounded-md p-1 min-w-16 min-h-8 text-gray-200 font-bold hover:opacity-80',
  variants: {
    size: {
      sm: 'text-sm',
      md: 'w-40 h-12 text-md',
      lg: 'w-80 h-12 text-lg',
      full: 'w-full h-12 text-lg',
    },
    variant: {
      primary: 'bg-cyan-600',
      outline: 'bg-none border border-solid border-gray-500',
      icon: 'bg-none border-none',
    },
    defaultVariants: {
      size: 'md',
      variant: 'primary',
    },
  },
});

type ButtonVariants = VariantProps<typeof button>;

interface ButtonProps
  extends HTMLAttributes<HTMLButtonElement>,
    ButtonVariants {
  children: ReactNode;
}

export const Button = ({ children, ...props }: ButtonProps) => {
  return (
    <button
      className={button({ size: props.size, variant: props.variant })}
      {...props}
    >
      {children}
    </button>
  );
};
