import { forwardRef, InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-lg">{props.label}</label>
      <input
        type="email"
        ref={ref}
        className="h-12 rounded-lg px-3 bg-zinc-900 text-sm focus:border focus:outline-none focus:border-solid focus:border-cyan-300"
        {...props}
      />
    </div>
  );
});
