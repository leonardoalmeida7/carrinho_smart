interface ChipProps {
  label: string
  active?: boolean
  onClick?: () => void
  count?: number
}

export function Chip({ label, active, onClick, count }: ChipProps) {
  const display = count !== undefined ? `${label} (${count})` : label

  return (
    <button
      type="button"
      onClick={onClick}
      className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition-all ${
        active
          ? 'bg-primary text-white shadow-[0_2px_8px_rgba(0,105,72,0.25)]'
          : 'border border-stone-border bg-white text-stone-muted hover:border-primary/30'
      }`}
    >
      {display}
    </button>
  )
}
