import { ShoppingCart, Trash2, Share2 } from 'lucide-react'
import { useAppStore } from '../../store/useAppStore'
import { formatCurrency } from '../../lib/format'
import { shareList } from '../../lib/share'
import { Button } from '../ui/Button'

interface ListFooterProps {
  onFinish: () => void
}

export function ListFooter({ onFinish }: ListFooterProps) {
  const items = useAppStore((s) => s.items)
  const clearList = useAppStore((s) => s.clearList)
  const total = useAppStore((s) => s.getListTotal())

  const handleShare = async () => {
    await shareList(items)
  }

  const handleClear = () => {
    if (items.length === 0) return
    if (confirm('Deseja limpar toda a lista?')) clearList()
  }

  return (
    <div className="fixed bottom-[calc(4.5rem+env(safe-area-inset-bottom))] left-0 right-0 z-40 mx-auto max-w-lg px-4">
      <Button
        onClick={onFinish}
        size="lg"
        className="w-full justify-between shadow-bar"
        disabled={items.length === 0}
      >
        <span className="flex items-center gap-2">
          <ShoppingCart className="h-5 w-5" />
          Finalizar Compra
        </span>
        <span className="rounded-full bg-primary-container/30 px-3 py-1 text-sm font-bold tabular-nums">
          {formatCurrency(total)}
        </span>
      </Button>

      <div className="mt-2 flex justify-center gap-6 pb-2">
        <button
          type="button"
          onClick={handleClear}
          className="flex items-center gap-1.5 text-xs font-semibold text-stone-muted hover:text-error"
        >
          <Trash2 className="h-3.5 w-3.5" />
          Limpar Lista
        </button>
        <button
          type="button"
          onClick={handleShare}
          className="flex items-center gap-1.5 text-xs font-semibold text-stone-muted hover:text-primary"
        >
          <Share2 className="h-3.5 w-3.5" />
          Compartilhar Lista
        </button>
      </div>
    </div>
  )
}
