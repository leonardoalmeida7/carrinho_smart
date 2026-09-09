import { useState, useEffect, useMemo } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
  ArrowLeft,
  Calculator,
  Check,
  ListPlus,
  ShoppingBag,
  ShoppingCart,
  X,
  Zap,
} from 'lucide-react'
import { AppShell } from '../components/layout/AppShell'
import { Button } from '../components/ui/Button'
import { Stepper } from '../components/ui/Stepper'
import { useAppStore } from '../store/useAppStore'
import {
  DEFAULT_CATEGORIES,
  ITEM_SUGGESTIONS,
  suggestCategory,
} from '../lib/constants'
import { formatCurrency, itemSubtotal, parseCurrencyInput } from '../lib/format'
import type { CategoryId, Unit } from '../types'

const UNITS: Unit[] = ['un', 'kg', 'g', 'L']

export function NewItemPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const addItem = useAppStore((s) => s.addItem)
  const updateItem = useAppStore((s) => s.updateItem)
  const existing = useAppStore((s) =>
    id ? s.items.find((item) => item.id === id) : undefined,
  )

  const [name, setName] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [unit, setUnit] = useState<Unit>('un')
  const [priceRaw, setPriceRaw] = useState('')
  const [category, setCategory] = useState<CategoryId>('laticinios')

  useEffect(() => {
    if (existing) {
      setName(existing.name)
      setQuantity(existing.quantity)
      setUnit(existing.unit)
      setPriceRaw(existing.unitPrice.toFixed(2).replace('.', ','))
      setCategory(existing.category)
    }
  }, [existing])

  const unitPrice = parseCurrencyInput(priceRaw)
  const subtotal = useMemo(
    () => itemSubtotal(quantity, unitPrice),
    [quantity, unitPrice],
  )

  const applySuggestion = (suggestion: string) => {
    setName(suggestion)
    setCategory(suggestCategory(suggestion))
  }

  const save = (addAnother = false) => {
    const trimmed = name.trim()
    if (!trimmed) return

    const payload = {
      name: trimmed,
      quantity,
      unit,
      unitPrice,
      category,
    }

    if (existing) {
      updateItem(existing.id, payload)
    } else {
      addItem(payload)
    }

    if (addAnother) {
      setName('')
      setQuantity(1)
      setUnit('un')
      setPriceRaw('')
      setCategory('laticinios')
    } else {
      navigate('/')
    }
  }

  return (
    <AppShell subtitle="Novo Item" hideNav>
      <button
        type="button"
        onClick={() => navigate(-1)}
        className="mb-4 flex items-center gap-2 text-sm font-semibold text-primary"
      >
        <ArrowLeft className="h-4 w-4" />
        Voltar
      </button>

      <div className="shadow-elevated rounded-2xl border border-stone-100 bg-white p-5">
        <div className="mb-6 flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-mint">
              <ShoppingCart className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h2 className="font-display text-lg font-bold">
                {existing ? 'Editar Item' : 'Novo Item'}
              </h2>
              <p className="text-xs text-stone-muted">Preencha os detalhes do produto</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => navigate('/')}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-stone-muted hover:bg-stone-100"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <label className="mb-1 block text-sm font-semibold">
          Nome do Produto <span className="text-error">*</span>
        </label>
        <div className="relative mb-2">
          <ShoppingBag className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-muted" />
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Queijo Mussarela Fatiado"
            className="h-12 w-full rounded-xl border-[1.5px] border-stone-border bg-surface-container-low pl-10 pr-4 text-sm outline-none focus:border-primary focus:ring-[3px] focus:ring-primary-light/20"
          />
        </div>

        <div className="mb-4 flex flex-wrap items-center gap-2">
          <span className="flex items-center gap-1 text-xs font-semibold text-stone-muted">
            <Zap className="h-3.5 w-3.5 text-tertiary" />
            Sugestões:
          </span>
          {ITEM_SUGGESTIONS.slice(0, 3).map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => applySuggestion(s)}
              className="rounded-full border border-stone-border px-3 py-1 text-xs font-semibold hover:border-primary hover:text-primary"
            >
              {s}
            </button>
          ))}
        </div>

        <label className="mb-2 block text-sm font-semibold">Quantidade</label>
        <div className="mb-4">
          <Stepper
            value={quantity}
            onChange={setQuantity}
            step={unit === 'kg' || unit === 'L' ? 0.1 : 1}
            min={unit === 'un' ? 1 : 0.1}
          />
        </div>

        <label className="mb-2 block text-sm font-semibold">Unidade de Medida</label>
        <div className="mb-4 flex gap-2">
          {UNITS.map((u) => (
            <button
              key={u}
              type="button"
              onClick={() => setUnit(u)}
              className={`flex-1 rounded-xl py-2.5 text-sm font-bold transition ${
                unit === u
                  ? 'bg-primary text-white'
                  : 'bg-surface-container-low text-stone-muted hover:bg-stone-100'
              }`}
            >
              {u}
            </button>
          ))}
        </div>

        <label className="mb-1 block text-sm font-semibold">
          Preço Unitário
          <span className="ml-1 text-xs font-normal text-stone-muted">Valor da prateleira</span>
        </label>
        <div className="mb-4 flex h-12 items-center rounded-xl border-[1.5px] border-stone-border bg-surface-container-low px-4">
          <span className="mr-2 font-bold text-primary">R$</span>
          <input
            type="text"
            inputMode="decimal"
            value={priceRaw}
            onChange={(e) => setPriceRaw(e.target.value)}
            placeholder="0,00"
            className="w-full bg-transparent text-sm font-semibold tabular-nums outline-none"
          />
        </div>

        <label className="mb-2 block text-sm font-semibold">Categoria</label>
        <div className="mb-4 flex flex-wrap gap-2">
          {DEFAULT_CATEGORIES.slice(0, 3).map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setCategory(cat.id)}
              className={`rounded-full px-4 py-2 text-xs font-bold transition ${
                category === cat.id
                  ? 'bg-primary text-white'
                  : 'border border-stone-border bg-white text-stone-muted'
              }`}
            >
              {cat.icon} {cat.label}
            </button>
          ))}
        </div>

        <div className="mb-4 flex items-center justify-between rounded-xl bg-mint p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
              <Calculator className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="text-xs text-stone-muted">Subtotal deste item</p>
              <p className="text-sm font-semibold">
                {quantity} {unit} × {formatCurrency(unitPrice)}
              </p>
            </div>
          </div>
          <p className="font-display text-xl font-extrabold tabular-nums text-primary">
            {formatCurrency(subtotal)}
          </p>
        </div>

        <Button onClick={() => save(false)} size="lg" className="mb-2 w-full">
          <Check className="h-5 w-5" />
          {existing ? 'Salvar Alterações' : `Adicionar à Lista (${formatCurrency(subtotal)})`}
        </Button>

        {!existing && (
          <Button
            onClick={() => save(true)}
            variant="secondary"
            size="lg"
            className="w-full"
          >
            <ListPlus className="h-5 w-5" />
            Salvar e Adicionar Outro
          </Button>
        )}

        <p className="mt-4 flex items-center justify-center gap-1.5 text-center text-xs text-stone-muted">
          🐷 O valor atualiza automaticamente seu orçamento em tempo real
        </p>
      </div>
    </AppShell>
  )
}
