import { Schema, model, Document } from 'mongoose';
import bcrypt from 'bcrypt';
import { ISearchParams, searchParamsSchema } from './searchParams.js';
import { IFavoriteStory, favoriteStorySchema } from './story.js';

interface IUser extends Document {
  _id: string;
  username: string;
  email: string;
  password: string;
  isCorrectPassword(password: string): Promise<boolean>;
  searchHistory: ISearchParams[];
  favoriteStories: IFavoriteStory[];
}

const userSchema = new Schema<IUser>({
	username: {
		type: String,
		required: true,
		unique: true,
		trim: true
	},
	email: {
		type: String,
		required: true,
		unique: true,
		trim: true
	},
	password: {
		type: String,
		required: true,
		minlength: 5
	},
	searchHistory: [searchParamsSchema],
	favoriteStories: [favoriteStorySchema]
});

userSchema.pre<IUser>('save', async function(next) {
	if (this.isNew || this.isModified('password')) {
		const salt = 10;
		this.password = await bcrypt.hash(this.password, salt);
	}
	next();
});
  
userSchema.methods.isCorrectPassword = async function(password: string): Promise<boolean> {
	return bcrypt.compare(password, this.password);
}

const User = model<IUser>('User', userSchema);

export default User;

