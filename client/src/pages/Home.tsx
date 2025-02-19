import { useState, useEffect } from "react";
import SearchBar from "@/components/SearchBar";

interface NewsArticle {
  title: string;
  content: string;
  image_url: string;
  category: string;
  article_url: string;
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
        }})
        if (!response.ok) {
          return;
        }
        const data = await response.json();
        handleSearch(data);
    } catch (error) {}
  }
  useEffect(() => {
    retrieveNews()
  }, []);

  const handleSearch = (results: any) => {
    console.log(results);
    const articles = results.articles.map((element: any) => { return {
      title: element.title,
      content: element.content,
      image_url: element.urlToImage,
      category: "",
      article_url: element.url
    }})
    console.log('setting news: ', articles)
    setNews(articles);
  };

  return (
    <div className="flex flex-col overflow-hidden">
      <div className="flex flex-col items-center justify-center flex-1">
        <div className="relative z-50 w-[65%] max-w-3xl mt-10">
          <SearchBar onSearch={handleSearch} />
        </div>
        {searchQuery ? (
          <p className="text-lg text-gray-700 mt-4">
            Showing results for: <strong>{searchQuery}</strong>
          </p>
        ) : null}

        <div className="mt-6 w-[65%] max-w-3xl">
          {news.length > 0 ? (
            news.map((article, index) => (
              <div key={index} className="bg-white p-4 shadow-md rounded-lg mb-4">
                <img width={100} src={article.image_url} />
                <h2 className="text-xl font-bold"><a href={article.article_url}>{article.title}</a></h2>
                <p className="text-gray-600">{article.content.substring(0, 100)}...</p>
              </div>
            ))
          ) : searchQuery ? (
            <p className="text-gray-500 mt-4">No results found.</p>
          ) : null}
        </div>
      </div>
    </div>
  );
}
