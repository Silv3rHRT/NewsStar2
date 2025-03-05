import { useState } from "react";
import { Container, Button, Loader, Message, Grid } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import NewsCard from "../components/NewsCard";
import "../css/styles.css";
import { useQuery } from "@apollo/client";
import { QUERY_ME } from "@/utils/queries";

interface Article {
  _id: string;
  id: number;
  title: string;
  content: string;
  imageUrl: string;
  articleUrl: string; // URL to the full article for sharing
  image_url: string;
  article_url: string;
}

export default function SavedArticles() {
  const { loading, error, data } = useQuery(QUERY_ME);
  const [shareMessage, setShareMessage] = useState<string | null>(null);

  const handleShare = (article: Article) => {
    if (navigator.share) {
      navigator
        .share({
          title: article.title,
          text: article.content.slice(0, 100) + "...",
          url: article.articleUrl,
        })
        .catch((err) => {
          console.error("Error sharing:", err);
        });
    } else if (navigator.clipboard) {
      navigator.clipboard.writeText(article.articleUrl).then(() => {
        setShareMessage("Article URL copied to clipboard!");
        setTimeout(() => setShareMessage(null), 3000);
      });
    } else {
      alert(`Share this link: ${article.articleUrl}`);
    }
  };

  if (loading) {
    return (
      <Loader active inline="centered">
        Loading...
      </Loader>
    );
  }

  if (error) {
    return <Message negative>{error.message}</Message>;
  }

  const articles = data.me.favoriteStories.map((story: any) => ({
    _id: story._id,
    title: story.title,
    content: story.content,
    image_url: story.imageUrl,
    article_url: story.articleUrl,
  }));

  return (
    <Container style={{ marginTop: "25%" }}>
      <h1>Your Saved Articles</h1>

      {shareMessage && <Message info>{shareMessage}</Message>}

      <Grid columns={3} stackable>
        {articles.length > 0 ? (
          articles.map((article: Article) => (
            <Grid.Column key={article._id}>
              <NewsCard
                id={article.id}
                title={article.title}
                content={article.content}
                image_url={article.image_url}
                article_url={article.article_url}
              />
              <div style={{ marginTop: "1em" }}>
                <Button basic color="blue" onClick={() => handleShare(article)}>
                  Share
                </Button>
                {/* <Button basic color="red" onClick={() => handleUnsave(article._id)}>
                  Unsave
                </Button> */}
              </div>
            </Grid.Column>
          ))
        ) : (
          <Grid.Column>
            <Message>No saved articles found.</Message>
          </Grid.Column>
        )}
      </Grid>
    </Container>
  );
}
