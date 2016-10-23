const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString
} = require('graphql');

module.exports = new GraphQLObjectType({
  name: 'MyType',
  fields: {
    id: { type: GraphQLID },
    description: { type: GraphQLString }
  }
});