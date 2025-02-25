import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

interface NewsArticle {
  title: string;
  content: string;
  image_url: string;
  journalist: string;
}

export default function NewsDetail() {
  const { id } = useParams<{ id: string }>();
  const [news, setNews] = useState<NewsArticle | null>(null);

  useEffect(() => {
    fetch(`/api/news/${id}`)
      .then((res) => res.json())
      .then((data) => setNews(data))
      .catch((err) => console.error(err));
  }, [id]);

  if (!news) return <p className="text-center mt-4">Loading...</p>;

  return (
    <Container className="mt-4">
      <Card className="shadow-sm">
        <Card.Img variant="top" src={news.image_url} alt={news.title} />
        <Card.Body>
          <Card.Title>{news.title}</Card.Title>
          <Card.Subtitle className="text-muted mb-2">By {news.journalist}</Card.Subtitle>
          <Card.Text>{news.content}</Card.Text>
        </Card.Body>
      </Card>
    </Container>
  );
}
