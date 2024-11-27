const debug = require("debug")("app:mongodb.js");
const mongoose = require("mongoose");
debug("Trying to connect ... ");
const conn = mongoose.connect(process.env.MONGODB_URL, {
  dbName: process.env.MONGODB_NAME,
});

/* conn.on('connected', function () {  
    debug('Mongoose default connection is established');
}); 

// If the connection throws an error
conn.on('error',function (err) {  
    debug('Mongoose default connection error: ' + err);
}); 

// When the connection is disconnected
conn.on('disconnected', function () {  
    debug('Mongoose default connection disconnected'); 
}); */

module.exports = conn;
