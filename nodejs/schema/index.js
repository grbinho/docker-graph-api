const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLID
} = require('graphql');

const dockerInfo = require('./types/dockerInfo');
const Docker = require('../docker');
const Promise = require('promise');

const dockerApi = new Docker();

// The root query type is where in the data graph we can start asking questions
const RootQueryType = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    hello: {
      type: GraphQLString,
      description: "Hello world property",
      resolve: () => 'world'
    },
    info: {
      type: dockerInfo,
      ID: "Daemon Id",
      Containers: 0,
      resolve: (obj, args, ctx) =>  {
        //ctx is a global context passed into every resolver function
        return new Promise((fulfill, reject) => {
          return dockerApi.info.get(fulfill, reject);
        });
      }
    }
  }
});

const MyGraphQLSchema = new GraphQLSchema ({
  query: RootQueryType,
  //mutation: ...
});


module.exports = MyGraphQLSchema;