import { CheckCircle2, Circle } from 'lucide-react'
import type { ShoppingItem } from '../../types'
import { formatCurrency } from '../../lib/format'
import { ItemCard } from './ItemCard'

interface ItemSectionProps {
  title: string
  items: ShoppingItem[]
  variant: 'cart' | 'pending'
  onToggle: (id: string) => void
  onEdit: (id: string) => void
  onRemove: (id: string) => void
}

export function ItemSection({
  title,
  items,
  variant,
  onToggle,
  onEdit,
  onRemove,
}: ItemSectionProps) {
  if (items.length === 0) return null

  const subtotal = items.reduce(
    (sum, item) => sum + item.quantity * item.unitPrice,
    0,
  )

  const Icon = variant === 'cart' ? CheckCircle2 : Circle
  const badgeColor =
    variant === 'cart' ? 'bg-mint text-primary' : 'bg-surface-container text-on-surface-variant'

  return (
    <section className="mt-4">
      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon
            className={`h-4 w-4 ${variant === 'cart' ? 'text-primary' : 'text-stone-muted'}`}
          />
          <h3 className="font-display text-sm font-bold">{title}</h3>
          <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${badgeColor}`}>
            {items.length} {items.length === 1 ? 'item' : 'itens'}
          </span>
        </div>
        <span className="text-sm font-bold tabular-nums text-on-surface">
          {formatCurrency(subtotal)}
        </span>
      </div>

      <div className="space-y-2">
        {items.map((item) => (
          <ItemCard
            key={item.id}
            item={item}
            onToggle={() => onToggle(item.id)}
            onEdit={() => onEdit(item.id)}
            onRemove={() => onRemove(item.id)}
          />
        ))}
      </div>
    </section>
  )
}
