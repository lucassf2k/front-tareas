import { forwardRef, InputHTMLAttributes, ReactNode } from 'react';

export interface ErrorCompProps {
  text: string | undefined;
}

export const ErrorComp = (props: ErrorCompProps) => {
  return <p className="mt-[2px] text-xs text-red-400">{props.text}</p>;
};

export interface InputContainerProps {
  children: ReactNode;
}

export const InputContainer = (props: InputContainerProps) => {
  return <div className="flex flex-col gap-2">{props.children}</div>;
};

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  return (
    <>
      <label className="text-lg">{props.label}</label>
      <input
        type="email"
        ref={ref}
        className="h-12 rounded-lg px-3 bg-zinc-900 text-sm focus:border focus:outline-none focus:border-solid focus:border-cyan-300"
        {...props}
      />
    </>
  );
});
