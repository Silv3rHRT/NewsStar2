import { useState, useEffect } from "react";
import "semantic-ui-css/semantic.min.css";
import Navbar from "@/components/Navbar";
import NewsCard from "@/components/NewsCard";
import SearchBar from "@/components/SearchBar";

interface NewsArticle {
  id: number;
  title: string;
  content: string;
  image_url: string;
  category: string;
  article_url: string;
  isFavorite?: boolean;
}

export default function Home() {
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  async function retrieveNews() {
    try {
      const response = await fetch("/api/news", {
        method: "GET",
        headers: {
          Authorization: "bear " + (localStorage.getItem("loginToken") || ""),
        },
      });
      if (!response.ok) return;
      const data = await response.json();
      handleSearchResults(data);
    } catch (error) {
      console.error("Error fetching news:", error);
    }
  }

  useEffect(() => {
    retrieveNews();
  }, []);

  const handleSearchResults = (results: any) => {
    const articles = results.articles.map((element: any, index: number) => ({
      id: index,
      title: element.title,
      content: element.content || "",
      image_url: element.urlToImage,
      category: "", // Update if category info is available
      article_url: element.url,
      isFavorite: false,
    }));
    setNews(articles);
  };

  const handleSearch = async (query: string, filters: any) => {
    setSearchQuery(query);
    if (!query) {
      setNews([]);
      return;
    }

    // Only save the search if it's new
    let searches = JSON.parse(localStorage.getItem("searchHistory") || "[]");
    if (!searches.some(s => s.query === query)) {
        searches.unshift({ query, timestamp: new Date().toISOString() });
        localStorage.setItem("searchHistory", JSON.stringify(searches));
    }

    // Fetch search results (only one API call)
    let apiUrl = `https://newsapi.org/v2/everything?q=${query}&language=en&apiKey=5dac7609e1e747c090c2f5f1cf9c6403`;
    if (filters.sortBy) apiUrl += `&sortBy=${filters.sortBy}`;
    if (filters.from) apiUrl += `&from=${filters.from}`;
    if (filters.to) apiUrl += `&to=${filters.to}`;

    try {
      const response = await fetch(apiUrl);
      if (!response.ok) return;
      const data = await response.json();
      handleSearchResults(data);
    } catch (error) {
      console.error("Error fetching news from API", error);
    }
};

  const handleFavoriteToggle = (id: number, newFavoriteState: boolean) => {
    setNews((prev) =>
      prev.map((article) =>
        article.id === id ? { ...article, isFavorite: newFavoriteState } : article
      )
    );
  };

  return (
    <>
      <Navbar />
      <div className="container" style={{ marginTop: "250px", textAlign: "center" }}>
        <SearchBar onSearch={handleSearch} />
      </div>
      <div className="container" style={{ marginTop: "20px" }}>
        <div className="row mt-4">
          {news.length > 0 ? (
            news.map((article) => (
              <div key={article.id} className="col-md-4 mb-4">
                <NewsCard {...article} onFavoriteToggle={handleFavoriteToggle} />
              </div>
            ))
          ) : (
            <p className="text-center text-muted mt-4">
              {searchQuery ? "No results found." : "Start searching for news."}
            </p>
          )}
        </div>
      </div>
    </>
  );
}

