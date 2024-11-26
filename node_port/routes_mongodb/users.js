require('dotenv').config()
const joi = require('joi');
const md5 = require('md5');
const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();
const db = require('./../db/mongodb');
const debug = require('debug')('app:users.js');
const adminUsers = require('./models/users');
const authGuard = require('../middlewares/admin_auth');

// schema for login validation
const userLoginSchema = joi.object({
    admin_email: joi.string().email().required(),
    admin_password: joi.string().required()
});

const userUpdateSchema = joi.object({
    admin_id: joi.string().required().custom(async function(value, helpers){
        try {
            let id = await adminUsers.findById(value);
            return value;
        } catch (e) {
            return false;
        }
    },'custom validation'),
    //admin_email: joi.string().email().required(),
    admin_name: joi.string().required(),
    admin_group: joi.string().required(),
})

router.post('/login', async function(req, res){
    try{
        const row = await userLoginSchema.validateAsync({ 
            admin_email: req.body.email, 
            admin_password: req.body.password 
        });        
        const result = await adminUsers.where({admin_email: row.admin_email, admin_password: md5(row.admin_password)}).findOne();

        if(result != null){
            const token = jwt.sign({admin_id : result._id, email: result.admin_email}, process.env.JWT_SECRET);
            res.status(200).send({status: true, token: token});
        }else{
            res.status(200).json({status: false, });
        }

    }catch(e){
        debug('Error : '+e.message);
        res.status(400).json({ status: "error", msg: "Error Occured", error: "error: "+e.message });
    }
});

router.get("/all", authGuard, async function(req, res){
    try{
        const result = await adminUsers.find().select('-admin_password').populate('admin_group');
        res.status(200).json({ status: true, results: result });
    }catch(e){
        debug('Error : '+e.message);
        res.status(400).json({ status: false, msg: "Error Occured", error: "error: "+e.message });
    }
});

router.post("/add_user", authGuard, async function(req, res){
    try{
        let user = await adminUsers.create({
            admin_email : 'admin@domain.com',
            admin_password : md5('password'),
            admin_name : 'Admin',
            admin_group : "6742f2e6f8789e5c24c1fa1a",
            admin_hash_for_email_verification : '',
            admin_hash_for_password_reset : '',
            admin_remember_me_token : '',
        });
        //await user.save();
        res.status(200).json({ status: "success", msg: "User is Added", results: user });
    }catch(e){
        debug("Error: "+e.message);
        res.status(500).json({ status: "error", msg: "Error Occured", error: "error: "+e.message });
    }
});

router.post("/update_user", authGuard, async function(req, res) {
    try{
        //if(!!req.body.admin_id){
        const row = await userUpdateSchema.validateAsync({ 
            admin_id: req.body.admin_id,
            //admin_email: req.body.admin_email, 
            //admin_password: req.body.password,
            admin_name: req.body.admin_name,
            admin_group: req.body.admin_group,
        });
        let admin_id = await row.admin_id;
        if(!admin_id){
            return res.status(500).json({status: true, msg: "Invalid data"})
        }else{                
            let result = await adminUsers.findById(admin_id);
            //result.admin_email = row.admin_email;
            result.admin_name = row.admin_name;
            result.admin_group = row.admin_group;
            result.save();
            return res.status(200).json({status: true, results: result});
        }
        
    }catch(e){
        debug("Error: "+e.message);
        res.status(500).json({ status: false, msg: "Error Occured", error: "error: "+e.message });
    }
});

module.exports = router;