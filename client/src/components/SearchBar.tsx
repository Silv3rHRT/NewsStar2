import { useState } from "react";
import {
  Form,
  Input,
  Button,
  Dropdown,
  Grid,
  Container,
  DropdownProps,
} from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import {SEARCH} from "../utils/mutations.js"
import { useMutation } from "@apollo/client";






interface SearchProps {
  handleSearchResults: (data:any) => void;
  onSearch: (data: any, additionalInfo:string) => void;
}

export default function SearchBar({ handleSearchResults }: SearchProps) {
  const [search,{error}] = useMutation (SEARCH,);
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState({
    sortBy: "",
    from: "",
    to: "",
  });
  const [showFilters, setShowFilters] = useState(false);

  // Get today's date and a date 30 days ago in YYYY-MM-DD format.
  const today = new Date().toISOString().split("T")[0];
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  const minDate = thirtyDaysAgo.toISOString().split("T")[0];

  const handleInputChange = (_: any, { value }: any) => {
    setQuery(value);
    if (value.trim() === "") {
      //onSearch("", filters);
    }
  };

  const handleFilterChange = (_: React.SyntheticEvent<HTMLElement>, data: DropdownProps) => {
    if (data.name && data.value) {
      setFilters((prevFilters) => ({
        ...prevFilters,
        [data.name]: data.value as string,
      }));
    }
  };

  const handleSearch = async () => {
    if (!query.trim()) {
      //onSearch("", filters);
      return;
    }
    // Save to Local Storage
    let searches = JSON.parse(localStorage.getItem("searchHistory") || "[]");
    searches.unshift({ query, timestamp: new Date().toISOString() }); // Add new search to the top
    localStorage.setItem("searchHistory", JSON.stringify(searches));
    // Trigger the search function
    const stories= await search({variables: { searchTerms: query, from: filters.from, to:filters.to, sortBy:filters.sortBy,}});

    //const searchData =stories.data;
    handleSearchResults (stories) }
   

  return (
    <Container>
      <Form>
        <Form.Group widths="equal">
          <Form.Field>
            <Input
              placeholder="Search for news..."
              value={query}
              onChange={handleInputChange}
              action={{ icon: "search", onClick: handleSearch }}
            />
          </Form.Field>
          <Form.Field>
            <Button type="button" onClick={() => setShowFilters(!showFilters)}>
              {showFilters ? "Hide Filters" : "Show Filters"}
            </Button>
          </Form.Field>
        </Form.Group>
        {showFilters && (
          <Grid columns={2} divided>
            <Grid.Row>
              <Grid.Column>
                <Form.Field>
                  <label>Sort By</label>
                  <Dropdown
                    placeholder="Select"
                    fluid
                    selection
                    options={[
                      {
                        key: "relevancy",
                        text: "Relevance",
                        value: "relevancy",
                      },
                      {
                        key: "popularity",
                        text: "Popularity",
                        value: "popularity",
                      },
                      {
                        key: "publishedAt",
                        text: "Date",
                        value: "publishedAt",
                      },
                    ]}
                    name="sortBy"
                    onChange={handleFilterChange}
                    value={filters.sortBy}
                  />
                </Form.Field>
              </Grid.Column>
              <Grid.Column>
                <Form.Group widths="equal">
                  <Form.Field>
                    <label>From</label>
                    <Input
                      type="date"
                      name="from"
                      value={filters.from}
                      onChange={(e, { value }) =>
                        handleFilterChange(e, { name: "from", value })
                      }
                      min={minDate}
                      max={today}
                    />
                  </Form.Field>
                  <Form.Field>
                    <label>To</label>
                    <Input
                      type="date"
                      name="to"
                      value={filters.to}
                      onChange={(e, { value }) =>
                        handleFilterChange(e, { name: "to", value })
                      }
                      min={filters.from || minDate}
                      max={today}
                    />
                  </Form.Field>
                </Form.Group>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        )}
      </Form>
    </Container>
  );
}
