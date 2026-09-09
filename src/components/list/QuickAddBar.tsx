import { useState } from 'react'
import { Plus, ScanLine } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useAppStore } from '../../store/useAppStore'
import { suggestCategory } from '../../lib/constants'
import { parseCurrencyInput } from '../../lib/format'
import { Button } from '../ui/Button'
import { Stepper } from '../ui/Stepper'

export function QuickAddBar() {
  const addItem = useAppStore((s) => s.addItem)
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [priceRaw, setPriceRaw] = useState('')

  const handleInsert = () => {
    const trimmed = name.trim()
    if (!trimmed) return

    const unitPrice = parseCurrencyInput(priceRaw)
    addItem({
      name: trimmed,
      quantity,
      unit: 'un',
      unitPrice: unitPrice || 0,
      category: suggestCategory(trimmed),
    })

    setName('')
    setQuantity(1)
    setPriceRaw('')
  }

  return (
    <section className="mt-4 shadow-card rounded-2xl border border-stone-100 bg-white p-4">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="flex items-center gap-2 font-display text-sm font-bold text-on-surface">
          <Plus className="h-4 w-4 text-primary" />
          Adição Rápida
        </h2>
        <button
          type="button"
          className="flex items-center gap-1 text-xs font-semibold text-primary"
          onClick={() => alert('Scanner de código de barras em breve!')}
        >
          <ScanLine className="h-4 w-4" />
          Escanear
        </button>
      </div>

      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Nome do produto (ex: Leite Desnatado 1L)"
        className="mb-3 h-12 w-full rounded-xl border-[1.5px] border-stone-border bg-surface-container-low px-4 text-sm outline-none focus:border-primary focus:ring-[3px] focus:ring-primary-light/20"
        onKeyDown={(e) => e.key === 'Enter' && handleInsert()}
      />

      <div className="flex flex-wrap items-center gap-2">
        <Stepper value={quantity} onChange={setQuantity} unit="un" compact />

        <div className="flex h-12 flex-1 min-w-[100px] items-center rounded-xl border-[1.5px] border-stone-border bg-surface-container-low px-3">
          <span className="mr-1 text-sm font-semibold text-primary">R$</span>
          <input
            type="text"
            inputMode="decimal"
            value={priceRaw}
            onChange={(e) => setPriceRaw(e.target.value)}
            placeholder="0,00"
            className="w-full bg-transparent text-sm font-semibold tabular-nums outline-none"
          />
        </div>

        <Button onClick={handleInsert} size="sm" className="shrink-0">
          <Plus className="h-4 w-4" />
          Inserir
        </Button>
      </div>

      <button
        type="button"
        onClick={() => navigate('/novo-item')}
        className="mt-3 w-full text-center text-xs font-semibold text-primary underline-offset-2 hover:underline"
      >
        Adicionar com mais detalhes →
      </button>
    </section>
  )
}
