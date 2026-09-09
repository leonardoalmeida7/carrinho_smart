import type { ReactNode } from 'react'
import { Header } from './Header'
import { BottomNav } from './BottomNav'
import { useWakeLock } from '../../hooks/useDeviceFeatures'

interface AppShellProps {
  subtitle: string
  children: ReactNode
  hideNav?: boolean
  footer?: ReactNode
}

export function AppShell({ subtitle, children, hideNav, footer }: AppShellProps) {
  useWakeLock()

  return (
    <div className="mx-auto min-h-dvh max-w-lg bg-surface">
      <Header subtitle={subtitle} />
      <main className={`px-4 ${hideNav ? 'pb-8' : 'pb-36'}`}>{children}</main>
      {footer}
      {!hideNav && <BottomNav />}
    </div>
  )
}
