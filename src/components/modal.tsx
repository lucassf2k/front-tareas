import { ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { twMerge } from 'tailwind-merge';

interface ModalProps {
  children: ReactNode;
  isVisible: boolean;
  className?: string;
}

export const Modal = (props: ModalProps) => {
  if (!props.isVisible) return null;
  return createPortal(
    <div
      className={twMerge(
        'bg-cyan-900/20 backdrop-blur-sm absolute w-full h-full left-0 top-0 flex items-center justify-center',
        props.className,
      )}
    >
      {props.children}
    </div>,
    document.getElementById('modalRoot') as HTMLElement,
  );
};

export interface ModalContentProps {
  children: ReactNode;
  className?: string;
}

export const ModalContent = (props: ModalContentProps) => {
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
