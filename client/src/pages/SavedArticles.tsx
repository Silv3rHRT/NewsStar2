import { useEffect, useState } from "react";
import { Container, Button, Loader, Message, Grid } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import NewsCard from "../components/NewsCard";
import "../css/styles.css";

interface Article {
  id: number;
  title: string;
  content: string;
  image_url: string;
  url: string; // URL to the full article for sharing
}

export default function SavedArticles() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [shareMessage, setShareMessage] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);
    fetch("http://localhost:5000/api/saved-articles")
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then((data) => {
        setArticles(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching articles:", err);
        setError("Error fetching articles");
        setIsLoading(false);
      });
  }, []);

  const handleUnsave = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:5000/api/saved-articles/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Error unsaving article");
      }
      setArticles((prev) => prev.filter((article) => article.id !== id));
    } catch (err) {
      console.error("Error unsaving article:", err);
      setError("Error unsaving article");
    }
  };

  const handleShare = (article: Article) => {
    if (navigator.share) {
      navigator
        .share({
          title: article.title,
          text: article.content.slice(0, 100) + "...",
          url: article.url,
        })
        .catch((err) => {
          console.error("Error sharing:", err);
          setError("Error sharing article");
        });
    } else if (navigator.clipboard) {
      navigator.clipboard.writeText(article.url).then(() => {
        setShareMessage("Article URL copied to clipboard!");
        setTimeout(() => setShareMessage(null), 3000);
      });
    } else {
      alert(`Share this link: ${article.url}`);
    }
  };

  return (
    <Container style={{ marginTop: "25%" }}>
      <h1>Your Saved Articles</h1>

      {error && <Message negative>{error}</Message>}
      {shareMessage && <Message info>{shareMessage}</Message>}

      {isLoading ? (
        <Loader active inline="centered">
          Loading...
        </Loader>
      ) : (
        <Grid columns={3} stackable>
          {articles.length > 0 ? (
            articles.map((article) => (
              <Grid.Column key={article.id}>
                <NewsCard {...article} article_url={article.url} />
                <div style={{ marginTop: "1em" }}>
                  <Button basic color="blue" onClick={() => handleShare(article)}>
                    Share
                  </Button>
                  <Button basic color="red" onClick={() => handleUnsave(article.id)}>
                    Unsave
                  </Button>
                </div>
              </Grid.Column>
            ))
          ) : (
            <Grid.Column>
              <Message>No saved articles found.</Message>
            </Grid.Column>
          )}
        </Grid>
      )}
    </Container>
  );
}
