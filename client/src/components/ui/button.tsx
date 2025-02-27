import { Button as BootstrapButton } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { ReactNode } from "react";

type ButtonProps = {
  variant?: "primary" | "secondary" | "danger" | "success" | "warning" | "info" | "light" | "dark";
  className?: string;
  children: ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({ variant = "primary", className, children, ...props }: ButtonProps) {
  return (
    <BootstrapButton variant={variant} className={className} {...props}>
      {children}
    </BootstrapButton>
  );
}