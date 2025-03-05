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
import { SEARCH } from "../utils/mutations.js";
import { useMutation } from "@apollo/client";

export interface SearchResult {
  articleUrl: string;
  category: string;
  content: string;
  imageUrl: string;
  title: string;
}

export interface FavoriteStory {
  _id: string;
  articleUrl: string;
}

interface SearchProps {
  handleSearchResults: (
    results: SearchResult[],
    favoriteStories: FavoriteStory[]
  ) => void;
}

const defaultFilters = {
  sortBy: "",
  from: "",
  to: "",
};

export default function SearchBar({ handleSearchResults }: SearchProps) {
  const [search] = useMutation(SEARCH);
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState(defaultFilters);
  const [showFilters, setShowFilters] = useState(false);

  const today = new Date().toISOString().split("T")[0];
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  const minDate = thirtyDaysAgo.toISOString().split("T")[0];

  const clearFilters = () => {
    setFilters(defaultFilters);
  };

  const handleInputChange = (_: any, { value }: any) => {
    if (!value.startsWith(query)) {
      clearFilters();
    }
    setQuery(value);
    if (value.trim() === "") {
    }
  };

  const handleFilterChange = (
    _: React.SyntheticEvent<HTMLElement>,
    data: DropdownProps
  ) => {
    if (data.name && data.value) {
      setFilters((prevFilters) => ({
        ...prevFilters,
        [data.name]: data.value as string,
      }));
    }
  };

  const handleSearch = async () => {
    if (!query.trim()) {
      clearFilters();
      return;
    }

    let searches = JSON.parse(localStorage.getItem("searchHistory") || "[]");
    searches.unshift({ query, timestamp: new Date().toISOString() });
    localStorage.setItem("searchHistory", JSON.stringify(searches));

    try {
      const searchResults = await search({
        variables: {
          searchTerms: query,
          from: filters.from,
          to: filters.to,
          sortBy: filters.sortBy,
        },
      });

      if (searchResults.data.search.user) {
        handleSearchResults(
          searchResults.data.search.stories as SearchResult[],
          searchResults.data.search.user.favoriteStories
        );
      } else {
        handleSearchResults(
          searchResults.data.search.stories as SearchResult[],
          []
        );
      }
    } catch (error) {
      console.error(
        "Error with GraphQL search, falling back to external API:",
        error
      );

      let apiUrl = `https://newsapi.org/v2/everything?q=${query}&language=en&apiKey=5dac7609e1e747c090c2f5f1cf9c6403`;
      if (filters.sortBy) apiUrl += `&sortBy=${filters.sortBy}`;
      if (filters.from) apiUrl += `&from=${filters.from}`;
      if (filters.to) apiUrl += `&to=${filters.to}`;

      try {
        const response = await fetch(apiUrl);
        if (!response.ok) return;
        const data = await response.json();
        const mappedResults = data.articles.map((article: any) => ({
          articleUrl: article.url,
          category: article.category || "",
          content: article.content || "",
          imageUrl: article.urlToImage || "",
          title: article.title || "",
        }));
        handleSearchResults(mappedResults as SearchResult[], []);
      } catch (apiError) {
        console.error("Error fetching news from external API", apiError);
      }
    }
  };

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
