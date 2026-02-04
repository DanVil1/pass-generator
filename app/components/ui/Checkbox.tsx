import { InputHTMLAttributes } from 'react';

interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: string;
}

export function Checkbox({ label, className = '', ...props }: CheckboxProps) {
  return (
    <label className="flex items-center justify-between cursor-pointer hover:bg-zinc-800/50 p-2 rounded transition">
      <span className="text-zinc-300">{label}</span>
      <input
        type="checkbox"
        className={`w-5 h-5 accent-cyan-500 rounded focus:ring-cyan-500 focus:ring-2 ${className}`}
        {...props}
      />
    </label>
  );
}
