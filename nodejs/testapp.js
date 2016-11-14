const Docker = require('./docker');

// This file is used to explore docker APIs

// Get all images

const dockerApi = new Docker();

dockerApi.images.getAll((result) => {
  console.log('Images: ', JSON.stringify(result, null, 4));
}, (error) => {
  console.error('error', error);
});

dockerApi.info.get((result) => {
  console.log('Info: ', JSON.stringify(result, null, 4));
}, (error) => {
  console.error('error', error);
});

