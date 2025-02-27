import { Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { ChangeEvent } from "react";
import { FormControlProps } from "react-bootstrap";

type InputProps = {
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  className?: string;
} & Omit<FormControlProps, "size">;

export function Input({ type = "text", placeholder, value, onChange, className, ...props }: InputProps) {
  return (
    <Form.Control
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={className}
      {...props}
    />
  );
}
