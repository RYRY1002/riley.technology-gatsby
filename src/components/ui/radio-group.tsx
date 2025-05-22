import * as React from "react"
import { CheckIcon } from "@radix-ui/react-icons"
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group"
import { Label } from "@/components/ui/label"

import { cn } from "@/lib/utils"

const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Root
      className={cn("grid gap-2", className)}
      {...props}
      ref={ref}
    />
  )
})
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName

const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>
>(({ className, children, value, ...props }, ref) => {
  const RadioGroupItem = (
    <RadioGroupPrimitive.Item
      ref={ref}
      value={value}
      className={cn(
        "aspect-square h-4 w-4 rounded-full border border-primary text-primary shadow-sm focus:outline-hidden focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
      >
        <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
          <CheckIcon className="h-3.5 w-3.5 fill-primary" />
        </RadioGroupPrimitive.Indicator>
      </RadioGroupPrimitive.Item>
  )

  return <>
    {children ? (
      <div className="flex items-center">
        {RadioGroupItem}
        {typeof children === "string" ? (
          <Label className="ml-3 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            {children}
          </Label>
        ) : (
          children
        )}
      </div>
    ) : RadioGroupItem}
  </>
})
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName

export { RadioGroup, RadioGroupItem }