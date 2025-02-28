import { Card as SemanticCard } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import { ReactNode, HTMLAttributes } from "react";
import "./css/styles.css";

interface CardProps extends Omit<HTMLAttributes<HTMLDivElement>, "color"> {
  className?: string;
  children: ReactNode;
}

export function Card({ className = "", children, ...props }: CardProps) {
  return (
    <SemanticCard className={`custom-card ${className}`} {...props}>
      {children}
    </SemanticCard>
  );
}

export function CardHeader({ className = "", children, ...props }: CardProps) {
  return (
    <SemanticCard.Content {...props}>
      <SemanticCard.Header className={`custom-card-header ${className}`}>
        {children}
      </SemanticCard.Header>
    </SemanticCard.Content>
  );
}

export function CardTitle({ className = "", children, ...props }: CardProps) {
  return (
    <h5 className={`custom-card-title ${className}`} {...props}>
      {children}
    </h5>
  );
}

export function CardDescription({ className = "", children, ...props }: CardProps) {
  return (
    <SemanticCard.Description className={`custom-card-description ${className}`} {...props}>
      {children}
    </SemanticCard.Description>
  );
}

export function CardContent({ className = "", children, ...props }: CardProps) {
  return (
    <SemanticCard.Content className={`custom-card-content ${className}`} {...props}>
      {children}
    </SemanticCard.Content>
  );
}

export function CardFooter({ className = "", children, ...props }: CardProps) {
  return (
    <SemanticCard.Content extra className={`custom-card-footer ${className}`} {...props}>
      {children}
    </SemanticCard.Content>
  );
}

