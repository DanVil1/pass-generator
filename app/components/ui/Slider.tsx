import { InputHTMLAttributes } from 'react';

interface SliderProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: string;
  displayValue?: string | number;
}

export function Slider({ label, displayValue, className = '', ...props }: SliderProps) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <label className="text-neutral-500 font-medium">{label}</label>
        {displayValue !== undefined && (
          <span className="text-white text-xl font-bold">{displayValue}</span>
        )}
      </div>
      <input
        type="range"
        className={`w-full h-2 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-white ${className}`}
        {...props}
      />
    </div>
  );
}
