const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const adminUsersGroupsSchema = new Schema({
  admin_group_name: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
  },
  admin_group_permissions: { type: Array },
  admin_created_at: { type: Date, required: true, default: Date.now },
  admin_modified_at: { type: Date, required: true, default: Date.now },
});

module.exports = new mongoose.model("admin_groups", adminUsersGroupsSchema);
