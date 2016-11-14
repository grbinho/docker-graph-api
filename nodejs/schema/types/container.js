const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull
} = require('graphql');

module.exports = new GraphQLObjectType({
  name: 'Container',
  fields: {
    Id: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'Id of the container. Short SHA.'
    },
    Image: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'Name of the image used.'
    }
  }
});


