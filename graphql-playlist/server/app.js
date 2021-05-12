const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const mongooose = require('mongoose');

mongooose.connect('mongodb://localhost:27017/graphql-playlist');
mongooose.connection.once('open', () => {
  console.log("Connected to db")
})

const schema = require("./schema/schema");

const app = express();

app.use("/graphql", graphqlHTTP({ schema, graphiql: true }));

app.listen(4000, () => {
  console.log("Listening on port 4000");
});
