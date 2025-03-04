import { gql } from '@apollo/client';

export const LOGIN = gql`mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
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
    articleUrl
    category
    content
    imageUrl
    title
  }
}`

export const ADD_FAVORITE= gql`mutation Mutation($title: String!, $content: String!, $imageUrl: String!, $category: String!, $articleUrl: String!) {
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