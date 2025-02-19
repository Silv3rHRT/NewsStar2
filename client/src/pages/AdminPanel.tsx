import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

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
  // TODO: db here
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
    <div className="p-4">
      <h1 className="text-2xl font-bold">Admin Panel</h1>

      <div className="p-4 border rounded-lg my-4">
        <h2 className="text-xl">{editingId ? "Edit News" : "Create News"}</h2>
        <Input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} className="mt-2" />
        <Input placeholder="Content" value={content} onChange={(e) => setContent(e.target.value)} className="mt-2" />
        <Input placeholder="Image URL" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} className="mt-2" />
        <Button onClick={handleSubmit} className="mt-4">{editingId ? "Update" : "Create"}</Button>
      </div>

      <h2 className="text-xl font-bold">All News</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        {news.map((article) => (
          <Card key={article.id}>
            <CardContent>
              <h3 className="text-lg font-bold">{article.title}</h3>
              <p className="text-gray-500">{article.content.slice(0, 100)}...</p>
              <div className="flex gap-2 mt-2">
                <Button variant="outline" onClick={() => { 
                  setTitle(article.title);
                  setContent(article.content);
                  setImageUrl(article.image_url);
                  setEditingId(article.id);
                }}>Edit</Button>
                <Button variant="destructive" onClick={() => handleDelete(article.id)}>Delete</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
