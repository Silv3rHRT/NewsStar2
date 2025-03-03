const typeDefs = `

  scalar Date

  type SearchParams { # currently saving only search terms, extend in future releases
    _id: ID
    searchTerms: String
  }

  type User {
    _id: ID
    username: String
    email: String
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
	  imageUrl: String
	  category: String
	  articleUrl: String
  }


  type Query {
    user(userId: ID!): User
	  me: User
	  news: [Story]!
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
	  updateUser(username: String!, email: String!, password: String!): User
	  deleteUser: User
	  login(emailOrUsername: String!, password: String!): Auth
	  search(searchTerms: String!, from: Date, to: Date, sortBy: String): [Story]!
    addFavorite(title: String!, content: String!, imageUrl: String!, category: String!, articleUrl: String!): User
    removeFavorite(favoriteId: ID!): User
  }
`;

export default typeDefs;
