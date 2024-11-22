const mongoose = require('mongoose');
const conn = mongoose.createConnection(process.env.DB_URL);

conn.on('connected', function () {  
    console.log('Mongoose default connection is established');
}); 

// If the connection throws an error
conn.on('error',function (err) {  
    console.log('Mongoose default connection error: ' + err);
}); 

// When the connection is disconnected
conn.on('disconnected', function () {  
    console.log('Mongoose default connection disconnected'); 
});

module.exports = conn;