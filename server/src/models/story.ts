import { Schema, Document } from 'mongoose';

export interface IStory extends Document {
	title: string;
	content: string;
	image_url: string;
	category: string;
	article_url: string;
}

export interface IFavoriteStory extends IStory {
	_id: string;
}

export const favoriteStorySchema = new Schema<IFavoriteStory>({
	title: String,
	content: String,
	image_url: String,
	category: String,
	article_url: String
});
