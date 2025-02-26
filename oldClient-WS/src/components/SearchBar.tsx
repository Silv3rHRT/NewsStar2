import { useState, useEffect } from "react";
import { Form, FormControl, Button, Dropdown, InputGroup, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

interface SearchProps {
  onSearch: (query: string, filters: any) => void;
}

export default function SearchBar({ onSearch }: SearchProps) {
  const [query, setQuery] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [filters, setFilters] = useState({
    sortBy: "",
    from: "",
    to: "",
  });
  const [showFilters, setShowFilters] = useState(false);
  const [searchResults, setSearchResults] = useState<any[]>([]);

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
    if (value.trim() === "") {
      onSearch("", filters);
      setSearchResults([]);
    }
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSearch = async () => {
    if (!query.trim()) {
      onSearch("", filters);
      return;
    }

    // Construct API URL with Filters (No Sources)
    let apiUrl = `https://newsapi.org/v2/everything?q=${query}&language=en&apiKey=5dac7609e1e747c090c2f5f1cf9c6403`;

    if (filters.sortBy) apiUrl += `&sortBy=${filters.sortBy}`;
    if (filters.from) apiUrl += `&from=${filters.from}`;
    if (filters.to) apiUrl += `&to=${filters.to}`;

    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        return;
      }
      const data = await response.json();
      setSearchResults(data.articles);
      onSearch(query, filters);
    } catch (error) {
      console.error("Error fetching news from API", error);
    }
  };

  return (
    <>
      <div className="d-flex flex-column align-items-center w-100 container" style={{ marginTop: "20%" }}>
        {/* Search Bar with Advanced Search Dropdown */}
        <Form className="d-flex w-100 position-relative">
          <InputGroup className="w-100">
            <FormControl
              type="text"
              placeholder="Search for news..."
              value={query}
              onChange={handleInputChange}
              className="me-2"
            />
            <Dropdown show={showFilters} onToggle={() => setShowFilters(!showFilters)}>
              <Dropdown.Toggle variant="outline-secondary" id="dropdown-basic">
                🔍
              </Dropdown.Toggle>
              <Dropdown.Menu className="p-3 w-100">
                <Row className="mb-2">
                  <Col>
                    <Form.Label>Sort By</Form.Label>
                    <Form.Select name="sortBy" onChange={handleFilterChange}>
                      <option value="">Select</option>
                      <option value="relevancy">Relevance</option>
                      <option value="popularity">Popularity</option>
                      <option value="publishedAt">Date</option>
                    </Form.Select>
                  </Col>
                </Row>
                <Row className="mb-2">
                  <Col>
                    <Form.Label>From</Form.Label>
                    <FormControl type="date" name="from" onChange={handleFilterChange} />
                  </Col>
                  <Col>
                    <Form.Label>To</Form.Label>
                    <FormControl type="date" name="to" onChange={handleFilterChange} />
                  </Col>
                </Row>
              </Dropdown.Menu>
            </Dropdown>
            <Button variant="dark" onClick={handleSearch}>Search</Button>
          </InputGroup>
        </Form>

        {/* Display Search Results */}
        <div className="mt-3 w-100">
          {searchResults.length > 0 &&
            searchResults.map((article, index) => (
              <div key={index} className="border-bottom py-2">
                <h5>{article.title}</h5>
                <p>{article.description}</p>
                <a href={article.url} target="_blank" rel="noopener noreferrer">
                  Read More
                </a>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}