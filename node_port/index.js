const express = require('express');
require('dotenv').config()
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser')
const db = require('./db/mysql');
const debug = require('debug')('app:index.js');
const usersRoute = require('./routes/users');
const userGroupsRoute = require('./routes/users_groups');

app.use(cors())
app.use(bodyParser.json()); // parse application/json

app.use('/users', usersRoute);
app.use('/users_groups', userGroupsRoute);

app.listen(process.env.PORT ,()=>{
    console.log('Server listening to port ', process.env.PORT);
    debug('Server listening to port ' + process.env.PORT);
})