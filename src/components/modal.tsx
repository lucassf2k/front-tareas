import { ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { twMerge } from 'tailwind-merge';

interface ModalProps {
  children: ReactNode;
  className?: string;
}

export const Modal = (props: ModalProps) => {
  return createPortal(
    <div
      className={twMerge(
        'bg-black/80 backdrop-blur-sm absolute w-full h-full left-0 top-0 flex items-center justify-center',
        props.className,
      )}
    >
      {props.children}
    </div>,
    document.getElementById('modalRoot') as HTMLElement,
  );
};

export const ModalContent = (props: ModalProps) => {
  return (
    <div
      className={twMerge(
        'w-full max-w-[480px] bg-black rounded-lg p-2 text-zinc-300',
        props.className,
      )}
    >
      {props.children}
    </div>
  );
};
