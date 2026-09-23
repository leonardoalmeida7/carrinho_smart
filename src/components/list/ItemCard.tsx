import { MoreVertical, Pencil } from 'lucide-react'
import type { ShoppingItem } from '../../types'
import { formatCurrency, formatQuantity, itemSubtotal } from '../../lib/format'
//import { DEFAULT_CATEGORIES } from '../../lib/constants'
import { Checkbox } from '../ui/Checkbox'

interface ItemCardProps {
  item: ShoppingItem
  onToggle: () => void
  onEdit: () => void
  onRemove: () => void
}

export function ItemCard({ item, onToggle, onEdit, onRemove }: ItemCardProps) {
  const subtotal = itemSubtotal(item.quantity, item.unitPrice)
  // const category = DEFAULT_CATEGORIES.find((c) => c.id === item.category)

  return (
    <div
      className={`flex items-center gap-3 rounded-2xl border p-3 transition-colors ${
        item.inCart
          ? 'border-stone-100 bg-slate-50'
          : 'border-stone-100 bg-white shadow-card'
      }`}
    >
      <Checkbox checked={item.inCart} onChange={onToggle} label={item.name} />

      <div className="min-w-0 flex-1">
        <p
          className={`truncate font-display text-sm font-semibold ${
            item.inCart ? 'text-stone-muted line-through' : 'text-on-surface'
          }`}
        >
          {/* {category?.icon} */} {item.name}
        </p>
        <p className="text-xs text-stone-muted">
          {formatQuantity(item.quantity, item.unit)} × {formatCurrency(item.unitPrice)}
        </p>
      </div>

      <div className="flex items-center gap-1">
        <span
          className={`text-sm font-bold tabular-nums ${
            item.inCart ? 'text-stone-muted' : 'text-primary'
          }`}
        >
          {formatCurrency(subtotal)}
        </span>

        {item.inCart ? (
          <button
            type="button"
            onClick={onRemove}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-stone-muted hover:bg-stone-100"
            aria-label="Mais opções"
          >
            <MoreVertical className="h-4 w-4" />
          </button>
        ) : (
          <button
            type="button"
            onClick={onEdit}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-primary hover:bg-mint"
            aria-label="Editar"
          >
            <Pencil className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  )
}
