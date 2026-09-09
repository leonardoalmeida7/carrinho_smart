export type Unit = 'un' | 'kg' | 'g' | 'L'

export type CategoryId =
  | 'hortifruti'
  | 'laticinios'
  | 'padaria'
  | 'acougue'
  | 'limpeza'
  | 'bebidas'

export type StoreType = 'hipermercado' | 'hortifruti' | 'outros'

export type HistoryTag = 'dentro' | 'compra-mes' | 'feira-fresca'

export type ListFilter = 'todos' | 'no-carrinho' | 'pendentes'

export interface CategoryConfig {
  id: CategoryId
  label: string
  icon: string
  color: string
}

export interface ShoppingItem {
  id: string
  name: string
  quantity: number
  unit: Unit
  unitPrice: number
  category: CategoryId
  inCart: boolean
  createdAt: number
}

export interface PurchaseHistory {
  id: string
  storeName: string
  storeType: StoreType
  date: string
  items: ShoppingItem[]
  total: number
  tag: HistoryTag
}

export interface AppSettings {
  budgetPerTrip: number
  budgetAlertEnabled: boolean
  monthlyBudget: number
  checkoutDiscount: number
  bagFee: number
  hapticFeedback: boolean
  keepScreenOn: boolean
}

export interface QuickAddDraft {
  name: string
  quantity: number
  unitPrice: number
}
