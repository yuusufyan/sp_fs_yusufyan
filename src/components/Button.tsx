import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  className?: string
  children: React.ReactNode
}

export default function Button({ className, children, ...props}: Props) {
  return (
    <button className={cn("bg-blue-600 text-white px-4 py-2 rounded", className)} {...props}>
      {children}
    </button>
  )
}