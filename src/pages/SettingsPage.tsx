import { useState } from 'react'
import {
  ArrowLeft,
  Lock,
  Percent,
  PiggyBank,
  Shapes,
  ShoppingBag,
  SlidersHorizontal,
  Tag,
  Wallet,
} from 'lucide-react'
import { AppShell } from '../components/layout/AppShell'
import { Button } from '../components/ui/Button'
import { ProgressBar } from '../components/ui/ProgressBar'
import { Toggle } from '../components/ui/Toggle'
import { useAppStore } from '../store/useAppStore'
import { DEFAULT_CATEGORIES } from '../lib/constants'
import { formatCurrency, parseCurrencyInput } from '../lib/format'

export function SettingsPage() {
  const settings = useAppStore((s) => s.settings)
  const updateSettings = useAppStore((s) => s.updateSettings)
  const [budgetRaw, setBudgetRaw] = useState(settings.budgetPerTrip.toFixed(2).replace('.', ','))
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    updateSettings({
      budgetPerTrip: parseCurrencyInput(budgetRaw) || settings.budgetPerTrip,
    })
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <AppShell subtitle="Configurações">
      <section className="relative overflow-hidden rounded-2xl bg-primary p-5 text-white">
        <div className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wide opacity-80">
          <ArrowLeft className="h-3.5 w-3.5" />
          Modo Inteligente
        </div>
        <div className="flex items-start justify-between">
          <div>
            <h2 className="font-display text-xl font-bold">Controle Total do Carrinho</h2>
            <p className="mt-1 text-sm opacity-90">
              Ajuste seu teto de gastos e personalize sua experiência no supermercado.
            </p>
          </div>
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/20">
            <Wallet className="h-6 w-6" />
          </div>
        </div>
      </section>

      <section className="mt-4 shadow-card rounded-2xl border border-stone-100 bg-white p-4">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="flex items-center gap-2 font-display text-sm font-bold">
            <PiggyBank className="h-4 w-4 text-primary" />
            Meta de Gasto por Compra
          </h3>
          <span className="rounded-full bg-mint px-2 py-0.5 text-[10px] font-bold text-primary">
            Ativo
          </span>
        </div>

        <Toggle
          checked={settings.budgetAlertEnabled}
          onChange={(v) => updateSettings({ budgetAlertEnabled: v })}
          label="Alerta de Teto Máximo"
        />

        <div className="mt-2 flex items-center justify-between rounded-xl bg-surface-container-low p-3">
          <div>
            <p className="text-xs text-stone-muted">Limite atual por compra</p>
            <p className="font-display text-lg font-bold tabular-nums text-primary">
              {formatCurrency(settings.budgetPerTrip)}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="text"
              inputMode="decimal"
              value={budgetRaw}
              onChange={(e) => setBudgetRaw(e.target.value)}
              className="w-20 rounded-lg border border-stone-border bg-white px-2 py-1 text-sm font-semibold tabular-nums outline-none focus:border-primary"
            />
            <button
              type="button"
              className="rounded-lg bg-mint px-3 py-1.5 text-xs font-bold text-primary"
            >
              Ajustar
            </button>
          </div>
        </div>

        <div className="mt-4">
          <ProgressBar percent={80} showThresholds />
        </div>
      </section>

      <section className="mt-4 shadow-card rounded-2xl border border-stone-100 bg-white p-4">
        <h3 className="mb-3 flex items-center gap-2 font-display text-sm font-bold">
          <Percent className="h-4 w-4 text-primary" />
          Descontos e Taxas Adicionais
        </h3>

        <div className="space-y-3">
          <div className="flex items-center justify-between gap-3 rounded-xl bg-surface-container-low p-3">
            <div className="flex items-center gap-3">
              <Tag className="h-5 w-5 text-stone-muted" />
              <div>
                <p className="text-sm font-semibold">Desconto no Caixa</p>
                <p className="text-xs text-stone-muted">Clube fidelidade ou cupom</p>
              </div>
            </div>
            <input
              type="number"
              value={settings.checkoutDiscount}
              onChange={(e) =>
                updateSettings({ checkoutDiscount: Number(e.target.value) || 0 })
              }
              className="w-16 rounded-lg border border-stone-border bg-white px-2 py-1 text-center text-sm font-bold outline-none focus:border-primary"
            />
            <span className="text-sm font-bold">%</span>
          </div>

          <div className="flex items-center justify-between gap-3 rounded-xl bg-surface-container-low p-3">
            <div className="flex items-center gap-3">
              <ShoppingBag className="h-5 w-5 text-stone-muted" />
              <div>
                <p className="text-sm font-semibold">Taxa de Sacolas / Entrega</p>
                <p className="text-xs text-stone-muted">Cobrado à parte na comanda</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-sm font-bold text-primary">R$</span>
              <input
                type="text"
                inputMode="decimal"
                value={settings.bagFee.toFixed(2).replace('.', ',')}
                onChange={(e) =>
                  updateSettings({ bagFee: parseCurrencyInput(e.target.value) })
                }
                className="w-16 rounded-lg border border-stone-border bg-white px-2 py-1 text-center text-sm font-bold tabular-nums outline-none focus:border-primary"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="mt-4 shadow-card rounded-2xl border border-stone-100 bg-white p-4">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="flex items-center gap-2 font-display text-sm font-bold">
            <Shapes className="h-4 w-4 text-primary" />
            Gerenciar Categorias
          </h3>
          <button type="button" className="text-xs font-bold text-primary">
            + Nova
          </button>
        </div>
        <p className="mb-3 text-xs text-stone-muted">
          Toque para personalizar ícones ou tags de identificação nas gôndolas.
        </p>
        <div className="grid grid-cols-2 gap-2">
          {DEFAULT_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              type="button"
              className="flex items-center gap-2 rounded-xl border border-stone-border bg-white px-3 py-3 text-left text-sm font-semibold hover:border-primary/30"
            >
              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: cat.color }}
              />
              {cat.label}
            </button>
          ))}
        </div>
      </section>

      <section className="mt-4 shadow-card rounded-2xl border border-stone-100 bg-white p-4">
        <h3 className="mb-1 flex items-center gap-2 font-display text-sm font-bold">
          <SlidersHorizontal className="h-4 w-4 text-primary" />
          Preferências no Supermercado
        </h3>

        <Toggle
          checked={settings.hapticFeedback}
          onChange={(v) => updateSettings({ hapticFeedback: v })}
          label="Vibrar ao Marcar Item"
          description="Confirmação tátil instantânea no corredor"
        />
        <Toggle
          checked={settings.keepScreenOn}
          onChange={(v) => updateSettings({ keepScreenOn: v })}
          label="Manter Tela Ligada"
          description="Evita bloqueio automático durante as compras"
        />

        <div className="flex items-center justify-between border-t border-stone-100 py-3">
          <div>
            <p className="text-sm font-semibold">Moeda Principal</p>
            <p className="text-xs text-stone-muted">Padrão nacional brasileiro</p>
          </div>
          <div className="flex items-center gap-2 text-sm font-semibold text-stone-muted">
            Real (R$)
            <Lock className="h-4 w-4" />
          </div>
        </div>
      </section>

      <div className="mt-6 pb-4">
        <Button onClick={handleSave} size="lg" className="w-full">
          ✓ {saved ? 'Preferências Salvas!' : 'Salvar Preferências'}
        </Button>
      </div>
    </AppShell>
  )
}
