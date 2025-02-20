import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";

interface NewsCardProps {
  id: number;
  title: string;
  content: string;
  image_url: string;
  category: string;
}

export default function NewsCard({ id, title, image_url }: NewsCardProps) {
  return (
    <Card className="w-72 h-40 shadow-lg rounded-lg overflow-hidden">
      <CardContent className="p-0">
        <Link to={`/news/${id}`}>
          <img src={image_url} alt={title} className="w-full h-24 object-cover" />
        </Link>
      </CardContent>
    </Card>
  );
}
