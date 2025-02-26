import { useState, useEffect } from "react";
import { Form, FormControl, Button, Dropdown, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

interface SearchProps {
  onSearch: (results: any) => void;
}

export default function SearchBar({ onSearch }: SearchProps) {
  const [query, setQuery] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [filters, setFilters] = useState({
    sortBy: "",
    sources: "",
    from: "",
    to: "",
  });
  const [showDropdown, setShowDropdown] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

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

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSearch = () => {
    onSearch({ query, filters });
  };

  return (
    <div className="position-fixed top-50 start-50 translate-middle d-flex flex-column align-items-center w-100"
         style={{ marginTop: "100px", maxWidth: "500px" }}>
      {/* Search Bar */}
      <div className="w-100">
        <Form className="d-flex justify-content-center">
          <FormControl
            type="text"
            placeholder="Search for news..."
            value={query}
            onChange={handleInputChange}
            className="me-2 text-center"
          />
          <Button variant="dark" onClick={handleSearch}>Search</Button>
        </Form>
      </div>
      
      {/* Dropdown for Filters */}
      <Button
        variant="outline-secondary"
        className="mt-2"
        onClick={() => setShowFilters(!showFilters)}
      >
        Advanced Search
      </Button>
      
      {showFilters && (
        <div className="p-3 border rounded w-100 bg-light text-center" style={{ maxWidth: "600px", marginTop: "20px" }}>
          <Row className="mb-2 justify-content-center">
            <Col md={5}>
              <Form.Label>Sort By</Form.Label>
              <Form.Select name="sortBy" onChange={handleFilterChange}>
                <option value="">Select</option>
                <option value="relevance">Relevance</option>
                <option value="date">Date</option>
              </Form.Select>
            </Col>
            <Col md={5}>
              <Form.Label>Sources</Form.Label>
              <FormControl
                type="text"
                name="sources"
                placeholder="Enter sources"
                onChange={handleFilterChange}
              />
            </Col>
          </Row>
          <Row className="mb-2 justify-content-center">
            <Col md={5}>
              <Form.Label>From</Form.Label>
              <FormControl type="date" name="from" onChange={handleFilterChange} />
            </Col>
            <Col md={5}>
              <Form.Label>To</Form.Label>
              <FormControl type="date" name="to" onChange={handleFilterChange} />
            </Col>
          </Row>
        </div>
      )}
      
      {showDropdown && history.length > 0 && (
        <Dropdown show={showDropdown} className="mt-2">
          <Dropdown.Menu className="w-100 text-center">
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