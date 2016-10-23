const express = require('express');
const graphqlHTTP = require('express-graphql');
const MyGraphQLSchema = require('./schema');

const app = express();

app.use('/graphql', graphqlHTTP({
  schema: MyGraphQLSchema,
  graphiql: true,
  context: {
    defaultDescription: "Wow. I'm global"
  }
}));

app.listen(4000);