// Password Generator Types

export interface PasswordOptions {
  length: number;
  includeUppercase: boolean;
  includeLowercase: boolean;
  includeNumbers: boolean;
  includeSymbols: boolean;
}

export interface StrengthInfo {
  score: number;
  label: 'Weak' | 'Good' | 'Strong';
  color: string;
  textColor: string;
}

export type StrengthScore = 0 | 1 | 2 | 3 | 4;
