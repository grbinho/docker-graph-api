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
    ID: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'Id of this host.'
    },
    Containers: {
      type: new GraphQLNonNull(GraphQLInt),
      description: 'Count of containers on the host.'
    }

  }
});