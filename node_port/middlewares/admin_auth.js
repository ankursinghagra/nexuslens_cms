require("dotenv").config();
const jwt = require("jsonwebtoken");

let db_slug = "none";
if (process.env.DB_USED == "mongodb") {
  db_slug = "mongodb";
}
if (process.env.DB_USED == "mysql") {
  db_slug = "mysql";
}
if (db_slug == "none") {
  debug("No DB found!");
  exit();
}
const db = require("../db/" + db_slug);
const adminUsers = require("../routes_mongodb/models/users");

if (process.env.DB_USED == "mysql") {
  module.exports = function (req, res, next) {
    let token = req.header("x-auth-token");
    if (token && token.length > 0) {
      try {
        let decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.body.decoded = decoded;

        db.query(
          "SELECT * FROM admin_users AS U JOIN admin_groups AS G ON U.admin_group = G.admin_group_id LIMIT 1",
          (err, rows, fields) => {
            req.view_permissions = JSON.parse(rows[0].view_permissions);
            req.modify_permissions = JSON.parse(rows[0].modify_permissions);
            next();
          }
        );
      } catch (ex) {
        res.status(400).send("ERROR:" + ex.message);
      }
    } else {
      res.status(400).send("Token not found");
    }
  };
}

if (process.env.DB_USED == "mongodb") {
  module.exports = async function (req, res, next) {
    let token = req.header("x-auth-token");
    if (token && token.length > 0) {
      try {
        let decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.body.decoded = decoded;
        const result = await adminUsers
          .findById(req.body.decoded.admin_id)
          .select("-admin_password")
          .populate("admin_group");
        req.admin_permissions = result.admin_group.admin_group_permissions;
        next();
      } catch (ex) {
        res.status(400).send("ERROR:" + ex.message);
      }
    } else {
      res.status(400).send("Token not found");
    }
  };
}
