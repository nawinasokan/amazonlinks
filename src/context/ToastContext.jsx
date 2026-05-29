import { createContext, useCallback, useContext, useRef, useState } from 'react'
import { CheckCircle2, Info, X } from 'lucide-react'

const ToastContext = createContext(null)

let nextId = 1

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])
  const timers = useRef({})

  const dismiss = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
    if (timers.current[id]) {
      clearTimeout(timers.current[id])
      delete timers.current[id]
    }
  }, [])

  const showToast = useCallback(
    (message, type = 'success', duration = 2600) => {
      const id = nextId++
      setToasts((prev) => [...prev, { id, message, type }])
      timers.current[id] = setTimeout(() => dismiss(id), duration)
      return id
    },
    [dismiss],
  )

  return (
    <ToastContext.Provider value={{ showToast, dismiss }}>
      {children}

      {/* Toast viewport */}
      <div className="pointer-events-none fixed inset-x-0 bottom-20 z-[60] flex flex-col items-center gap-2 px-4 sm:bottom-6">
        {toasts.map((t) => (
          <div
            key={t.id}
            role="status"
            className="animate-slide-up pointer-events-auto flex w-full max-w-sm items-center gap-3 rounded-xl bg-amazon-dark px-4 py-3 text-sm font-medium text-white shadow-card-hover"
          >
            {t.type === 'info' ? (
              <Info className="h-5 w-5 shrink-0 text-amazon-orange" />
            ) : (
              <CheckCircle2 className="h-5 w-5 shrink-0 text-green-400" />
            )}
            <span className="flex-1">{t.message}</span>
            <button
              type="button"
              onClick={() => dismiss(t.id)}
              aria-label="Dismiss notification"
              className="shrink-0 rounded p-1 text-white/70 transition hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used within a ToastProvider')
  return ctx
}

export default ToastContext
