import { ReactNode } from "react";
import { Button } from "./ui/button";

type DefaultButtonProps = {
  children: ReactNode;
  className?: string;
};

export function DefaultButton({ children, className }: DefaultButtonProps) {
  return (
    <Button className={`bg-amber-500 ${className} hover:bg-amber-400`}>
      {children}
    </Button>
  );
}
