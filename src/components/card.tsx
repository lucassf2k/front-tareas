import { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

interface CardProps {
  children: ReactNode;
  className?: string;
}

export const Card = (props: CardProps) => {
  return (
    <div
      className={twMerge(
        'p-1 border border-solid border-gray-700 rounded-lg w-full',
        props.className,
      )}
    >
      {props.children}
    </div>
  );
};
