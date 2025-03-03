import { Link } from "react-router-dom";
import { Card, Image } from "semantic-ui-react";
import "../css/styles.css";
import FavoritesButton from "../components/ui/FavoritesButton";

interface NewsCardProps {
  id: number;
  title: string;
  content: string;
  image_url: string;
  category?: string;
  isFavorite?: boolean;
  onFavoriteToggle?: (id: number, newFavoriteState: boolean) => void;
}

export default function NewsCard({
  id,
  title,
  image_url,
  category,
  isFavorite = false,
  onFavoriteToggle,
}: NewsCardProps) {
  const handleFavoriteToggle = (newState: boolean) => {
    if (onFavoriteToggle) {
      onFavoriteToggle(id, newState);
    }
  };

  return (
    <Card className="custom-news-card">
      <Link to={`/news/${id}`}>
        <Image src={image_url} alt={title} wrapped ui={false} />
      </Link>
      <Card.Content>
        <Card.Header className="text-truncate">{title}</Card.Header>
        {category && <Card.Meta>{category}</Card.Meta>}
      </Card.Content>
      <Card.Content extra>
        <FavoritesButton isFavorite={isFavorite} onToggle={handleFavoriteToggle} />
      </Card.Content>
    </Card>
  );
}


