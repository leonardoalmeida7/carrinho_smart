/* 

Componente SavingsBanner.tsx responsavel por exibir um banner de economia baseado no orçamento e total da lista.

import { PiggyBank } from 'lucide-react'
import { useAppStore } from '../../store/useAppStore'
import { formatCurrency } from '../../lib/format'

export function SavingsBanner() {
  const total = useAppStore((s) => s.getListTotal())
  const budget = useAppStore((s) => s.settings.budgetPerTrip)
  const savings = Math.max(budget - total, 0)

  if (total === 0) return null

  return (
    <div className="mt-4 flex items-center gap-3 rounded-2xl bg-mint p-4">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary">
        <PiggyBank className="h-5 w-5 text-white" />
      </div>
      <p className="text-sm leading-snug text-on-surface-variant">
        Você está no caminho certo! Mantendo essa média, você economizará{' '}
        <strong className="text-primary">{formatCurrency(savings * 0.25)}</strong> nesta
        compra.
      </p>
    </div>
  )
}
 */