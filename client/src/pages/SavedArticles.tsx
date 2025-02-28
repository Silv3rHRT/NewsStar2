import { useEffect, useState } from "react";
import { Container, Card, Button, Form } from "semantic-ui-react";
import 'semantic-ui-css/semantic.min.css';


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
    <Container className="mt-4">
      <h1 className="mb-4">Your Saved Articles</h1>

      {error && <Alert variant="danger">{error}</Alert>}
      {shareMessage && <Alert variant="info">{shareMessage}</Alert>}

      {isLoading ? (
        <div className="text-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : (
        <div className="row">
          {articles.length > 0 ? (
            articles.map((article) => (
              <div key={article.id} className="col-md-6 mb-4">
                <Card>
                  {article.image_url && (
                    <Card.Img variant="top" src={article.image_url} alt={article.title} />
                  )}
                  <Card.Body>
                    <Card.Title>{article.title}</Card.Title>
                    <Card.Text>
                      {article.content.length > 150
                        ? article.content.slice(0, 150) + "..."
                        : article.content}
                    </Card.Text>
                    <Button
                      variant="outline-secondary"
                      className="me-2"
                      onClick={() => handleShare(article)}
                    >
                      Share
                    </Button>
                    <Button variant="danger" onClick={() => handleUnsave(article.id)}>
                      Unsave
                    </Button>
                  </Card.Body>
                </Card>
              </div>
            ))
          ) : (
            <p>No saved articles found.</p>
          )}
        </div>
      )}
    </Container>
  );
}
