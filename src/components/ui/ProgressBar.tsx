import { budgetProgressColor } from '../../lib/format'

interface ProgressBarProps {
  percent: number
  showThresholds?: boolean
}

export function ProgressBar({ percent, showThresholds }: ProgressBarProps) {
  const clamped = Math.min(Math.max(percent, 0), 100)
  const colorClass = budgetProgressColor(clamped)

  return (
    <div>
      <div className="h-2.5 overflow-hidden rounded-full bg-stone-200">
        <div
          className={`h-full rounded-full transition-all duration-500 ${colorClass}`}
          style={{ width: `${clamped}%` }}
        />
      </div>
      {showThresholds && (
        <div className="mt-2 flex justify-between text-xs text-stone-muted">
          <span className="flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-primary-light" />
            80% Atenção amigável
          </span>
          <span className="flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-tertiary" />
            100% Limite atingido
          </span>
        </div>
      )}
    </div>
  )
}
