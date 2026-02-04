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
    <div className="bg-zinc-950 rounded-lg p-4 flex items-center justify-between border border-zinc-800 relative group">
      <input
        type="text"
        value={password}
        readOnly
        className="bg-transparent w-full text-xl font-mono outline-none text-zinc-100 placeholder-zinc-600"
        placeholder="Select options..."
      />
      <Button variant="ghost" onClick={onCopy} title="Copy to clipboard" className="ml-3">
        {copied ? <Check size={20} className="text-emerald-500" /> : <Copy size={20} />}
      </Button>
    </div>
  );
}
