import  User  from '../models/user.js'
import { signToken, AuthenticationError } from '../utils/auth.js'
//import { ISearchParams } from '../models/searchParams.js'
import { IStory } from '../models/story.js'
import { SearchParams } from '../models/searchParams.js';

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
		me: async (_parent: unknown, _args: unknown, context: Context): Promise<User | null> => {
			if (!context.user) {
				throw new AuthenticationError('Not authenticated');
			}
			return await User.findOne({ _id: context.user._id });
		},
		news: async (): Promise<Array<IStory>> => {
			// TODO call api to fetch stories from external source
			return []
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
		search: async(_parent: unknown, /*{ searchTerms, from, to, sortBy }*/args: SearchArgs, context: Context): Promise<Array<IStory>> => {
		if (!context.user) {
			throw new AuthenticationError('Not authenticated');
		}
			const user = await User.findById(context.user._id);
			if (user == null) {
				throw new AuthenticationError('User not found')
			}
		// 	// TODO create a new searchTermsSchema and push into user.searchHistory
			const params = new SearchParams({...args})
			user.searchHistory.push(params)
		 	user.save();
		// 	// TODO call external api to fetch stories
			return [];
		},
		addFavorite: async(_parent: unknown, { article_url }: FavoriteArgs, context: Context): Promise<User> => {
			if (!context.user) {
				throw new AuthenticationError('Not authenticated');
			}
			const user = await User.findById(context.user._id);
			if (user == null) {
				throw new AuthenticationError('User not found')
			}
			// TODO create a new favoriteStorySchema and push into user.favoriteStories
			article_url = article_url // remove later
			user.save();
			return user;
		},
		removeFavorite: async(_parent: unknown, { article_url }: FavoriteArgs, context: Context): Promise<User> => {
			if (!context.user) {
				throw new AuthenticationError('Not authenticated');
			}
			const user = await User.findById(context.user._id);
			if (user == null) {
				throw new AuthenticationError('User not found')
			}
			// TODO search user.favoriteStories for matching url and remove if found
			article_url = article_url // remove later
			user.save();
			return user;		
		}
	}

}

export default resolvers;
