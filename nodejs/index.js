const express = require('express');
const cors = require('cors');
const graphqlHTTP = require('express-graphql');
const MyGraphQLSchema = require('./schema');

const app = express();

app.use(cors());

app.use('/graphql', graphqlHTTP({
  schema: MyGraphQLSchema,
  graphiql: true,
  context: {
    defaultDescription: "Wow. I'm global"
  }
}));


//TODO: Add a query string parameter for formatting the output (?? f)
//
//
const Docker = require('./docker');

const dockerApi = new Docker();

const getImages = (req, res) => {
  dockerApi.images.getAll((result) => {
    res.send(result);
  }, (error) => {
    console.error('error', error);
  });
};

const getInfo = (req, res) => {
  curl.get('info', (result) => {
    res.send(result);
  }, (error) => {
    console.error('Error retrieving docker info: ', error);
  });
};


app.get('/images', getImages);
app.get('/info', getInfo);

app.listen(4000);
console.log('App is listening on port 4000');