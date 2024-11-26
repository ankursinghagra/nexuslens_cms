const express = require('express');
require('dotenv').config()
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const debug = require('debug')('app:index.js');
let db_slug='none';
if(process.env.DB_USED=='mongodb'){
    db_slug='mongodb';
}
if(process.env.DB_USED=='mysql'){
    db_slug='mysql';
}
if(db_slug=='none'){
    debug("No DB found!");
    exit();
}
console.log(db_slug);
const usersRoute = require('./routes_'+db_slug+'/users');
const userGroupsRoute = require('./routes_'+db_slug+'/users_groups');

app.use(cors())
app.use(bodyParser.json()); // parse application/json

app.use('/users', usersRoute);
app.use('/users_groups', userGroupsRoute);

app.listen(process.env.PORT ,()=>{
    console.log('Server listening to port ', process.env.PORT);
    debug('Server listening to port ' + process.env.PORT);
})