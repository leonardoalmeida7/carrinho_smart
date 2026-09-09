import { useEffect, useRef } from 'react'
import { useAppStore } from '../store/useAppStore'

export function useWakeLock() {
  const keepScreenOn = useAppStore((s) => s.settings.keepScreenOn)
  const wakeLockRef = useRef<WakeLockSentinel | null>(null)

  useEffect(() => {
    if (!keepScreenOn || !('wakeLock' in navigator)) return

    let cancelled = false

    const requestLock = async () => {
      try {
        wakeLockRef.current = await navigator.wakeLock.request('screen')
        wakeLockRef.current.addEventListener('release', () => {
          if (!cancelled && keepScreenOn) requestLock()
        })
      } catch {
        /* Wake Lock unavailable */
      }
    }

    requestLock()

    const onVisibility = () => {
      if (document.visibilityState === 'visible' && keepScreenOn) requestLock()
    }
    document.addEventListener('visibilitychange', onVisibility)

    return () => {
      cancelled = true
      document.removeEventListener('visibilitychange', onVisibility)
      wakeLockRef.current?.release().catch(() => {})
      wakeLockRef.current = null
    }
  }, [keepScreenOn])
}

export function useHapticFeedback() {
  const enabled = useAppStore((s) => s.settings.hapticFeedback)

  return (pattern: number | number[] = 15) => {
    if (enabled && 'vibrate' in navigator) {
      navigator.vibrate(pattern)
    }
  }
}
