import { useState, useEffect } from "react";
import SearchBar from "@/components/SearchBar";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "@/components/Navbar";


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
        },
      });
      if (!response.ok) {
        return;
      }
      const data = await response.json();
      handleSearch(data);
    } catch (error) {}
  }

  useEffect(() => {
    retrieveNews();
  }, []);

  const handleSearch = (results: any) => {
    console.log(results);
    const articles = results.articles.map((element: any) => {
      return {
        title: element.title,
        content: element.content,
        image_url: element.urlToImage,
        category: "",
        article_url: element.url,
      };
    });
    console.log("setting news: ", articles);
    setNews(articles);
  };

  return (
    <>
    
    <div className="container mt-4">
      <div className="row justify-content-center">
      </div>

      <div className="row mt-4">
        {news.length > 0 ? (
          news.map((article, index) => (
            <div key={index} className="col-md-4 mb-4">
              <div className="card shadow-sm">
                <img src={article.image_url} className="card-img-top" alt={article.title} />
                <div className="card-body">
                  <h5 className="card-title">
                    <a href={article.article_url} className="text-decoration-none">{article.title}</a>
                  </h5>
                  <p className="card-text text-truncate">{article.content.substring(0, 100)}...</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-muted mt-4">{searchQuery ? "No results found." : "Start searching for news."}</p>
        )}
      </div>
    </div>
    </>
  );
}
