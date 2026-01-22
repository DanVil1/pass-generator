// src/app/page.tsx
'use client';

import { useState, useCallback, useEffect } from 'react';
import zxcvbn from 'zxcvbn';
import { Copy, RefreshCw, Check, ShieldCheck, ShieldAlert, Shield } from 'lucide-react';

export default function Home() {
  // State for password configuration
  const [length, setLength] = useState<number>(12);
  const [includeUppercase, setIncludeUppercase] = useState<boolean>(true);
  const [includeLowercase, setIncludeLowercase] = useState<boolean>(true);
  const [includeNumbers, setIncludeNumbers] = useState<boolean>(true);
  const [includeSymbols, setIncludeSymbols] = useState<boolean>(false);

  // State for generated output
  const [password, setPassword] = useState<string>('');
  const [strength, setStrength] = useState<number>(0); // 0-4 score
  const [copied, setCopied] = useState<boolean>(false);

  // Function to generate password based on selected criteria
  const generatePassword = useCallback(() => {
    let charset = '';
    if (includeLowercase) charset += 'abcdefghijklmnopqrstuvwxyz';
    if (includeUppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (includeNumbers) charset += '0123456789';
    if (includeSymbols) charset += '!@#$%^&*()_+~`|}{[]:;?><,./-=';

    // Fallback if nothing is selected
    if (charset === '') {
      setPassword('');
      setStrength(0);
      return;
    }

    let generatedPassword = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      generatedPassword += charset[randomIndex];
    }

    setPassword(generatedPassword);
    
    // Calculate strength using zxcvbn
    const result = zxcvbn(generatedPassword);
    setStrength(result.score);
    setCopied(false);
  }, [length, includeUppercase, includeLowercase, includeNumbers, includeSymbols]);

  // Copy to clipboard function
  const copyToClipboard = async () => {
    if (!password) return;
    try {
      await navigator.clipboard.writeText(password);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
    } catch (err) {
      console.error('Failed to copy!', err);
    }
  };

  // Generate a password on initial load
  useEffect(() => {
    generatePassword();
  }, [generatePassword]);

  // Helper to get strength label and color
  const getStrengthInfo = (score: number) => {
    switch (score) {
      case 0:
      case 1:
        return { label: 'Weak', color: 'bg-red-500', text: 'text-red-500', icon: ShieldAlert };
      case 2:
      case 3:
        return { label: 'Good', color: 'bg-yellow-500', text: 'text-yellow-500', icon: Shield };
      case 4:
        return { label: 'Strong', color: 'bg-green-500', text: 'text-green-500', icon: ShieldCheck };
      default:
        return { label: 'Weak', color: 'bg-gray-300', text: 'text-gray-400', icon: Shield };
    }
  };

  const strengthInfo = getStrengthInfo(strength);
  const StrengthIcon = strengthInfo.icon;

  return (
    <main className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-gray-800 rounded-xl shadow-2xl overflow-hidden border border-gray-700">
        
        {/* Header */}
        <div className="p-6 bg-gray-800 border-b border-gray-700">
          <h1 className="text-2xl font-bold text-center text-blue-400">Password Generator</h1>
        </div>

        <div className="p-6 space-y-6">
          
          {/* Password Display Section */}
          <div className="bg-gray-900 rounded-lg p-4 flex items-center justify-between border border-gray-700 relative group">
            <input
              type="text"
              value={password}
              readOnly
              className="bg-transparent w-full text-xl font-mono outline-none text-gray-100 placeholder-gray-600"
              placeholder="Select options..."
            />
            <button
              onClick={copyToClipboard}
              className="ml-3 p-2 rounded-md hover:bg-gray-700 transition-colors text-gray-400 hover:text-white"
              title="Copy to clipboard"
            >
              {copied ? <Check size={20} className="text-green-500" /> : <Copy size={20} />}
            </button>
          </div>

          {/* Strength Indicator */}
          {password && (
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-400">Strength:</span>
              <div className="flex items-center gap-2">
                <span className={`font-semibold ${strengthInfo.text}`}>{strengthInfo.label}</span>
                <StrengthIcon size={16} className={strengthInfo.text} />
              </div>
            </div>
          )}
          
          {/* Progress Bar for Strength */}
          <div className="w-full bg-gray-700 h-2 rounded-full overflow-hidden">
            <div 
              className={`h-full transition-all duration-300 ${strengthInfo.color}`} 
              style={{ width: `${((strength + 1) / 5) * 100}%` }}
            ></div>
          </div>

          {/* Controls Section */}
          <div className="space-y-4">
            
            {/* Length Slider */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-gray-300 font-medium">Character Length</label>
                <span className="text-blue-400 text-xl font-bold">{length}</span>
              </div>
              <input
                type="range"
                min="4"
                max="32"
                value={length}
                onChange={(e) => setLength(Number(e.target.value))}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
              />
            </div>

            {/* Checkboxes */}
            <div className="space-y-3">
              <label className="flex items-center justify-between cursor-pointer hover:bg-gray-700/50 p-2 rounded transition">
                <span className="text-gray-300">Include Uppercase Letters</span>
                <input
                  type="checkbox"
                  checked={includeUppercase}
                  onChange={(e) => setIncludeUppercase(e.target.checked)}
                  className="w-5 h-5 accent-blue-500 rounded focus:ring-blue-500 focus:ring-2"
                />
              </label>

              <label className="flex items-center justify-between cursor-pointer hover:bg-gray-700/50 p-2 rounded transition">
                <span className="text-gray-300">Include Lowercase Letters</span>
                <input
                  type="checkbox"
                  checked={includeLowercase}
                  onChange={(e) => setIncludeLowercase(e.target.checked)}
                  className="w-5 h-5 accent-blue-500 rounded focus:ring-blue-500 focus:ring-2"
                />
              </label>

              <label className="flex items-center justify-between cursor-pointer hover:bg-gray-700/50 p-2 rounded transition">
                <span className="text-gray-300">Include Numbers</span>
                <input
                  type="checkbox"
                  checked={includeNumbers}
                  onChange={(e) => setIncludeNumbers(e.target.checked)}
                  className="w-5 h-5 accent-blue-500 rounded focus:ring-blue-500 focus:ring-2"
                />
              </label>

              <label className="flex items-center justify-between cursor-pointer hover:bg-gray-700/50 p-2 rounded transition">
                <span className="text-gray-300">Include Symbols</span>
                <input
                  type="checkbox"
                  checked={includeSymbols}
                  onChange={(e) => setIncludeSymbols(e.target.checked)}
                  className="w-5 h-5 accent-blue-500 rounded focus:ring-blue-500 focus:ring-2"
                />
              </label>
            </div>
          </div>

          {/* Generate Button */}
          <button
            onClick={generatePassword}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 uppercase tracking-wide"
          >
            Generate Password <RefreshCw size={20} />
          </button>

        </div>
      </div>
    </main>
  );
}