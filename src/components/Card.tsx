import { ReactNode } from "react"
import { cn } from "@/lib/utils"

type CardProps = {
  children: ReactNode
  className?: string
}

export default function Card({ children, className }: CardProps) {
  return (
    <div className={cn("bg-white p-6 rounded-xl shadow-md", className)}>
      {children}
    </div>
  )
}