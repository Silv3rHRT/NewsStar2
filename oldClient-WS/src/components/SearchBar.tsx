import { useState, useEffect } from "react";
import { Form, FormControl, Button, Dropdown } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

interface SearchProps {
  onSearch: (query: string) => void;
}

export default function SearchBar({ onSearch }: SearchProps) {
  const [query, setQuery] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const fetchedSearchHistory = async () => {
      try {
        const token = localStorage.getItem("loginToken");
        const response = await fetch("/api/search/history", {
          headers: { Authorization: `bear ${token}` },
        });
        if (response.ok) {
          const data = await response.json();
          setHistory(data);
        }
      } catch (error) {
        console.log("Error fetching search history", error);
      }
    };
    fetchedSearchHistory();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    setShowDropdown(value.trim() !== "");
    if (value.trim() === "") {
      onSearch("");
    }
  };

  const handleSearch = async () => {
    if (!query.trim()) {
      onSearch("");
      return;
    }
    try {
      const response = await fetch("/api/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "bear " + (localStorage.getItem("loginToken") || ""),
        },
        body: JSON.stringify({ q: query.trim() }),
      });
      if (!response.ok) {
        return;
      }
      const data = await response.json();
      onSearch(data);
    } catch (error) {
      console.error("You need to login to search!", error);
    }
  };

  return (
    <div className="d-flex flex-column align-items-center w-100">
      <Form className="d-flex w-50 position-relative">
        <FormControl
          type="text"
          placeholder="Search for news..."
          value={query}
          onChange={handleInputChange}
          className="me-2"
        />
        <Button variant="dark" onClick={handleSearch}>Search</Button>
      </Form>
      {showDropdown && history.length > 0 && (
        <Dropdown show={showDropdown} className="mt-2">
          <Dropdown.Menu className="w-50">
            {history.map((item, index) => (
              <Dropdown.Item key={index} onClick={() => setQuery(item)}>
                {item}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      )}
    </div>
  );
}