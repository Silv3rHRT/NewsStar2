import { useState, useEffect } from "react";
import { Container, Button, Loader, Message, Grid } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import NewsCard from "../components/NewsCard";
import "../css/styles.css";
import { useQuery } from "@apollo/client";
import { QUERY_ME } from "@/utils/queries";
import { REMOVE_FAVORITE, ADD_FAVORITE } from "@/utils/mutations";
import { useMutation } from "@apollo/client";
import { FavoriteStory } from "@/components/SearchBar";

interface Article {
  favoriteId: string | undefined;
  id: number;
  title: string;
  content: string;
  imageUrl: string;
  articleUrl: string; // URL to the full article for sharing
  image_url: string;
  article_url: string;
  category: string;
}

function mapFavoriteStories(favoriteStories: any) {
  return favoriteStories.map((story: any) => ({
       favoriteId: story._id,
       title: story.title,
       content: story.content,
       image_url: story.imageUrl,
       article_url: story.articleUrl,
       category: story.category
    }));
}
export default function SavedArticles() {
  const { loading, error, data } = useQuery(QUERY_ME);
  const [shareMessage, setShareMessage] = useState<string | null>(null);
  const [articles, setArticles] = useState<Array<Article>>([])
  useEffect(() => {if (!loading) {
    setArticles(mapFavoriteStories(data.me.favoriteStories))
  }}, [loading,data])

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

  const [removeFavorite] = useMutation(REMOVE_FAVORITE)
  const [addFavorite] = useMutation(ADD_FAVORITE)
  
  const getFavoriteId = (favorites: FavoriteStory[], articleUrl: string): string | undefined => {
    const index = favorites.findIndex(element => element.articleUrl == articleUrl)
    if (index >= 0) {
      return favorites[index].articleUrl
    }
  }
  const handleFavoriteToggle = async (id: number) => {
    const update = [...articles]
    if (update[id].favoriteId) {
      removeFavorite({variables:{favoriteId:update[id].favoriteId}})
      update[id].favoriteId = undefined
    }
    else {
      console.log('adding favorite', update[id])
      const response = await addFavorite({variables:{
        title:update[id].title,
        content:update[id].content,
        imageUrl:update[id].image_url,
        articleUrl:update[id].article_url,
        category:update[id].category
      }})
      console.log('got respones', response)
      update[id].favoriteId = getFavoriteId(response.data.addFavorite.favoriteStories, update[id].article_url)
    }
    setArticles(update);
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

  // const articles = data.me.favoriteStories.map((story: any) => ({
  //   favoriteId: story._id,
  //   title: story.title,
  //   content: story.content,
  //   image_url: story.imageUrl,
  //   article_url: story.articleUrl,
  // }));

  return (
    <Container style={{ marginTop: "25%" }}>
      <h1>Your Saved Articles</h1>

      {shareMessage && <Message info>{shareMessage}</Message>}

      <Grid columns={3} stackable>
        {articles.length > 0 ? (
          articles.map((article: Article, index: number) => (
            <Grid.Column key={article.id}>
              <NewsCard
                id={index}
                title={article.title}
                content={article.content}
                image_url={article.image_url}
                article_url={article.article_url}
                favoriteId={article.favoriteId}
                onFavoriteToggle={handleFavoriteToggle}
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
