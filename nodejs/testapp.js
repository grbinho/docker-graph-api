const curl = require('./utils/curl')();

// This file is used to explore docker APIs

// Get all immages

var images = curl.get('images/json');

console.log('Images', images);

