const joi = require('joi');
const md5 = require('md5');
require('dotenv').config()
const express = require('express');
const router = express.Router();
const db = require('../db/mysql');
const debug = require('debug')('app:users.js');
const jwt = require('jsonwebtoken');
const authGuard = require('../middlewares/admin_auth');

// schema for login validation
const userLoginSchema = joi.object({
    admin_email: joi.string().email().required(),
    admin_password: joi.string().required()
});

// blank route
router.get('/', (req, res) => {
    res.send('');
});

// this gets all the user in database
router.get('/all', authGuard, (req, res)=>{
    try{
        console.log(req.body.decoded);
        db.query("SELECT * FROM admin_users AS U JOIN admin_groups AS G ON G.admin_group_id=U.admin_group ", (err, rows, fields)=>{
            if (err) throw err
            res.send(rows);
            debug('visited /users/all');
        });
    } catch(ex){
        debug(ex.message);
        res.status(500).send('ERROR: '+ex.message);
    }
});

// user to validate a user and generate a token
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

// important system information can be sent from here
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

// info of currently logged in user
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

// get single user information
router.post('/user_data', authGuard, async(req, res)=>{
    try{
        console.log(req.body);
        if(req.body.id){
            db.query("SELECT admin_id,admin_email,admin_name,admin_group FROM admin_users WHERE admin_id = '"+req.body.id+"' LIMIT 1 ", (err, rows, fields)=>{
                if (err) throw err
                res.send({
                    status: true,
                    user_data: rows[0]
                });
                debug('visited /users/user_data');
            });
        }else{
            res.status(400).send('ERROR: id not found');
        }
    }
    catch(ex){
        debug(ex.message);
        res.status(500).send('ERROR: '+ex.message);
    }
});

// update a single user information
router.put('/user_data', authGuard, async(req, res)=>{
    try{
        //console.log(req.body);
        if(req.body.id){
            db.query("SELECT admin_id,admin_email,admin_name,admin_group FROM admin_users WHERE admin_id = '"+req.body.id+"' LIMIT 1 ", (err, rows, fields)=>{
                if (err) throw err
                let update_obj = [];
                if(req.body.name != undefined){ update_obj.push("`admin_name` = '"+req.body.name+"'"); }
                if(req.body.email != undefined){ update_obj.push("`admin_email` = '"+req.body.email+"'"); }
                if(req.body.group_id != undefined){ update_obj.push("`admin_group` = '"+req.body.group_id+"'"); }
                if(update_obj.length > 0){
                    let update_str = "UPDATE admin_users SET "+update_obj.join(" , ")+" WHERE admin_id = "+req.body.id;
                    db.query(update_str, (err2,rows2, fields2)=>{
                        res.send({
                            status: true,
                        });
                        debug('visited /users/user_data');
                    });
                }else{
                    res.send({
                        status: true,
                    });
                    debug('visited /users/user_data');
                }
                
            });
        }else{
            res.status(400).send('ERROR: id not found');
        }
    }
    catch(ex){
        debug(ex.message);
        res.status(500).send('ERROR: '+ex.message);
    }
});

module.exports = router;