import React, { Component } from "react";
import { gql } from "apollo-boost";
import { graphql } from "react-apollo";

const getBooksQuery = gql`
  {
    books {
      name
      genre
    }
  }
`;

class BookList extends Component {
  render() {
    return (
      <ul>
        <li>Book1</li>
      </ul>
    );
  }
}
export default graphql(getBooksQuery)(BookList);
