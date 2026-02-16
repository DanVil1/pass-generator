'use client';

import { Copy, Check } from 'lucide-react';
import { Button } from '@/app/components/ui';

interface PasswordDisplayProps {
  password: string;
  copied: boolean;
  onCopy: () => void;
}

export function PasswordDisplay({ password, copied, onCopy }: PasswordDisplayProps) {
  return (
    <div className="bg-neutral-950 rounded-lg p-4 flex items-center justify-between border border-neutral-800 hover:border-neutral-700 transition-colors relative group">
      <input
        type="text"
        value={password}
        readOnly
        className="bg-transparent w-full text-xl font-mono outline-none text-white placeholder-neutral-600 focus:ring-0"
        placeholder="Select options..."
      />
      <Button variant="ghost" onClick={onCopy} title="Copy to clipboard" className="ml-3">
        {copied ? <Check size={20} className="text-white" /> : <Copy size={20} />}
      </Button>
    </div>
  );
}
