import { Link } from "react-router-dom";
import { Card, Image } from "semantic-ui-react";
import "./css/styles.css";

interface NewsCardProps {
  id: number;
  title: string;
  content: string;
  image_url: string;
  category: string;
}

export default function NewsCard({ id, title, image_url }: NewsCardProps) {
  return (
    <Card className="custom-news-card">
      <Link to={`/news/${id}`}>
        <Image src={image_url} alt={title} wrapped ui={false} />
      </Link>
      <Card.Content>
        <Card.Header className="text-truncate">{title}</Card.Header>
      </Card.Content>
    </Card>
  );
}

