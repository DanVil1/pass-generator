// Character sets for password generation

export const CHARSETS = {
  lowercase: 'abcdefghijklmnopqrstuvwxyz',
  uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  numbers: '0123456789',
  symbols: '!@#$%^&*()_+~`|}{[]:;?><,./-=',
} as const;

export const PASSWORD_CONSTRAINTS = {
  minLength: 4,
  maxLength: 32,
  defaultLength: 12,
} as const;
