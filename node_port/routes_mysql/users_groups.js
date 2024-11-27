const express = require("express");
const router = express.Router();
const db = require("../db/mysql");
const debug = require("debug")("app:users_groups.js");
const authGuard = require("../middlewares/admin_auth");
const default_permissions = require("../db/default_permissions");

// blank route
router.get("/", (req, res) => {
  res.send("");
});

// get all the groups
router.get("/all", authGuard, (req, res) => {
  try {
    if (
      req.view_permissions.module_groups != undefined &&
      req.view_permissions.module_groups
    ) {
      db.query("SELECT * FROM admin_groups", (err, rows, fields) => {
        if (err) throw err;
        res.send(rows);
        debug("visited /users_groups/all");
      });
    } else {
      res.send({
        status: false,
        msg: "You dont have permissions to view",
      });
    }
  } catch (ex) {
    res.status(500).send("ERROR: " + ex.message);
  }
});

// get single group data
router.post("/group_data", authGuard, (req, res) => {
  try {
    if (
      req.view_permissions.module_groups != undefined &&
      req.view_permissions.module_groups
    ) {
      if (req.body.id) {
        db.query(
          "SELECT * FROM admin_groups WHERE admin_group_id = '" +
            req.body.id +
            "' LIMIT 1",
          (err, rows, fields) => {
            if (err) throw err;
            res.send({
              status: true,
              user_data: rows[0],
            });
            debug("visited /users_groups/group_data");
          }
        );
      } else {
        res.status(400).send("ERROR: id not found");
      }
    } else {
      res.send({
        status: false,
        msg: "You dont have permissions to view",
      });
    }
  } catch (ex) {
    res.status(500).send("ERROR: " + ex.message);
  }
});

// update single group data
router.put("/group_data", authGuard, (req, res) => {
  try {
    if (
      req.view_permissions.module_groups != undefined &&
      req.view_permissions.module_groups
    ) {
      if (req.body.id) {
        db.query(
          "SELECT * FROM admin_groups WHERE admin_group_id = '" +
            req.body.id +
            "' LIMIT 1",
          (err, rows, fields) => {
            if (err) throw err;
            let update_obj = [];
            if (req.body.name != undefined) {
              update_obj.push("`group_name` = '" + req.body.name + "'");
            }
            if (req.body.color != undefined) {
              update_obj.push("`group_color` = '" + req.body.color + "'");
            }
            if (update_obj.length > 0) {
              let update_str =
                "UPDATE admin_groups SET " +
                update_obj.join(" , ") +
                " WHERE admin_group_id = " +
                req.body.id;
              db.query(update_str, (err2, rows2, fields2) => {
                res.send({
                  status: true,
                });
                debug("visited /users_groups/group_data");
              });
            } else {
              res.send({
                status: true,
              });
              debug("visited /users_groups/group_data");
            }
          }
        );
      } else {
        res.status(400).send("ERROR: id not found");
      }
    } else {
      res.send({
        status: false,
        msg: "You dont have permissions to view",
      });
    }
  } catch (ex) {
    res.status(500).send("ERROR: " + ex.message);
  }
});

// get all groups with permissions
router.post("/group_permissions", authGuard, (req, res) => {
  try {
    if (
      req.view_permissions.module_groups != undefined &&
      req.view_permissions.module_groups
    ) {
      if (req.body.id) {
        db.query("SELECT * FROM admin_groups ", (err, rows, fields) => {
          if (err) throw err;
          res.send({
            status: true,
            user_data: rows[0],
          });
          debug("visited /users_groups/group_data");
        });
      } else {
        res.status(400).send("ERROR: id not found");
      }
    } else {
      res.send({
        status: false,
        msg: "You dont have permissions to view",
      });
    }
  } catch (ex) {
    res.status(500).send("ERROR: " + ex.message);
  }
});

module.exports = router;
