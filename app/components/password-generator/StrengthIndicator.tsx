import { ShieldCheck, ShieldAlert, Shield } from 'lucide-react';
import { StrengthScore } from '@/app/types/password';
import { getStrengthInfo, getStrengthPercentage } from '@/app/lib/strength';

interface StrengthIndicatorProps {
  score: StrengthScore;
  showLabel?: boolean;
}

const STRENGTH_ICONS = {
  Weak: ShieldAlert,
  Good: Shield,
  Strong: ShieldCheck,
} as const;

export function StrengthIndicator({ score, showLabel = true }: StrengthIndicatorProps) {
  const strengthInfo = getStrengthInfo(score);
  const percentage = getStrengthPercentage(score);
  const Icon = STRENGTH_ICONS[strengthInfo.label];

  return (
    <div className="space-y-2">
      {showLabel && (
        <div className="flex items-center justify-between text-sm">
          <span className="text-neutral-500">Strength:</span>
          <div className="flex items-center gap-2">
            <span className={`font-semibold ${strengthInfo.textColor}`}>{strengthInfo.label}</span>
            <Icon size={16} className={strengthInfo.textColor} />
          </div>
        </div>
      )}

      {/* Progress Bar */}
      <div className="w-full bg-neutral-800 h-1.5 rounded-full overflow-hidden">
        <div
          className={`h-full transition-all duration-300 ${strengthInfo.color}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
