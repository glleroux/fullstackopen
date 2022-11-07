import { gql } from '@apollo/client'

export const ALL_BOOKS = gql`
  query {
  allBooks {
     title
      author {
        name
        born
        bookCount
      }
      published
      genres
      id
    }
  }
`

export const BOOKS_BY_GENRE = gql`
  query byGenre ($genre: String) {
  allBooks(genre: $genre) {
    title
    author {
      name
    }
    published
  }
}
`

export const ALL_AUTHORS = gql`
  query {
  allAuthors {
      name
      born
      bookCount
    }
  }
`

export const ADD_BOOK = gql`
    mutation AddBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
        addBook(title: $title, author: $author, published: $published, genres: $genres) {
            title
            author {
              name
            }
            published
            genres
            id
        }
    }
`

export const EDIT_BYEAR = gql`
    mutation editAuthor ($name: String!, $setBornTo: Int!) {
        editAuthor(name: $name, setBornTo: $setBornTo) {
            name
            id
            born
            bookCount
        }
    }
`

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
`

export const ME = gql`
  query {
    me {
      username,
      favouriteGenre
    }
  }
`

export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      title
      author {
        name
      }
    }
  }
`
