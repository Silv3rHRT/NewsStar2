import { Link } from "react-router-dom";
import { Card, Image, Grid, Button, Icon } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import "../css/styles.css";

interface NewsCardProps {
  id: number;
  title: string;
  content: string;
  image_url: string;
  category?: string;
  article_url: string;
  favoriteId: string | undefined;
  onFavoriteToggle?: (id: number) => void;
}

export default function NewsCard({
  id,
  title,
  content,
  image_url,
  category,
  article_url,
  favoriteId,
  onFavoriteToggle,
}: NewsCardProps) {
  const handleFavoriteClick = () => {
    if (onFavoriteToggle) {
      onFavoriteToggle(id);
    }
  };

  return (
    <Card fluid className="custom-news-card">
      <Grid padded>
        <Grid.Row columns={2}>
          <Grid.Column width={6}>
            <Link to={`/news/${id}`}>
              <Image src={image_url} alt={title} fluid />
            </Link>
          </Grid.Column>
          <Grid.Column width={10}>
            <Card.Content>
              <Card.Header>{title}</Card.Header>
              {category && <Card.Meta>{category}</Card.Meta>}
              <Card.Description>
                {content.length > 150 ? content.substring(0, 150) + "..." : content}
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
              <Button icon onClick={handleFavoriteClick}>
                <Icon name={favoriteId ? "heart" : "heart outline"} color={favoriteId ? "red" : undefined} />
              </Button>
              <Button as="a" href={article_url} target="_blank" rel="noopener noreferrer">
                Read More
              </Button>
            </Card.Content>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Card>
  );
}

