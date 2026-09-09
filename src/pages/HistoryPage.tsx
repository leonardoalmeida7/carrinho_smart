import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Lightbulb, SlidersHorizontal } from 'lucide-react'
import { AppShell } from '../components/layout/AppShell'
import { MonthlySummary } from '../components/history/MonthlySummary'
import { VisitCard } from '../components/history/VisitCard'
import { Chip } from '../components/ui/Chip'
import { useAppStore } from '../store/useAppStore'
import type { StoreType } from '../types'

type HistoryFilter = 'todas' | StoreType

export function HistoryPage() {
  const navigate = useNavigate()
  const history = useAppStore((s) => s.history)
  const repeatList = useAppStore((s) => s.repeatList)
  const [filter, setFilter] = useState<HistoryFilter>('todas')

  const filtered =
    filter === 'todas' ? history : history.filter((h) => h.storeType === filter)

  const counts = {
    todas: history.length,
    hipermercado: history.filter((h) => h.storeType === 'hipermercado').length,
    hortifruti: history.filter((h) => h.storeType === 'hortifruti').length,
  }

  return (
    <AppShell subtitle="Histórico">
      <MonthlySummary />

      <div className="mt-4 flex items-center gap-2 overflow-x-auto pb-1">
        <Chip
          label="Todas"
          count={counts.todas}
          active={filter === 'todas'}
          onClick={() => setFilter('todas')}
        />
        <Chip
          label="Hipermercados"
          count={counts.hipermercado}
          active={filter === 'hipermercado'}
          onClick={() => setFilter('hipermercado')}
        />
        <Chip
          label="Hortifruti"
          count={counts.hortifruti}
          active={filter === 'hortifruti'}
          onClick={() => setFilter('hortifruti')}
        />
        <button
          type="button"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-stone-border bg-white"
          aria-label="Filtros"
        >
          <SlidersHorizontal className="h-4 w-4 text-stone-muted" />
        </button>
      </div>

      <h2 className="mb-3 mt-4 font-display text-sm font-bold">Histórico de Visitas</h2>

      <div className="space-y-3">
        {filtered.map((purchase) => (
          <VisitCard
            key={purchase.id}
            purchase={purchase}
            onRepeat={() => {
              repeatList(purchase.id)
              navigate('/')
            }}
          />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="mt-8 text-center text-sm text-stone-muted">
          Nenhuma compra registrada neste filtro.
        </p>
      )}

      <div className="mt-4 flex items-start gap-3 rounded-2xl bg-mint p-4">
        <Lightbulb className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
        <p className="text-sm leading-snug text-on-surface-variant">
          <strong className="text-primary">Dica do Carrinho:</strong> Ao repetir uma compra
          antiga, os preços históricos servem como estimativa para planejar o gasto de hoje.
        </p>
      </div>
    </AppShell>
  )
}
