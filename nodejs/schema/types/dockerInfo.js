const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLInt,
  GraphQLString,
  GraphQLNonNull
} = require('graphql');

module.exports = new GraphQLObjectType({
  name: 'dockerInfo',
  fields: {
    ID: { type: new GraphQLNonNull(GraphQLString) },
    Containers: { type: new GraphQLNonNull(GraphQLInt) }
  }
});