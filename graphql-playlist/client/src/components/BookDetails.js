import React, { Component } from "react";
import { graphql } from "react-apollo";
import { getBookQuery } from "../queries/queries";

class BookDetails extends Component {
  getBookDetail() {
    const { book } = this.props.data;
    if (!book) {
      return <div>No book selected</div>;
    } else {
      return (
        <div>
          <h3>{book.name}</h3>
          <h3>{book.genre}</h3>
          <h3>{book.author.name}</h3>
        </div>
      );
    }
  }
  render() {
    return (
      <div>
        Book details:<div>{this.getBookDetail()}</div>
      </div>
    );
  }
}

export default graphql(getBookQuery, {
  options: (props) => {
    return {
      variables: {
        id: props.bookId,
      },
    };
  },
})(BookDetails);
