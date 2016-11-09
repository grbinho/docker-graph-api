const curl = require('./utils/curl')();

// This file is used to explore docker APIs

// Get all images

var images = curl.get('images/json?all=0', (result) => {
  console.log('result: ', JSON.stringify(result, null, 4));
}, (error) => {
  console.error('error', error);
});

