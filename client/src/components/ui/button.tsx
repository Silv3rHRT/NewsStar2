import { Button as SemanticButton } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import { ReactNode } from "react";
import "../../css/styles.css";

type ButtonProps = {
  variant?: "primary" | "secondary" | "danger" | "success" | "warning" | "info" | "light" | "dark";
  className?: string;
  children: ReactNode;
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "color">;

export function Button({ variant = "primary", className = "", children, ...props }: ButtonProps) {
  const variantClass = variant;
  return (
    <SemanticButton className={`${variantClass} ${className}`} {...props}>
      {children}
    </SemanticButton>
  );
}

