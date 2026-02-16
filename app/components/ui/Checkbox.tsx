import { InputHTMLAttributes } from 'react';

interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: string;
}

export function Checkbox({ label, className = '', ...props }: CheckboxProps) {
  return (
    <label className="flex items-center justify-between cursor-pointer hover:bg-neutral-800/50 p-2 rounded-lg transition">
      <span className="text-neutral-400">{label}</span>
      <input
        type="checkbox"
        className={`w-5 h-5 accent-white rounded focus:ring-neutral-600 focus:ring-1 ${className}`}
        {...props}
      />
    </label>
  );
}
