import { ReactNode } from "react";

type DefaultFormProps = {
  children: ReactNode;
  className?: string;
};

export function DefaultForm({ children, className }: DefaultFormProps) {
  return (
    <form className={`flex w-full flex-col gap-6 ${className}`}>
      {children}
    </form>
  );
}
