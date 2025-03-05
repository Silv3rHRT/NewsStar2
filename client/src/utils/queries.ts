import { gql } from '@apollo/client'


export const QUERY_ME = gql`query Me {
  me {
    _id
    email
    searchHistory {
      _id
      from
      searchTerms
      sortBy
      to
    }
    favoriteStories {
      _id
      articleUrl
      category
      content
      imageUrl
      title
    }
  }
}`

export const NEWS = gql`
query News {
  news {
    title
    content
    imageUrl
    category
    articleUrl
  }
}`