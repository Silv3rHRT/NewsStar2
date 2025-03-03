import { Card as SemanticCard } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import { ReactNode, HTMLAttributes } from "react";
import "../../css/styles.css";

interface CardProps extends Omit<HTMLAttributes<HTMLDivElement>, "color" | "onClick"> {
  className?: string;
  children: ReactNode;
  onClick?: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>, data: CardProps) => void;
}

export function Card({ className = "", children, onClick, ...rest }: CardProps) {
  return (
    <SemanticCard
      className={`custom-card ${className}`}
      // Cast the onClick to 'any' to satisfy SemanticCard's type expectations
      onClick={onClick as any}
      {...rest}
    >
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
  const { onClick, ...rest } = props;
  return (
    <h5 className={`custom-card-title ${className}`} {...rest}>
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


