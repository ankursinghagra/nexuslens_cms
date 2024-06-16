require('dotenv').config()
const jwt = require('jsonwebtoken');

module.exports = function(req, res, next){
    let token = req.header('x-auth-token');
    if(token && token.length > 0){
        try{
            let decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.body.decoded = decoded;
            next();
        }catch(ex){
            res.status(400).send("ERROR:"+ex.message);
        }
    }else{
        res.status(400).send("Token not found");
    }
}