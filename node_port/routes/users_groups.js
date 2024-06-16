const express = require('express');
const router = express.Router();
const db = require('../db/mysql');
const debug = require('debug')('app:users_groups.js');
const authGuard = require('../middlewares/admin_auth');

router.get('/', (req, res)=>{
    res.send('');
})

router.get('/all', authGuard, (req, res)=>{
    try{
        db.query("SELECT * FROM admin_groups", (err, rows, fields)=>{
            if (err) throw err
            res.send(rows);
            debug('visited /users_groups/all');
        });
    } catch(ex){
        res.status(500).send('ERROR: '+ex.message);
    }
})

module.exports = router;