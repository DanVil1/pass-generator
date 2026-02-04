'use client';

import { useState, useCallback, useMemo } from 'react';
import { PasswordOptions, StrengthScore } from '@/app/types/password';
import { generatePassword as generatePasswordUtil, defaultPasswordOptions } from '@/app/lib/password';
import { calculateStrength } from '@/app/lib/strength';

interface UsePasswordGeneratorReturn {
  password: string;
  strength: StrengthScore;
  options: PasswordOptions;
  setLength: (length: number) => void;
  setIncludeUppercase: (include: boolean) => void;
  setIncludeLowercase: (include: boolean) => void;
  setIncludeNumbers: (include: boolean) => void;
  setIncludeSymbols: (include: boolean) => void;
  regenerate: () => void;
}

export function usePasswordGenerator(
  initialOptions?: Partial<PasswordOptions>
): UsePasswordGeneratorReturn {
  const [options, setOptions] = useState<PasswordOptions>({
    ...defaultPasswordOptions,
    ...initialOptions,
  });
  const [password, setPassword] = useState<string>(() => {
    const initialPassword = generatePasswordUtil({ ...defaultPasswordOptions, ...initialOptions });
    return initialPassword;
  });

  const strength = useMemo<StrengthScore>(() => calculateStrength(password), [password]);

  const regenerate = useCallback(() => {
    const newPassword = generatePasswordUtil(options);
    setPassword(newPassword);
  }, [options]);

  const setLength = useCallback((length: number) => {
    setOptions((prev) => {
      const newOptions = { ...prev, length };
      setPassword(generatePasswordUtil(newOptions));
      return newOptions;
    });
  }, []);

  const setIncludeUppercase = useCallback((includeUppercase: boolean) => {
    setOptions((prev) => {
      const newOptions = { ...prev, includeUppercase };
      setPassword(generatePasswordUtil(newOptions));
      return newOptions;
    });
  }, []);

  const setIncludeLowercase = useCallback((includeLowercase: boolean) => {
    setOptions((prev) => {
      const newOptions = { ...prev, includeLowercase };
      setPassword(generatePasswordUtil(newOptions));
      return newOptions;
    });
  }, []);

  const setIncludeNumbers = useCallback((includeNumbers: boolean) => {
    setOptions((prev) => {
      const newOptions = { ...prev, includeNumbers };
      setPassword(generatePasswordUtil(newOptions));
      return newOptions;
    });
  }, []);

  const setIncludeSymbols = useCallback((includeSymbols: boolean) => {
    setOptions((prev) => {
      const newOptions = { ...prev, includeSymbols };
      setPassword(generatePasswordUtil(newOptions));
      return newOptions;
    });
  }, []);

  return {
    password,
    strength,
    options,
    setLength,
    setIncludeUppercase,
    setIncludeLowercase,
    setIncludeNumbers,
    setIncludeSymbols,
    regenerate,
  };
}
