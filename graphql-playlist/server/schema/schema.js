const graphql = require("graphql");
const _ = require("lodash");

const books = [
  {
    id: "1",
    name: "Book 1",
    genre: "Genre 1",
  },
  {
    id: "2",
    name: "Book 2",
    genre: "Genre 2",
  },
  {
    id: "3",
    name: "Book 3",
    genre: "Genre 3",
  },
];

const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID } = graphql;

const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
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
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
