'use client';

import { RefreshCw } from 'lucide-react';
import { Card, CardHeader, CardContent, Button } from '@/app/components/ui';
import { PasswordDisplay } from './PasswordDisplay';
import { StrengthIndicator } from './StrengthIndicator';
import { PasswordOptionsPanel } from './PasswordOptions';
import { usePasswordGenerator, useCopyToClipboard } from '@/app/hooks';

export function PasswordGenerator() {
  const {
    password,
    strength,
    options,
    setLength,
    setIncludeUppercase,
    setIncludeLowercase,
    setIncludeNumbers,
    setIncludeSymbols,
    regenerate,
  } = usePasswordGenerator();

  const { copied, copyToClipboard } = useCopyToClipboard();

  return (
    <Card>
      <CardHeader>
        <h1 className="text-2xl font-bold text-center text-white">Sigil</h1>
      </CardHeader>

      <CardContent>
        {/* Password Display */}
        <PasswordDisplay
          password={password}
          copied={copied}
          onCopy={() => copyToClipboard(password)}
        />

        {/* Strength Indicator */}
        {password && <StrengthIndicator score={strength} />}

        {/* Options */}
        <PasswordOptionsPanel
          options={options}
          onLengthChange={setLength}
          onUppercaseChange={setIncludeUppercase}
          onLowercaseChange={setIncludeLowercase}
          onNumbersChange={setIncludeNumbers}
          onSymbolsChange={setIncludeSymbols}
        />

        {/* Generate Button */}
        <Button onClick={regenerate} fullWidth>
          Generate Password <RefreshCw size={20} />
        </Button>
      </CardContent>
    </Card>
  );
}
