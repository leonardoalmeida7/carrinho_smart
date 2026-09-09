import { NavLink } from 'react-router-dom'
import { ShoppingCart, Receipt, SlidersHorizontal } from 'lucide-react'

const tabs = [
  { to: '/', label: 'Lista', icon: ShoppingCart },
  { to: '/historico', label: 'Histórico', icon: Receipt },
  { to: '/ajustes', label: 'Ajustes', icon: SlidersHorizontal },
]

export function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-stone-border bg-white pb-[env(safe-area-inset-bottom)] shadow-bar">
      <div className="mx-auto flex max-w-lg items-center justify-around px-4 py-2">
        {tabs.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              `flex flex-col items-center gap-0.5 px-4 py-2 text-xs font-semibold transition-colors ${
                isActive ? 'text-primary' : 'text-stone-muted'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <Icon className={`h-5 w-5 ${isActive ? 'text-primary' : ''}`} />
                {label}
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  )
}
