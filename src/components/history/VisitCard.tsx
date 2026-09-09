import { Copy, FileText, Share2, Store } from 'lucide-react'
import type { HistoryTag, PurchaseHistory } from '../../types'
import { formatCurrency, formatDatePtBR } from '../../lib/format'
import { exportPdf, shareViaWhatsApp } from '../../lib/share'
import { Button } from '../ui/Button'

const tagStyles: Record<HistoryTag, { label: string; className: string }> = {
  dentro: { label: 'Dentro', className: 'bg-mint text-primary' },
  'compra-mes': { label: 'Compra do Mês', className: 'bg-purple-100 text-purple-700' },
  'feira-fresca': { label: 'Feira Fresca', className: 'bg-orange-100 text-orange-700' },
}

interface VisitCardProps {
  purchase: PurchaseHistory
  onRepeat: () => void
}

export function VisitCard({ purchase, onRepeat }: VisitCardProps) {
  const tag = tagStyles[purchase.tag]
  const itemCount = purchase.items.length || 24

  return (
    <article className="shadow-card rounded-2xl border border-stone-100 bg-white p-4">
      <div className="flex items-start gap-3">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-surface-container">
          <Store className="h-6 w-6 text-stone-muted" />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="font-display text-sm font-bold">{purchase.storeName}</h3>
              <p className="text-xs text-stone-muted">
                {formatDatePtBR(purchase.date)} • {itemCount} itens
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm font-bold tabular-nums">{formatCurrency(purchase.total)}</p>
              <span className={`mt-1 inline-block rounded-full px-2 py-0.5 text-[10px] font-bold ${tag.className}`}>
                {tag.label}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-3 flex gap-2">
        <button
          type="button"
          onClick={() => shareViaWhatsApp(purchase)}
          className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-stone-border py-2.5 text-xs font-semibold text-stone-muted hover:bg-stone-50"
        >
          <Share2 className="h-3.5 w-3.5" />
          WhatsApp
        </button>
        <button
          type="button"
          onClick={() => exportPdf(purchase)}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-stone-border text-stone-muted hover:bg-stone-50"
          aria-label="Exportar PDF"
        >
          <FileText className="h-4 w-4" />
        </button>
        <Button onClick={onRepeat} size="sm" className="flex-[2]">
          <Copy className="h-4 w-4" />
          Repetir lista
        </Button>
      </div>
    </article>
  )
}
