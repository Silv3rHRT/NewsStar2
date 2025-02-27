import { OverlayTrigger, Popover as BootstrapPopover, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { ReactNode } from "react";

type PopoverProps = {
  title: string;
  content: ReactNode;
  children: ReactNode;
  className?: string;
};

export function Popover({ title, content, children, className }: PopoverProps) {
  const popover = (
    <BootstrapPopover id="popover-basic">
      <BootstrapPopover.Header as="h3">{title}</BootstrapPopover.Header>
      <BootstrapPopover.Body>{content}</BootstrapPopover.Body>
    </BootstrapPopover>
  );

  return (
    <OverlayTrigger trigger="click" placement="right" overlay={popover}>
      <Button variant="secondary" className={className}>{children}</Button>
    </OverlayTrigger>
  );
}