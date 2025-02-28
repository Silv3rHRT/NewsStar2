import { useEffect, useState } from "react";
import { Container, Card, Button, Form } from "react-bootstrap";
import 'semantic-ui-css/semantic.min.css';

interface NewsArticle {
  id: number;
  title: string;
  content: string;
  image_url: string;
}

export default function AdminPanel() {
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/news")
      .then((res) => res.json())
      .then((data) => setNews(data))
      .catch((err) => console.error(err));
  }, []);

  const handleSubmit = async () => {
    const method = editingId ? "PUT" : "POST";
    const url = editingId ? `http://localhost:5000/api/news/${editingId}` : "http://localhost:5000/api/news";

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content, image_url: imageUrl }),
    });

    setTitle("");
    setContent("");
    setImageUrl("");
    setEditingId(null);
    window.location.reload();
  };

  const handleDelete = async (id: number) => {
    await fetch(`http://localhost:5000/api/news/${id}`, { method: "DELETE" });
    window.location.reload();
  };

  return (
    <Container className="mt-4">
      <h1 className="mb-4">Admin Panel</h1>

      <Card className="p-4 mb-4">
        <h2>{editingId ? "Edit News" : "Create News"}</h2>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Content</Form.Label>
            <Form.Control as="textarea" placeholder="Content" value={content} onChange={(e) => setContent(e.target.value)} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Image URL</Form.Label>
            <Form.Control type="text" placeholder="Image URL" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
          </Form.Group>
          <Button variant="dark" onClick={handleSubmit}>{editingId ? "Update" : "Create"}</Button>
        </Form>
      </Card>

      <h2 className="mb-3">All News</h2>
      <div className="row">
        {news.map((article) => (
          <div key={article.id} className="col-md-6 mb-4">
            <Card>
              <Card.Body>
                <Card.Title>{article.title}</Card.Title>
                <Card.Text>{article.content.slice(0, 100)}...</Card.Text>
                <Button variant="outline-secondary" className="me-2" onClick={() => {
                  setTitle(article.title);
                  setContent(article.content);
                  setImageUrl(article.image_url);
                  setEditingId(article.id);
                }}>Edit</Button>
                <Button variant="danger" onClick={() => handleDelete(article.id)}>Delete</Button>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </Container>
  );
}