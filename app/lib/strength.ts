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
        color: 'bg-pink-500',
        textColor: 'text-pink-500',
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
        color: 'bg-emerald-500',
        textColor: 'text-emerald-500',
      };
    default:
      return {
        score: 0,
        label: 'Weak',
        color: 'bg-zinc-600',
        textColor: 'text-zinc-400',
      };
  }
}

/**
 * Calculates strength bar width percentage
 */
export function getStrengthPercentage(score: StrengthScore): number {
  return ((score + 1) / 5) * 100;
}
