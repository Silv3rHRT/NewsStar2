import { Schema, model, Document } from 'mongoose';

export interface IStory extends Document {
	title: string;
	content: string;
	imageUrl: string;
	category: string;
	articleUrl: string;
}

export interface IFavoriteStory extends IStory {
	_id: string;
}

export const favoriteStorySchema = new Schema<IFavoriteStory>({
	title: String,
	content: String,
	imageUrl: String,
	category: String,
	articleUrl: String
});

export const FavoriteStory = model<IFavoriteStory>('FavoriteStory', favoriteStorySchema)