import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const inputTypes = cva(
  "flex h-9 w-full rounded-md not-[[type=color]]:border border-input bg-transparent not-[[type=color]]:px-3 not-[[type=color]]:py-1 text-sm shadow-xs transition-colors placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      type: {
        default: 
          "",
        file:
          "file:border-0 file:bg-transparent file:text-sm file:font-medium",
        color:
          "[&::-webkit-color-swatch]:rounded-md [&::-webkit-color-swatch]:border-0 [&::-webkit-color-swatch]:border [&::-webkit-color-swatch]:border-input",

        button: "",
        checkbox: "",
        date: "",
        "datetime-local": "",
        email: "",
        hidden: "",
        image: "",
        month: "",
        number: "",
        password: "",
        radio: "",
        range: "",
        reset: "",
        search: "",
        submit: "",
        tel: "",
        text: "",
        time: "",
        url: "",
        week: "",
      },
    },
    defaultVariants: {
      type: "default"
    }
  }
)

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type">,
    VariantProps<typeof inputTypes> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(inputTypes({ type, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
