import { Card as BootstrapCard } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { ReactNode } from "react";

type CardProps = {
  className?: string;
  children: ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;

export function Card({ className, children, ...props }: CardProps) {
  return (
    <BootstrapCard className={`shadow-sm rounded ${className || ""}`} {...props}>
      {children}
    </BootstrapCard>
  );
}

export function CardHeader({ className, children, ...props }: CardProps) {
  return (
    <BootstrapCard.Header className={`fw-bold ${className || ""}`} {...props}>
      {children}
    </BootstrapCard.Header>
  );
}

export function CardTitle({ className, children, ...props }: CardProps) {
  return (
    <h5 className={`card-title ${className || ""}`} {...props}>{children}</h5>
  );
}

export function CardDescription({ className, children, ...props }: CardProps) {
  return (
    <p className={`text-muted ${className || ""}`} {...props}>{children}</p>
  );
}

export function CardContent({ className, children, ...props }: CardProps) {
  return (
    <BootstrapCard.Body className={className} {...props}>{children}</BootstrapCard.Body>
  );
}

export function CardFooter({ className, children, ...props }: CardProps) {
  return (
    <BootstrapCard.Footer className={className} {...props}>{children}</BootstrapCard.Footer>
  );
}
