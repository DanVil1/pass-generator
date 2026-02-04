'use client';

import { Slider, Checkbox } from '@/app/components/ui';
import { PasswordOptions } from '@/app/types/password';
import { PASSWORD_CONSTRAINTS } from '@/app/lib/constants';

interface PasswordOptionsProps {
  options: PasswordOptions;
  onLengthChange: (length: number) => void;
  onUppercaseChange: (include: boolean) => void;
  onLowercaseChange: (include: boolean) => void;
  onNumbersChange: (include: boolean) => void;
  onSymbolsChange: (include: boolean) => void;
}

export function PasswordOptionsPanel({
  options,
  onLengthChange,
  onUppercaseChange,
  onLowercaseChange,
  onNumbersChange,
  onSymbolsChange,
}: PasswordOptionsProps) {
  return (
    <div className="space-y-4">
      {/* Length Slider */}
      <Slider
        label="Character Length"
        displayValue={options.length}
        min={PASSWORD_CONSTRAINTS.minLength}
        max={PASSWORD_CONSTRAINTS.maxLength}
        value={options.length}
        onChange={(e) => onLengthChange(Number(e.target.value))}
      />

      {/* Checkboxes */}
      <div className="space-y-3">
        <Checkbox
          label="Include Uppercase Letters"
          checked={options.includeUppercase}
          onChange={(e) => onUppercaseChange(e.target.checked)}
        />

        <Checkbox
          label="Include Lowercase Letters"
          checked={options.includeLowercase}
          onChange={(e) => onLowercaseChange(e.target.checked)}
        />

        <Checkbox
          label="Include Numbers"
          checked={options.includeNumbers}
          onChange={(e) => onNumbersChange(e.target.checked)}
        />

        <Checkbox
          label="Include Symbols"
          checked={options.includeSymbols}
          onChange={(e) => onSymbolsChange(e.target.checked)}
        />
      </div>
    </div>
  );
}
