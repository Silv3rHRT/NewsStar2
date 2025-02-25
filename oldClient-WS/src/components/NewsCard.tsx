import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

interface NewsCardProps {
  id: number;
  title: string;
  content: string;
  image_url: string;
  category: string;
}

export default function NewsCard({ id, title, image_url }: NewsCardProps) {
  return (
    <Card className="shadow-sm rounded overflow-hidden">
      <Link to={`/news/${id}`}>
        <Card.Img variant="top" src={image_url} alt={title} className="img-fluid" />
      </Link>
      <Card.Body>
        <Card.Title className="text-truncate">{title}</Card.Title>
      </Card.Body>
    </Card>
  );
}
