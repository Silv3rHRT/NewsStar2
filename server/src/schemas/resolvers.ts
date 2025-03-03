import  User  from '../models/user.js'
import { signToken, AuthenticationError } from '../utils/auth.js'
import { IStory, FavoriteStory } from '../models/story.js'
import { SearchParams } from '../models/searchParams.js';
import { GraphQLScalarType } from 'graphql';

const dateScalar = new GraphQLScalarType({
  name: 'Date',
  parseValue(value: any) {
    return new Date(value);
  },
  serialize(value: any) {
    return value.toISOString();
  },
})

interface User {
	_id: string;
	username: string;
	password: string;
}

interface UserIdArgs {
	userId: string;
}

interface AddUserArgs {
	username: string;
	email: string;
	password: string;
}

interface LoginArgs {
	usernameOrEmail: string;
	password: string;
}

interface SearchArgs {
 	searchTerms: string;
 	to?: Date;
 	from?: Date;
 	sortBy?: string;
}

interface AddFavoriteArgs {
	title: string;
	content: string;
	image_url: string;
	category: string;
	article_url: string;
}

interface RemoveFavoriteArgs {
	_id: string;
}

interface Context {
	user?: User;
}

const resolvers = {
	Date: dateScalar,

	Query: {
		user: async (_parent: unknown, { userId }: UserIdArgs): Promise<User | null> => {
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
		addUser: async (_parent: unknown, { username, email, password }: AddUserArgs): Promise<{ token: string; user: User }> => {
			const user = await User.create({ username, email, password });
			const token = signToken(user.username, user._id);

			return { token, user };
		},
		login: async (_parent: unknown, { usernameOrEmail, password }: LoginArgs): Promise<{token: string; user: User }> => {
			let user = await User.findOne({username: usernameOrEmail});
			if (!user) {
				user = await User.findOne({email: usernameOrEmail});
			}
			if (!user) {
				throw new AuthenticationError('invalid');
			}

			if (!(await user.isCorrectPassword(password))) {
				throw new AuthenticationError('invalid');
			}

			const token = signToken(user.username, user._id);

			return { token, user };
		},
		updateUser: async(_parent: unknown, { username, email, password }: AddUserArgs, context: Context): Promise<User | null> => {
			if (!context.user) {
				throw new AuthenticationError('Not authenticated');
			}
			return await User.findByIdAndUpdate(context.user._id, { username, email, password }, {new: true})
		},
		deleteUser: async(_parent: unknown, _args: unknown, context: Context): Promise<User | null> => {
			if (!context.user) {
				throw new AuthenticationError('Not authenticated');
			}
			return await User.findByIdAndDelete(context.user._id);
		},
		search: async(_parent: unknown, args: SearchArgs, context: Context): Promise<Array<IStory>> => {
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
		addFavorite: async(_parent: unknown, args: AddFavoriteArgs, context: Context): Promise<User> => {
			if (!context.user) {
				throw new AuthenticationError('Not authenticated');
			}
			const user = await User.findById(context.user._id);
			if (user == null) {
				throw new AuthenticationError('User not found')
			}
			// TODO create a new favoriteStorySchema and push into user.favoriteStories
			const fave = new FavoriteStory({...args})
			user.favoriteStories.push(fave)
			user.save();
			return user;
		},
		removeFavorite: async(_parent: unknown, { _id }: RemoveFavoriteArgs, context: Context): Promise<User> => {
			if (!context.user) {
				throw new AuthenticationError('Not authenticated');
			}
			const user = await User.findById(context.user._id);
			if (user == null) {
				throw new AuthenticationError('User not found')
			}
			// TODO search user.favoriteStories for matching url and remove if found
			const index = user.favoriteStories.findIndex(element => element._id == _id)
			if (index >= 0) {
				user.favoriteStories.splice(index, 1)
			}
			user.save();
			return user;		
		}
	}

}

export default resolvers;
