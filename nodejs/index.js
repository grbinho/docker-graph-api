const express = require('express');
const curl = require('./utils/curl')(null, 'localhost', 2375);
// const graphqlHTTP = require('express-graphql');
// const MyGraphQLSchema = require('./schema');

const app = express();

// app.use('/graphql', graphqlHTTP({
//   schema: MyGraphQLSchema,
//   graphiql: true,
//   context: {
//     defaultDescription: "Wow. I'm global"
//   }
// }));


const getImages = (req, res) => {
  curl.get('images/json?all=0', (result) => {
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