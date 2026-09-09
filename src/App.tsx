import { useEffect, useState } from 'react'
import { HashRouter, Routes, Route } from 'react-router-dom'
import { ListPage } from './pages/ListPage'
import { NewItemPage } from './pages/NewItemPage'
import { HistoryPage } from './pages/HistoryPage'
import { SettingsPage } from './pages/SettingsPage'

export default function App() {
  const [isOnline, setIsOnline] = useState(() => navigator.onLine)

  useEffect(() => {
    const updateConnectionStatus = () => setIsOnline(navigator.onLine)

    window.addEventListener('online', updateConnectionStatus)
    window.addEventListener('offline', updateConnectionStatus)

    return () => {
      window.removeEventListener('online', updateConnectionStatus)
      window.removeEventListener('offline', updateConnectionStatus)
    }
  }, [])

  return (
    <>
      <div
        aria-live="polite"
        className={`fixed inset-x-3 top-3 z-50 rounded-full border px-3 py-2 text-center text-xs font-semibold shadow-sm transition-all ${
          isOnline
            ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
            : 'border-amber-200 bg-amber-50 text-amber-700'
        }`}
      >
        {isOnline ? 'Conectado • você pode sincronizar normalmente' : 'Modo offline • seus dados continuam disponíveis'}
      </div>

      <HashRouter>
        <Routes>
          <Route path="/" element={<ListPage />} />
          <Route path="/novo-item" element={<NewItemPage />} />
          <Route path="/novo-item/:id" element={<NewItemPage />} />
          <Route path="/historico" element={<HistoryPage />} />
          <Route path="/ajustes" element={<SettingsPage />} />
        </Routes>
      </HashRouter>
    </>
  )
}
