const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull
} = require('graphql');

module.exports = new GraphQLObjectType({
  name: 'Image',
  fields: {
    Id: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'Id of the image. Short SHA.'
    },
    Repository: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'Image repository name.'
    },
    Tag: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'Image tag.'
    },
    Created: {
      type: new GraphQLNonNull(GraphQLInt),
      description: 'Created timestamp.'
    },
    Size: {
      type: new GraphQLNonNull(GraphQLInt),
      description: 'Size of the image.'
    }
  }
});


