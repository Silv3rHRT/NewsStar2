const typeDefs = `

  scalar Date

  type SearchParams { # currently saving only search terms, extend in future releases
    _id: ID
    searchTerms: String
    from: Date
    to: Date
    sortBy: String
  }

  type Story {
	  title: String
	  content: String
	  imageUrl: String
	  category: String
	  articleUrl: String
  }

  type FavoriteStory {
    _id: ID
	  title: String
	  content: String
	  imageUrl: String
	  category: String
	  articleUrl: String
  }

  type User {
    _id: ID
    username: String
    email: String
    password: String
	  searchHistory: [SearchParams]
	  favoriteStories: [FavoriteStory] 
  }

  type SearchResults {
    stories: [Story]
    user: User
  }

  type Auth {
  	token: ID!
	  user: User
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
	  search(searchTerms: String!, from: Date, to: Date, sortBy: String): SearchResults
    addFavorite(title: String!, content: String!, imageUrl: String!, category: String!, articleUrl: String!): User
    removeFavorite(favoriteId: ID!): User
  }
`;

export default typeDefs;
