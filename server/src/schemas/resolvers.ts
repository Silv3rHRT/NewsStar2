import  User  from '../models/user.js'
import { signToken, AuthenticationError } from '../utils/auth.js'
import { IStory, FavoriteStory } from '../models/story.js'
import { SearchParams } from '../models/searchParams.js';
import { GraphQLScalarType } from 'graphql';
import { fetchNews, fetchSearch } from '../utils/news.js'

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
	emailOrUsername: string;
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
	imageUrl: string;
	category: string;
	articleUrl: string;
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
			return fetchNews();
		}
	},

	Mutation: {
		addUser: async (_parent: unknown, { username, email, password }: AddUserArgs): Promise<{ token: string; user: User }> => {
			const user = await User.create({ username, email, password });
			const token = signToken(user.username, user.email, user._id);

			return { token, user };
		},
		login: async (_parent: unknown, { emailOrUsername, password }: LoginArgs): Promise<{token: string; user: User }> => {

			
			console.log('search for user ', emailOrUsername)
			let user = await User.findOne({username: emailOrUsername});
		

			if (!user) {
				console.log('search for email ', emailOrUsername)
				user = await User.findOne({email: emailOrUsername});
			}
			if (!user) {
				console.log('not found')
				throw new AuthenticationError('invalid');
			}

			console.log('check password', password)
			if (!(await user.isCorrectPassword(password))) {
				throw new AuthenticationError('invalid');
			}
			console.log('user', user);
			const token = signToken( user?.username, user?.email, user._id);

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
		
			const params = new SearchParams({...args})
			user.searchHistory.push(params)
		 	user.save();
		
			return fetchSearch(args);
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
			console.log('args:', args)
			const fave = new FavoriteStory({...args})
			console.log('fave', fave)
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
