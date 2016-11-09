const express = require('express');
const curl = require('./utils/curl')();
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


app.get('/images', getImages);


app.listen(4000);
console.log('App is listening on port 4000');