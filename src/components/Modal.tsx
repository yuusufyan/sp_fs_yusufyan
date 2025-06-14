import { ReactNode } from "react"
import { cn } from "@/lib/utils"

type Props = {
  open: boolean
  title?: string
  children: ReactNode
  onClose: () => void
  className?: string
}

export default function Modal({ open, title, children, onClose, className }: Props) {
  if (!open) return null

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className={cn("bg-white p-6 rounded-lg shadow-lg w-full max-w-sm text-center space-y-4", className)}>
        {title && <h2 className="text-xl font-semibold">{title}</h2>}
        {children}
        <button
          onClick={onClose}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          OK
        </button>
      </div>
    </div>
  )
}
