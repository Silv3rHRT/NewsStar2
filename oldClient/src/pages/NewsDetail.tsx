import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

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
    fetch(`api/news/${id}`)
      .then((res) => res.json())
      .then((data) => setNews(data))
      .catch((err) => console.error(err));
  }, [id]);

  if (!news) return <p>Loading...</p>;

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold">{news.title}</h1>
      <p className="text-gray-500">By {news.journalist}</p>
      <img src={news.image_url} alt={news.title} className="w-full h-60 object-cover my-4" />
      <p className="text-lg">{news.content}</p>
    </div>
  );
}
