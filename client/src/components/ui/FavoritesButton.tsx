import { useState } from "react";
import { Button, Icon } from "semantic-ui-react";

interface FavoritesButtonProps {
  isFavorite?: boolean;
  onToggle?: (newState: boolean) => void;
}

export default function FavoritesButton({ isFavorite = false, onToggle }: FavoritesButtonProps) {
  const [favorite, setFavorite] = useState(isFavorite);

  const handleClick = () => {
    const newState = !favorite;
    setFavorite(newState);
    if (onToggle) {
      onToggle(newState);
    }
  };

  return (
    <Button icon onClick={handleClick}>
      <Icon name={favorite ? "heart" : "heart outline"} color={favorite ? "red" : undefined} />
    </Button>
  );
}
