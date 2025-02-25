import { Dropdown } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

type DropdownItem = {
  label: string;
  href?: string;
  onClick?: () => void;
};

type DropdownMenuProps = {
  title: string;
  items: DropdownItem[];
  className?: string;
};

export function DropdownMenu({ title, items, className }: DropdownMenuProps) {
  return (
    <Dropdown className={className}>
      <Dropdown.Toggle variant="primary" id="dropdown-basic">
        {title}
      </Dropdown.Toggle>
      <Dropdown.Menu>
        {items.map((item, index) => (
          <Dropdown.Item key={index} href={item.href} onClick={item.onClick}>
            {item.label}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
}