import zxcvbn from 'zxcvbn';
import { StrengthInfo, StrengthScore } from '@/app/types/password';

/**
 * Calculates password strength using zxcvbn
 */
export function calculateStrength(password: string): StrengthScore {
  if (!password) return 0;
  const result = zxcvbn(password);
  return result.score as StrengthScore;
}

/**
 * Returns strength display info based on score
 */
export function getStrengthInfo(score: StrengthScore): StrengthInfo {
  switch (score) {
    case 0:
    case 1:
      return {
        score,
        label: 'Weak',
        color: 'bg-red-500',
        textColor: 'text-red-500',
      };
    case 2:
    case 3:
      return {
        score,
        label: 'Good',
        color: 'bg-amber-500',
        textColor: 'text-amber-500',
      };
    case 4:
      return {
        score,
        label: 'Strong',
        color: 'bg-green-500',
        textColor: 'text-green-500',
      };
    default:
      return {
        score: 0,
        label: 'Weak',
        color: 'bg-neutral-700/50',
        textColor: 'text-neutral-400',
      };
  }
}

/**
 * Calculates strength bar width percentage
 */
export function getStrengthPercentage(score: StrengthScore): number {
  return ((score + 1) / 5) * 100;
}
