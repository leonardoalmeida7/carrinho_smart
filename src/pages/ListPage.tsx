import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppShell } from '../components/layout/AppShell'
import { BudgetPanel } from '../components/list/BudgetPanel'
import { QuickAddBar } from '../components/list/QuickAddBar'
import { FilterChips } from '../components/list/FilterChips'
import { ItemSection } from '../components/list/ItemSection'
import { SavingsBanner } from '../components/list/SavingsBanner'
import { ListFooter } from '../components/list/ListFooter'
import { useAppStore } from '../store/useAppStore'
import { useHapticFeedback } from '../hooks/useDeviceFeatures'
import type { ListFilter } from '../types'

export function ListPage() {
  const navigate = useNavigate()
  const vibrate = useHapticFeedback()
  const items = useAppStore((s) => s.items)
  const toggleItemInCart = useAppStore((s) => s.toggleItemInCart)
  const removeItem = useAppStore((s) => s.removeItem)
  const finishPurchase = useAppStore((s) => s.finishPurchase)
  const settings = useAppStore((s) => s.settings)
  const getListTotal = useAppStore((s) => s.getListTotal)

  const [filter, setFilter] = useState<ListFilter>('todos')

  const inCart = useMemo(() => items.filter((i) => i.inCart), [items])
  const pending = useMemo(() => items.filter((i) => !i.inCart), [items])

  const counts = {
    todos: items.length,
    noCarrinho: inCart.length,
    pendentes: pending.length,
  }

  const handleToggle = (id: string) => {
    toggleItemInCart(id)
    vibrate(15)
  }

  const handleFinish = () => {
    const total = getListTotal()
    if (settings.budgetAlertEnabled && total > settings.budgetPerTrip) {
      const ok = confirm(
        `O total (${total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}) excede sua meta de ${settings.budgetPerTrip.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}. Finalizar mesmo assim?`,
      )
      if (!ok) return
    }
    finishPurchase()
    navigate('/historico')
  }

  const showCart = filter === 'todos' || filter === 'no-carrinho'
  const showPending = filter === 'todos' || filter === 'pendentes'

  return (
    <AppShell subtitle="Lista de Compras" footer={<ListFooter onFinish={handleFinish} />}>
      <BudgetPanel />
      <QuickAddBar />
      <FilterChips active={filter} onChange={setFilter} counts={counts} />

      {showCart && (
        <ItemSection
          title="No Carrinho"
          items={inCart}
          variant="cart"
          onToggle={handleToggle}
          onEdit={(id) => navigate(`/novo-item/${id}`)}
          onRemove={removeItem}
        />
      )}

      {showPending && (
        <ItemSection
          title="Pendentes"
          items={pending}
          variant="pending"
          onToggle={handleToggle}
          onEdit={(id) => navigate(`/novo-item/${id}`)}
          onRemove={removeItem}
        />
      )}

      {items.length === 0 && (
        <div className="mt-8 text-center text-sm text-stone-muted">
          Sua lista está vazia. Use a adição rápida ou adicione um item detalhado.
        </div>
      )}

      <SavingsBanner />
    </AppShell>
  )
}
