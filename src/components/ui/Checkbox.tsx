import { Check } from 'lucide-react'

interface CheckboxProps {
  checked: boolean
  onChange: () => void
  label?: string
}

export function Checkbox({ checked, onChange, label }: CheckboxProps) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      aria-label={label}
      onClick={onChange}
      className={`flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-lg border-2 transition-all ${
        checked
          ? 'animate-check border-primary bg-primary'
          : 'border-stone-300 bg-transparent hover:border-primary/50'
      }`}
    >
      {checked && <Check className="h-3.5 w-3.5 text-white" strokeWidth={3} />}
    </button>
  )
}
