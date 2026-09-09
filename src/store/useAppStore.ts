import type { PurchaseHistory, ShoppingItem } from '../types'

function createId(): string {
  return crypto.randomUUID()
}

export interface AppStore {
  items: ShoppingItem[]
  history: PurchaseHistory[]
  settings: {
    budgetPerTrip: number
    budgetAlertEnabled: boolean
    monthlyBudget: number
    checkoutDiscount: number
    bagFee: number
    hapticFeedback: boolean
    keepScreenOn: boolean
  }
  addItem: (item: Omit<ShoppingItem, 'id' | 'createdAt' | 'inCart'> & { inCart?: boolean }) => void
  updateItem: (id: string, updates: Partial<ShoppingItem>) => void
  removeItem: (id: string) => void
  toggleItemInCart: (id: string) => void
  clearList: () => void
  finishPurchase: (storeName?: string) => void
  repeatList: (historyId: string) => void
  updateSettings: (updates: Partial<AppStore['settings']>) => void
  getListTotal: () => number
  getCartTotal: () => number
  getPendingTotal: () => number
  getItemCount: () => number
}

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { itemSubtotal } from '../lib/format'

export const useAppStore = create<AppStore>()(
  persist(
    (set, get) => ({
      items: [],
      history: [],
      settings: {
        budgetPerTrip: 200,
        budgetAlertEnabled: true,
        monthlyBudget: 1200,
        checkoutDiscount: 5,
        bagFee: 0.35,
        hapticFeedback: true,
        keepScreenOn: true,
      },
      addItem: (item) =>
        set((state) => ({
          items: [
            {
              ...item,
              id: createId(),
              inCart: item.inCart ?? false,
              createdAt: Date.now(),
            },
            ...state.items,
          ],
        })),

      updateItem: (id, updates) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id ? { ...item, ...updates } : item,
          ),
        })),

      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        })),

      toggleItemInCart: (id) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id ? { ...item, inCart: !item.inCart } : item,
          ),
        })),

      clearList: () => set({ items: [] }),

      finishPurchase: (storeName = 'Supermercado') => {
        const state = get()
        if (state.items.length === 0) return

        const discount = state.settings.checkoutDiscount / 100
        const subtotal = state.getListTotal()
        const total =
          Math.round((subtotal * (1 - discount) + state.settings.bagFee) * 100) / 100

        const purchase: PurchaseHistory = {
          id: createId(),
          storeName,
          storeType: 'hipermercado',
          date: new Date().toISOString(),
          items: state.items.map((i) => ({ ...i })),
          total,
          tag: total <= state.settings.budgetPerTrip ? 'dentro' : 'compra-mes',
        }

        set({
          history: [purchase, ...state.history],
          items: [],
        })
      },

      repeatList: (historyId) => {
        const purchase = get().history.find((h) => h.id === historyId)
        if (!purchase || purchase.items.length === 0) return

        const cloned = purchase.items.map((item) => ({
          ...item,
          id: createId(),
          inCart: false,
          createdAt: Date.now(),
        }))
        set((state) => ({ items: [...cloned, ...state.items] }))
      },

      updateSettings: (updates) =>
        set((state) => ({
          settings: { ...state.settings, ...updates },
        })),

      getListTotal: () =>
        get().items.reduce(
          (sum, item) => sum + itemSubtotal(item.quantity, item.unitPrice),
          0,
        ),

      getCartTotal: () =>
        get()
          .items.filter((i) => i.inCart)
          .reduce((sum, item) => sum + itemSubtotal(item.quantity, item.unitPrice), 0),

      getPendingTotal: () =>
        get()
          .items.filter((i) => !i.inCart)
          .reduce((sum, item) => sum + itemSubtotal(item.quantity, item.unitPrice), 0),

      getItemCount: () =>
        get().items.reduce((sum, item) => sum + item.quantity, 0),
    }),
    {
      name: 'carrinho-smart-storage',
      partialize: (state) => ({
        items: state.items,
        history: state.history,
        settings: state.settings,
      }),
    },
  ),
)
