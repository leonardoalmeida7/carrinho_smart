import { Chip } from '../ui/Chip'
import type { ListFilter } from '../../types'

interface FilterChipsProps {
  active: ListFilter
  onChange: (filter: ListFilter) => void
  counts: { todos: number; noCarrinho: number; pendentes: number }
}

export function FilterChips({ active, onChange, counts }: FilterChipsProps) {
  return (
    <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
      <Chip
        label="Todos"
        count={counts.todos}
        active={active === 'todos'}
        onClick={() => onChange('todos')}
      />
      <Chip
        label="No Carrinho"
        count={counts.noCarrinho}
        active={active === 'no-carrinho'}
        onClick={() => onChange('no-carrinho')}
      />
      <Chip
        label="Pendentes"
        count={counts.pendentes}
        active={active === 'pendentes'}
        onClick={() => onChange('pendentes')}
      />
    </div>
  )
}
