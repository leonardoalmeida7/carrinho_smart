import { ShoppingBag } from 'lucide-react'
import { useAppStore } from '../../store/useAppStore'
import { formatCurrency } from '../../lib/format'
import { ProgressBar } from '../ui/ProgressBar'

export function BudgetPanel() {
  const total = useAppStore((s) => s.getListTotal())
  const itemCount = useAppStore((s) => s.getItemCount())
  const budget = useAppStore((s) => s.settings.budgetPerTrip)
  const percent = budget > 0 ? (total / budget) * 100 : 0
  const remaining = Math.max(budget - total, 0)

  return (
    <section className="shadow-card rounded-2xl border border-stone-100 bg-white p-4">
      <div className="mb-3 flex items-start justify-between">
        <div>
          <div className="mb-1 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-stone-muted">
            <ShoppingBag className="h-3.5 w-3.5" />
            Total no Carrinho
          </div>
          <p className="font-display text-[32px] font-extrabold leading-none tabular-nums text-primary">
            {formatCurrency(total)}
          </p>
        </div>
        <div className="text-right">
          <span className="inline-block rounded-full bg-mint px-2.5 py-1 text-xs font-bold text-primary">
            {itemCount} {itemCount === 1 ? 'item' : 'itens'}
          </span>
          <p className="mt-2 text-xs text-stone-muted">
            Meta máx. <span className="font-semibold">{formatCurrency(budget)}</span>
          </p>
        </div>
      </div>

      <ProgressBar percent={percent} />

      <div className="mt-2 flex justify-between text-xs">
        <span className="text-stone-muted">
          {Math.round(percent)}% do limite utilizado
        </span>
        <span className="font-semibold text-primary">
          {formatCurrency(remaining)} restantes
        </span>
      </div>
    </section>
  )
}
