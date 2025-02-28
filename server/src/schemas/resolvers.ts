import  User  from '../models/user.ts'
import { signToken, AuthenticationError } from '../utils/auth.js'
//import { ISearchParams } from '../models/searchParams.js'
import { IStory } from '../models/story.js'

interface User {
	_id: string;
	username: string;
	password: string;
}

interface UserArgs {
	userId: string;
}

interface UserArgs {
	username: string;
	password: string;
}

interface SearchArgs {
	searchTerms: string;
	to: Date;
	from: Date;
	sortBy: string;
}

interface FavoriteArgs {
	article_url: string;
}

interface Context {
	user?: User;
}

const resolvers = {
	Query: {
		user: async (_parent: unknown, { userId }: UserArgs): Promise<User | null> => {
			return await User.findOne({ _id: userId });
		},
		me: async (_parent: unknown, _args: unkown, context: Context): Promise<User | null> => {
			if (!context.user) {
				throw new AuthenticationError('Not authenticated');
			}
			return await User.findOne({ _id: context.user._id });
		},
		news: async () => Promise<IStory[]> {
			// TODO call api to fetch stories from external source
		}
	},

	Mutation: {
		addUser: async (_parent: unknown, { username, password }: UserArgs): Promise<{ token: string; user: User }> => {
			const user = await User.create({ username, password });
			const token = signToken(user.username, user._id);

			return { token, user };
		},
		login: async (_parent: unknown, { username, password }: UserArgs): Promise<{token: string; user: User }> => {
			const user = await User.findOne({username});
			if (!user) {
				throw new AuthenticationError('invalid');
			}

			if (!(await user.isCorrectPassword(password))) {
				throw new AuthenticationError('invalid');
			}

			const token = signToken(user.username, user._id);

			return { token, user };
		},
		updateUser: async(_parent: unknown, { username, password }: UserArgs, context: Context): Promise<User | null> => {
			if (!context.user) {
				throw new AuthenticationError('Not authenticated');
			}
			return await User.findByIdAndUpdate(context.user._id, { username, password }, {new: true})
		},
		deleteUser: async(_parent: unknown, _args: unknown, context: Context): Promise<User | null> => {
			if (!context.user) {
				throw new AuthenticationError('Not authenticated');
			}
			return await User.findByIdAndDelete(context.user._id);
		},
		search: async(_parent: unknown, {searchTerms, from, to, sortBy}: SearchArgs, context: Context): Promise<IStory[]> => {
			if (!context.user) {
				throw new AuthenticationError('Not authenticated');
			}
			const user = await User.findById(context.user._id);
			// TODO create a new searchTermsSchema and push into user.searchHistory
			user.save();
			// TODO call external api to fetch stories
		},
		addFavorite: async(_parent: unknown, { articleUrl }: FavoriteArgs, context: Context): Promise<User> => {
			if (!context.user) {
				throw new AuthenticationError('Not authenticated');
			}
			const user = await User.findById(context.user._id);
			// TODO create a new favoriteStorySchema and push into user.favoriteStories
			user.save();
			return user;
		}
		removeFavorite: async(_parent: unknown, { articleUrl }: FavoriteArgs, context: Context): Promise<User> => {
			if (!context.user) {
				throw new AuthenticationError('Not authenticated');
			}
			const user = await User.findById(context.user._id);
			// TODO search user.favoriteStories for matching url and remove if found
			user.save();
			return user;		
		}
	}

}

export default resolvers;
