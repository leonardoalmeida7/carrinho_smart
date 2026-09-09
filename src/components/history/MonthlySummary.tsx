import { useState } from 'react'
import { Calendar, ShoppingBag, TrendingDown } from 'lucide-react'
import { useAppStore } from '../../store/useAppStore'
import { formatCurrency, formatMonthYear } from '../../lib/format'
import { ProgressBar } from '../ui/ProgressBar'

export function MonthlySummary() {
  const history = useAppStore((s) => s.history)
  const monthlyBudget = useAppStore((s) => s.settings.monthlyBudget)
  const [selectedMonth] = useState(new Date())

  const monthTotal = history.reduce((sum, h) => {
    const d = new Date(h.date)
    if (
      d.getMonth() === selectedMonth.getMonth() &&
      d.getFullYear() === selectedMonth.getFullYear()
    ) {
      return sum + h.total
    }
    return sum
  }, 0)

  const purchaseCount = history.filter((h) => {
    const d = new Date(h.date)
    return (
      d.getMonth() === selectedMonth.getMonth() &&
      d.getFullYear() === selectedMonth.getFullYear()
    )
  }).length

  const percent = monthlyBudget > 0 ? (monthTotal / monthlyBudget) * 100 : 0
  const belowGoal = monthlyBudget > 0 ? Math.max(0, Math.round((1 - monthTotal / monthlyBudget) * 100)) : 0

  return (
    <section className="shadow-card rounded-2xl border border-stone-100 bg-white p-4">
      <div className="mb-3 flex items-center justify-between">
        <span className="text-xs font-bold uppercase tracking-wide text-stone-muted">
          Resumo Mensal
        </span>
        <button
          type="button"
          className="flex items-center gap-1.5 rounded-full bg-mint px-3 py-1.5 text-xs font-semibold text-primary"
        >
          <Calendar className="h-3.5 w-3.5" />
          {formatMonthYear(selectedMonth)}
        </button>
      </div>

      <p className="font-display text-[32px] font-extrabold tabular-nums text-primary">
        {formatCurrency(monthTotal)}
      </p>

      <div className="mt-2 flex flex-wrap gap-4 text-xs text-stone-muted">
        <span className="flex items-center gap-1">
          <ShoppingBag className="h-3.5 w-3.5" />
          {purchaseCount} compras finalizadas
        </span>
        {belowGoal > 0 && (
          <span className="flex items-center gap-1 text-primary">
            <TrendingDown className="h-3.5 w-3.5" />
            {belowGoal}% abaixo da meta
          </span>
        )}
      </div>

      <div className="mt-4">
        <ProgressBar percent={percent} />
        <div className="mt-2 flex justify-between text-xs text-stone-muted">
          <span>Gasto atual: {formatCurrency(monthTotal)}</span>
          <span>Teto mensal: {formatCurrency(monthlyBudget)}</span>
        </div>
      </div>
    </section>
  )
}
