import { ShoppingCart, FileText, User } from 'lucide-react'

interface HeaderProps {
  subtitle: string
}


export function Header({ subtitle }: HeaderProps) {
  function futureTool(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault()
    alert('Esta funcionalidade ainda não está disponível')
    return false
  }
  return (
    <header className="flex items-center justify-between px-4 pt-4 pb-2">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
          <ShoppingCart className="h-5 w-5 text-white" />
        </div>
        <div>
          <h1 className="font-display text-base font-bold leading-tight text-on-surface">
            Carrinho Smart
          </h1>
          <p className="text-xs text-stone-muted">{subtitle}</p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <span className="hidden rounded-full bg-secondary-container/40 px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-primary sm:inline">
          Compras da Semana
        </span>
        <button
          type="button"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-stone-border bg-white"
          aria-label="Documentos"
          onClick={futureTool}
        >
          <FileText className="h-4 w-4 text-stone-muted" />
        </button>
        <button
          type="button"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-stone-border bg-white"
          aria-label="Perfil"
          onClick={futureTool}
        >
          <User className="h-4 w-4 text-stone-muted" />
        </button>
      </div>
    </header>
  )
}
