const joi = require('joi');
const md5 = require('md5');
require('dotenv').config()
const express = require('express');
const router = express.Router();
const db = require('../db/mysql');
const debug = require('debug')('app:users.js');
const jwt = require('jsonwebtoken');
const authGuard = require('../middlewares/admin_auth');

const userLoginSchema = joi.object({
    admin_email: joi.string().email().required(),
    admin_password: joi.string().required()
});

router.get('/', (req, res) => {
    res.send('');
});

router.get('/all', authGuard, (req, res)=>{
    try{
        console.log(req.body.decoded);
        db.query("SELECT * FROM admin_users", (err, rows, fields)=>{
            if (err) throw err
            res.send(rows);
            debug('visited /users/all');
        });
    } catch(ex){
        debug(ex.message);
        res.status(500).send('ERROR: '+ex.message);
    }
});

router.post('/login', async (req, res)=>{
    try{
        const row = await userLoginSchema.validateAsync({ admin_email: req.body.email, admin_password: req.body.password });
        db.query("SELECT * FROM admin_users WHERE admin_email = '"+row.admin_email+"' AND admin_password='"+md5(row.admin_password)+"' LIMIT 1", (err, rows, fields) =>{
            if(err) {
                return res.status(401).send('bad request');
            }
            if(rows.length>0){
                const token = jwt.sign({email: rows[0].admin_email}, process.env.JWT_SECRET);
                res.send({status: true, token: token});
            }else{
                res.status(200).send({status: false, msg: 'Invalid email or password'});
            }
        });
    }
    catch(ex){
        debug('Error : ', ex.message);
        res.status(400).send('Error : '+ex.message);
    }
});

router.get('/systeminfo', async (req, res)=>{
    try{
        db.query("SELECT * FROM `admin_groups` ORDER BY `admin_groups`.`admin_group_id` ASC", 
        (err, rows, fields)=>{
            if(err) {
                return res.status(401).send('bad request');
            }
            if(rows.length>0){

                res.send({status: true, groups: rows,});
            }
        });
    }
    catch(ex){
        debug('Error : ', ex.message);
        res.status(400).send('Error : '+ex.message);
    }
});

router.post('/userinfo', authGuard, async(req, res)=>{
    try{
        console.log(req.body.decoded);
        let email = req.body.decoded.email;
        db.query("SELECT admin_email,admin_email_verified,admin_group,admin_id,admin_name,admin_photo FROM admin_users WHERE admin_email = '"+email+"' LIMIT 1 ", (err, rows, fields)=>{
            if (err) throw err
            res.send(rows[0]);
            debug('visited /users/userinfo');
        });
    } catch(ex){
        debug(ex.message);
        res.status(500).send('ERROR: '+ex.message);
    }
})

module.exports = router;