'use client';

import { useState, useCallback } from 'react';

interface UseCopyToClipboardReturn {
  copied: boolean;
  copyToClipboard: (text: string) => Promise<void>;
}

export function useCopyToClipboard(resetDelay = 2000): UseCopyToClipboardReturn {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = useCallback(
    async (text: string) => {
      if (!text) return;

      try {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), resetDelay);
      } catch (err) {
        console.error('Failed to copy to clipboard:', err);
      }
    },
    [resetDelay]
  );

  return { copied, copyToClipboard };
}
