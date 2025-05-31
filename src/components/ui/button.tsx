import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default:
          "bg-[var(--color-primary)] text-[var(--text-primary)] shadow-xs hover:bg-[#d4a107] ",
        muted:
          "bg-[var(--color-muted-foreground)] text-[var(--text-primary)] shadow-xs hover:bg-[#9c9bad] ",
        secondary:
          "bg-[var(--color-background)] text-[var(--color-primary)] border border-[var(--color-primary)] shadow-xs hover:bg-[var(--color-primary)] hover:text-[var(--background)]",
        disable:
          "bg-[var(--color-disable)] text-[var(--text-disable)] shadow-xs",
        warn: "bg-[var(--color-warn-background)] text-[var(--color-warn)] shadow-xs hover:bg-[var(--color-warn)] hover:text-[var(--color-warn-background)]",
        warnSecondary:
          "bg-[var(--color-warn)] text-[var(--color-warn-background)] shadow-xs hover:bg-[var(--color-warn-secondary)] hover:text-[var(--color-warn-background)]",
      },
      size: {
        default: "h-10 w-30 gap-2 px-6 py-4 rounded-[12px]",
        sm: "h-10 gap-2 px-3 py-2 rounded-4xl",
        lg: "h-10 w-50 gap-2 px-6 py-4 rounded-[12px]",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
