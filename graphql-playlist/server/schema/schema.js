const graphql = require("graphql");
const _ = require("lodash");

const books = [
  {
    id: "1",
    name: "Book 1",
    genre: "Genre 1",
    authorId: "1",
  },
  {
    id: "2",
    name: "Book 2",
    genre: "Genre 2",
    authorId: "2",
  },
  {
    id: "3",
    name: "Book 3",
    genre: "Genre 3",
    authorId: "3",
  },
  {
    id: "4",
    name: "Book 4",
    genre: "Genre 4",
    authorId: "2",
  },
  {
    id: "5",
    name: "Book 5",
    genre: "Genre 5",
    authorId: "3",
  },
];

const authors = [
  {
    id: "1",
    name: "Author 1",
    age: 44,
  },
  {
    id: "2",
    name: "Author 2",
    age: 56,
  },
  {
    id: "3",
    name: "Author 3",
    age: 30,
  },
];

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList
} = graphql;

const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve(parent, args) {
        return _.find(authors, { id: parent.authorId });
      },
    },
  }),
});

const AuthorType = new GraphQLObjectType({
  name: "Author",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    books: {
        type: new GraphQLList(BookType),
        resolve(parent, args){
            return _.filter(books, {authorId: parent.id})
        }
    }
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    book: {
      type: BookType,
      args: {
        id: { type: GraphQLID },
      },
      resolve(parent, args) {
        return _.find(books, { id: args.id });
      },
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return _.find(authors, { id: args.id });
      },
    },
    books: {
        type: GraphQLList(BookType),
        resolve(parent, args){
            return books
        }
    },
    authors: {
        type: GraphQLList(AuthorType),
        resolve(parent, args){
            return authors
        }
    }
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
