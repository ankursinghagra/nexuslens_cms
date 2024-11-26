require('dotenv').config()
const express = require('express');
const router = express.Router();
const db = require('./../db/mongodb');
const debug = require('debug')('app:users_groups.js');
const adminGroups = require('./models/users_groups');

router.get('/all', async function(req, res) {
    try {
        const result = await adminGroups.all();
        res.status(200).json({ status: true, results: result });
    } catch (e) {
        debug("Error: "+e.message);
        res.status(500).json({ status: "error", msg: "Error Occured", error: "error: "+e.message });
    }
});
router.post('/add', async function(req, res) {
    try{
        let group = await adminGroups.create({
            admin_group_name: 'Executives',
            admin_group_permissions: [
                "admin_users:view",
                "admin_users:modify",
                "admin_users:delete",
                "admin_groups:view",
                "admin_groups:modify",
                "admin_groups:delete"
            ],
        });
        res.status(200).json({ status: "success", msg: "Group is Added", results: group });
    }catch(e){
        debug("Error: "+e.message);
        res.status(500).json({ status: "error", msg: "Error Occured", error: "error: "+e.message });
    }
});

module.exports = router;