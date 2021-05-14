import React, { Component } from "react";
import { graphql } from "react-apollo";
import { getBooksQuery } from "../queries/queries";
import BookDetails  from "./BookDetails";

class BookList extends Component {
  constructor() {
    super();
    this.state = {
      selected: null,
    };
  }
  displayBooks() {
    if (this.props.data.loading) {
      return <span>Loading...</span>;
    } else {
      return this.props.data.books.map((book) => (
        <li onClick={() => this.setState({ selected: book.id })} key={book.id}>
          {book.name}
        </li>
      ));
    }
  }
  render() {
    return (
      <div>
        <ul>{this.displayBooks()}</ul>
        <BookDetails bookId={this.state.selected} />
      </div>
    );
  }
}
export default graphql(getBooksQuery)(BookList);
