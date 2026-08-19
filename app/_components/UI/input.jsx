import * as React from "react"
import { Input as InputPrimitive } from "@base-ui/react/input"

import { cn } from "@/app/_lib/utils"

function Input({
  className,
  type,
  ...props
}) {
  return (
    <InputPrimitive
      type={type}
      data-slot="input"
      className={cn(
        "h-8 w-full min-w-0 rounded-lg border border-[var(--color-input-border)] bg-[var(--color-input-background)] px-2.5 py-1 text-base text-[var(--color-input-text)] transition-colors outline-none file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-[var(--color-input-text)] placeholder:text-[var(--color-input-placeholder)] hover:bg-[var(--color-input-hover)] focus-visible:border-[var(--color-input-border-focus)] focus-visible:ring-3 focus-visible:ring-[var(--color-input-border-focus)] disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-[var(--color-input-disabled)] disabled:text-[var(--color-input-disabled-text)] disabled:placeholder:text-[var(--color-input-disabled-text)] aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 md:text-sm",
        className
      )}
      {...props} />
  );
}

export { Input }
