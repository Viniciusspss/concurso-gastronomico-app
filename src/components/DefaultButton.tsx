import { ComponentProps, ReactNode } from "react";
import { Button } from "./ui/button";

type DefaultButtonProps = {
  children: ReactNode;
  className?: string;
} & ComponentProps<"button">;

export function DefaultButton({
  children,
  className,
  ...props
}: DefaultButtonProps) {
  return (
    <Button
      {...props}
      className={`bg-amber-500 ${className} hover:bg-amber-400`}
    >
      {children}
    </Button>
  );
}
