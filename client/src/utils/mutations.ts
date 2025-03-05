import { gql } from '@apollo/client';

export const LOGIN = gql`mutation login($emailOrUsername: String!, $password: String!) {
  login(emailOrUsername: $emailOrUsername, password: $password) {
    token
    user {
      _id
      email
      username
      password
    }
  }
}`;

export const SIGN_UP = gql`mutation AddUser($username: String!, $email: String!, $password: String!) {
  addUser(username: $username, email: $email, password: $password) {
    token
    user {
      _id
      email
      username
    }
  }
}`

export const SEARCH = gql`mutation Mutation($searchTerms: String!, $from: Date, $to: Date, $sortBy: String) {
  search(searchTerms: $searchTerms, from: $from, to: $to, sortBy: $sortBy) {
   stories {
      title
      articleUrl
      category
      imageUrl
      content
    }
    user {
      favoriteStories {
        _id
        articleUrl
      }
    }
  }
}`

export const ADD_FAVORITE= gql`mutation AddFavorite($title: String!, $content: String!, $imageUrl: String!, $category: String!, $articleUrl: String!) {
  addFavorite(title: $title, content: $content, imageUrl: $imageUrl, category: $category, articleUrl: $articleUrl) {
    _id
    username
    email
    searchHistory {
      _id
      searchTerms
      from
      to
      sortBy
    }
    favoriteStories {
      _id
      title
      content
      imageUrl
      category
      articleUrl
    }
  }
}`

export const REMOVE_FAVORITE = gql`
mutation RemoveFavorite($favoriteId: ID!) {
  removeFavorite(favoriteId: $favoriteId) {
    username
  }
}`