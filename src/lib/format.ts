const currencyFormatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
})

export function formatCurrency(value: number): string {
  return currencyFormatter.format(value)
}

export function formatCurrencyCompact(value: number): string {
  return formatCurrency(value).replace(/\s/g, ' ')
}

export function parseCurrencyInput(raw: string): number {
  const cleaned = raw.replace(/[^\d,.-]/g, '').replace(',', '.')
  const parsed = parseFloat(cleaned)
  return Number.isFinite(parsed) ? parsed : 0
}

export function formatQuantity(quantity: number, unit: string): string {
  const formatted = Number.isInteger(quantity)
    ? quantity.toString()
    : quantity.toLocaleString('pt-BR', { maximumFractionDigits: 2 })
  return `${formatted} ${unit}`
}

export function itemSubtotal(quantity: number, unitPrice: number): number {
  return Math.round(quantity * unitPrice * 100) / 100
}

export function formatDatePtBR(isoDate: string): string {
  const date = new Date(isoDate)
  return date.toLocaleDateString('pt-BR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export function formatMonthYear(date: Date): string {
  const formatted = date.toLocaleDateString('pt-BR', {
    month: 'long',
    year: 'numeric',
  })
  return formatted.charAt(0).toUpperCase() + formatted.slice(1)
}

export function budgetProgressColor(percent: number): string {
  if (percent >= 100) return 'bg-error'
  if (percent >= 90) return 'bg-tertiary'
  if (percent >= 80) return 'bg-primary-light'
  return 'bg-primary'
}
