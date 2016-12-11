const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLNonNull,
  GraphQLID
} = require('graphql');

const dockerInfo = require('./types/dockerInfo');
const containerType = require('./types/container');
const imageType = require('./types/image');
const Docker = require('../docker');
const Promise = require('promise');

const dockerApi = new Docker();

// The root query type is where in the data graph we can start asking questions
const RootQueryType = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: () => ({
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
      },
    },
    containers: {
      type: new GraphQLList(containerType),
      resolve: () => {
        return new Promise((fulfill, reject) => {
          return dockerApi.containers.getAll(fulfill, reject);
        });
      }
    },
    images: {
      type: new GraphQLList(imageType),
      resolve: () => {
        return new Promise((fulfill, reject) => {
           return dockerApi.images.getAll((images) => {
             // Fulfill
             // transform images into or type
             // Each image item can produce more that one image. This is because of tags.
             // It contains RepoTag array.
             const resultingImages = images.reduce((result, image) => {
               if(image.RepoTags) {
                 result = result.concat(image.RepoTags.map((tag) => {
                   return {
                     Id: image.Id,
                     Repository: tag.split(':')[0],
                     Tag: tag.split(':')[1],
                     Created: image.Created,
                     Size: image.Size
                   }
                 }));
               } else {
                 result.push({
                   Id: image.Id,
                   Repository: '<none>',
                   Tag: '<none>',
                   Created: image.Created,
                   Size: image.Size
                 });
               }
               return result;
             }, []);

             fulfill(resultingImages);
           },
             reject
           );

        });
      }
    }
  })
});

const MyGraphQLSchema = new GraphQLSchema ({
  query: RootQueryType,
  //mutation: ...
});


module.exports = MyGraphQLSchema;