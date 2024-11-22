const express = require('express');
require('dotenv').config()
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
let db_slug='mysql';
if(process.env.DB_USED=='mongodb'){
    db_slug='mongodb';
    //const db = require('./db/mongodb');
}
const debug = require('debug')('app:index.js');
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