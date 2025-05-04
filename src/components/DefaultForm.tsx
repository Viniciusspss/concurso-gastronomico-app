import { ReactNode } from "react";

type DefaultFormProps = {
  children: ReactNode;
  className?: string;
} & React.FormHTMLAttributes<HTMLFormElement>;

export function DefaultForm({
  children,
  className,
  ...props
}: DefaultFormProps) {
  return (
    <form {...props} className={`flex w-full flex-col gap-6 ${className}`}>
      {children}
    </form>
  );
}
