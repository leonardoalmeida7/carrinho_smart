import { Minus, Plus } from 'lucide-react'

interface StepperProps {
  value: number
  onChange: (value: number) => void
  min?: number
  step?: number
  unit?: string
  compact?: boolean
}

export function Stepper({
  value,
  onChange,
  min = 1,
  step = 1,
  unit,
  compact,
}: StepperProps) {
  const decrement = () => onChange(Math.max(min, Math.round((value - step) * 100) / 100))
  const increment = () => onChange(Math.round((value + step) * 100) / 100)

  const display = Number.isInteger(value)
    ? value.toString()
    : value.toLocaleString('pt-BR', { maximumFractionDigits: 2 })

  return (
    <div
      className={`inline-flex items-center gap-1 rounded-xl bg-surface-container-low ${
        compact ? 'p-0.5' : 'p-1'
      }`}
    >
      <button
        type="button"
        onClick={decrement}
        className="flex h-9 w-9 items-center justify-center rounded-lg bg-stone-100 text-stone-muted transition active:bg-stone-200"
        aria-label="Diminuir"
      >
        <Minus className="h-4 w-4" />
      </button>
      <span className="min-w-[3rem] text-center text-sm font-bold tabular-nums">
        {display}
        {unit && ` ${unit}`}
      </span>
      <button
        type="button"
        onClick={increment}
        className="flex h-9 w-9 items-center justify-center rounded-lg bg-stone-100 text-stone-muted transition active:bg-stone-200"
        aria-label="Aumentar"
      >
        <Plus className="h-4 w-4" />
      </button>
    </div>
  )
}
