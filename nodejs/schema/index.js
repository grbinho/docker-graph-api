const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLID
} = require('graphql');

const MyType = require('./types/myType');

// The root query type is where in the data graph we can start asking questions
const RootQueryType = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    hello: {
      type: GraphQLString,
      description: "Hello world property",
      resolve: () => 'world'
    },
    myType: {
      type: MyType,
      description: "Just a toy type",
      args: {
        key: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve: (obj, args, ctx) =>  {
        //ctx is a global context passed into every resolver function
        if(args.key === "yui") {
          return {
            id: "yui",
            description: "Toy instance 1"
          }
        }
        else {
          return {
            description: ctx.defaultDescription
          }
        }
      }
    }
  }
});

const MyGraphQLSchema = new GraphQLSchema ({
  query: RootQueryType,
  //mutation: ...
});


module.exports = MyGraphQLSchema;