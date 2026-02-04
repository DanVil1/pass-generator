import { PasswordOptions } from '@/app/types/password';
import { CHARSETS } from './constants';

/**
 * Generates a random password based on the provided options
 */
export function generatePassword(options: PasswordOptions): string {
  const { length, includeUppercase, includeLowercase, includeNumbers, includeSymbols } = options;

  let charset = '';
  if (includeLowercase) charset += CHARSETS.lowercase;
  if (includeUppercase) charset += CHARSETS.uppercase;
  if (includeNumbers) charset += CHARSETS.numbers;
  if (includeSymbols) charset += CHARSETS.symbols;

  // Return empty if no character set selected
  if (charset === '') {
    return '';
  }

  let password = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
  }

  return password;
}

/**
 * Default password options
 */
export const defaultPasswordOptions: PasswordOptions = {
  length: 12,
  includeUppercase: true,
  includeLowercase: true,
  includeNumbers: true,
  includeSymbols: false,
};
