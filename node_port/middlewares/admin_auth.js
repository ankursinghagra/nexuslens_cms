require('dotenv').config()
const jwt = require('jsonwebtoken');
const db = require('../db/mysql');

module.exports = function(req, res, next){
    let token = req.header('x-auth-token');
    if(token && token.length > 0){
        try{
            let decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.body.decoded = decoded;

            db.query("SELECT * FROM admin_users AS U JOIN admin_groups AS G ON U.admin_group = G.admin_group_id LIMIT 1", 
            (err, rows, fields)=>{
                req.view_permissions = JSON.parse(rows[0].view_permissions);
                req.modify_permissions = JSON.parse(rows[0].modify_permissions);
                next();
            });

        }catch(ex){
            res.status(400).send("ERROR:"+ex.message);
        }
    }else{
        res.status(400).send("Token not found");
    }
}