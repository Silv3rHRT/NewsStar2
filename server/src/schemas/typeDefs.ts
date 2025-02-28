const typeDefs = `
  type SearchParams { # currently saving only search terms, extend in future releases
    _id: ID
    searchTerms: String
  }

  type User {
    _id: ID
    username: String
    password: String
	searchHistory: [SearchParams]
	favoriteStories: [String] # favorite stories keyed by URL, *not ID*
  }

  type Auth {
  	token: ID!
	user: User
  }

  type Story {
    _id: ID
	title: String
	content: String
	image_url: String
	category: String
	article_url: String
  }

  type Query {
    user(userId: ID!): User
	me(): User
	news(): [Story]!
  }

  type Mutation {
    adduser(username: string!, password: string!): Auth
	updateuser(username: string!, password: string!): User
	deleteUser(): User
	login(username: String!, password: String!): Auth
	search(searchTerms: String!): [Story]!
    addFavorite(article_url: String!): User
    removeFavorite(article_url: String!) User
  }
`;

export default typeDefs;
