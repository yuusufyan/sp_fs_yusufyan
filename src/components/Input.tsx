import { cn } from "@/lib/utils";
import { InputHTMLAttributes } from "react";

type Props = InputHTMLAttributes<HTMLInputElement> & {
  className?: string
}

export default function Input({ className, ...props }: Props) {
  return (
    <input
      className={cn(
        "w-full px-4 py-2 border rounded-md border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500",
        className
      )}
      {...props}
    />
  )
}