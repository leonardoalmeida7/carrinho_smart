import type { CategoryId } from '../types'

/* export const DEFAULT_CATEGORIES: {
  id: CategoryId
  label: string
  icon?: string
  color: string
}[] = [
  { id: 'hortifruti', label: 'Hortifrúti', icon: '🍎', color: '#059669' },
  { id: 'padaria', label: 'Padaria', icon: '🍞', color: '#92400e' },
  { id: 'acougue', label: 'Açougue', icon: '🥩', color: '#dc2626' },
  { id: 'laticinios', label: 'Laticínios', icon: '🧀', color: '#059669' },
  { id: 'limpeza', label: 'Limpeza', icon: '🧹', color: '#6b7280' },
  { id: 'bebidas', label: 'Bebidas', icon: '🥤', color: '#059669' },
]
 */
export const ITEM_SUGGESTIONS = [
  'Leite',
  'Pão francês',
  'Café',
  'Arroz',
  'Feijão',
  'Banana',
  'Ovos',
  'Queijo',
  'Detergente',
  'Sabonete',
]

export const CATEGORY_SUGGESTIONS: Record<string, CategoryId> = {
  Leite: 'laticinios',
  'Pão francês': 'padaria',
  Café: 'bebidas',
  Arroz: 'padaria',
  Feijão: 'padaria',
  Banana: 'hortifruti',
  Ovos: 'laticinios',
  Queijo: 'laticinios',
  Detergente: 'limpeza',
  Sabonete: 'limpeza',
}

export function suggestCategory(name: string): CategoryId {
  const key = Object.keys(CATEGORY_SUGGESTIONS).find(
    (s) => s.toLowerCase() === name.toLowerCase(),
  )
  return key ? CATEGORY_SUGGESTIONS[key] : 'laticinios'
}
