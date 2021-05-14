import { gql } from "apollo-boost";

const getBooksQuery = gql`
  {
    books {
      name
      genre
      id
    }
  }
`;

const getAuthorsQuery = gql`
  {
    authors {
      name
      age
      id
    }
  }
`;

const addBookMutation = gql`
  mutation AddBook($name: String!, $genre: String!, $authorId: ID!) {
    addBook(name: $name, genre: $genre, authorId: $authorId) {
      name
      genre
    }
  }
`;

const getBookQuery = gql`
query GetBook($id: ID) {
  book(id: $id){
    name
    genre
    author{
      name
      age
      books{
        name
      }
    }
  }
}
`;

export { getBooksQuery, getAuthorsQuery, addBookMutation, getBookQuery };
