import type { PurchaseHistory } from '../types'
import { formatCurrency, formatDatePtBR } from './format'

export function buildReceiptText(purchase: PurchaseHistory): string {
  const lines = [
    '🛒 Carrinho Smart — Recibo',
    `Loja: ${purchase.storeName}`,
    `Data: ${formatDatePtBR(purchase.date)}`,
    '─'.repeat(32),
  ]

  if (purchase.items.length > 0) {
    purchase.items.forEach((item) => {
      const sub = item.quantity * item.unitPrice
      lines.push(`${item.name}`)
      lines.push(`  ${item.quantity} ${item.unit} × ${formatCurrency(item.unitPrice)} = ${formatCurrency(sub)}`)
    })
  } else {
    lines.push('(Itens não detalhados neste registro)')
  }

  lines.push('─'.repeat(32))
  lines.push(`TOTAL: ${formatCurrency(purchase.total)}`)
  lines.push('')
  lines.push('Gerado pelo Carrinho Smart')

  return lines.join('\n')
}

export async function shareViaWhatsApp(purchase: PurchaseHistory) {
  const text = encodeURIComponent(buildReceiptText(purchase))
  window.open(`https://wa.me/?text=${text}`, '_blank', 'noopener,noreferrer')
}

export function exportPdf(purchase: PurchaseHistory) {
  const text = buildReceiptText(purchase)
  const html = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <title>Recibo — ${purchase.storeName}</title>
  <style>
    body { font-family: Inter, sans-serif; padding: 2rem; max-width: 480px; margin: 0 auto; }
    h1 { color: #006948; font-size: 1.25rem; }
    pre { white-space: pre-wrap; line-height: 1.6; font-size: 14px; }
  </style>
</head>
<body>
  <h1>Carrinho Smart</h1>
  <pre>${text}</pre>
  <script>window.onload = () => window.print()</script>
</body>
</html>`

  const win = window.open('', '_blank')
  if (win) {
    win.document.write(html)
    win.document.close()
  }
}

export async function shareList(items: { name: string; quantity: number; unit: string; unitPrice: number; inCart: boolean }[]) {
  const lines = items.map(
    (i) => `${i.inCart ? '✅' : '⬜'} ${i.name} — ${i.quantity} ${i.unit} × R$ ${i.unitPrice.toFixed(2).replace('.', ',')}`,
  )
  const text = `🛒 Minha Lista — Carrinho Smart\n\n${lines.join('\n')}`

  if (navigator.share) {
    await navigator.share({ title: 'Lista de Compras', text })
  } else {
    await navigator.clipboard.writeText(text)
    alert('Lista copiada para a área de transferência!')
  }
}
