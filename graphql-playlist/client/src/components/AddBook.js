import React, { Component } from "react";
import { graphql } from "react-apollo";
import { flowRight as compose } from "lodash";
import { getAuthorsQuery, addBookMutation, getBooksQuery } from "../queries/queries";

class AddBook extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      genre: "",
      authorId: "",
    };
  }
  onBookAdd(e) {
    e.preventDefault();
    this.props.addBookMutation({
      variables: {
        name: this.state.name,
        genre: this.state.genre,
        authorId: this.state.authorId,
      },
      refetchQueries: [{query: getBooksQuery}]
    });
  }
  displayAuthors() {
    if (!this.props.getAuthorsQuery.loading) {
      return this.props.getAuthorsQuery.authors.map((author) => (
        <option value={author.id} key={author.id}>
          {author.name}
        </option>
      ));
    }
  }
  render() {
    return (
      <form onSubmit={this.onBookAdd.bind(this)}>
        <div>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            onChange={(e) => this.setState({ name: e.target.value })}
          />
        </div>
        <div>
          <label htmlFor="genre">Genre</label>
          <input
            id="genre"
            onChange={(e) => this.setState({ genre: e.target.value })}
          />
        </div>
        <div>
          <label htmlFor="authorId">Author</label>
          <select
            id="authorId"
            onChange={(e) => this.setState({ authorId: e.target.value })}
          >
            <option>Select Author</option>
            {this.displayAuthors()}
          </select>
        </div>
        <button type="submit">Add</button>
      </form>
    );
  }
}

export default compose(
  graphql(getAuthorsQuery, { name: "getAuthorsQuery" }),
  graphql(addBookMutation, { name: "addBookMutation" })
)(AddBook);
