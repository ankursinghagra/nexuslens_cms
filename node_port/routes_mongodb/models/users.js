const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const adminUsersSchema = new Schema({
  admin_email: { type: String, required: true, lowercase: true, unique: true },
  admin_password: { type: String, required: true },
  admin_name: { type: String, required: true },
  admin_group: { type: Schema.ObjectId, ref: "admin_groups" },
  admin_photo: { type: String, required: false, default: "default.png" },
  admin_hash_for_email_verification: {
    type: String,
    required: false,
    default: "",
  },
  admin_hash_for_password_reset: { type: String, required: false, default: "" },
  admin_remember_me_token: { type: String, required: false, default: "" },
  admin_email_verified: { type: Boolean, required: true, default: false },
  admin_created_at: { type: Date, required: true, default: Date.now },
  admin_modified_at: { type: Date, required: true, default: Date.now },
});

adminUsersSchema.pre("save", function (next) {
  var item = this;
  item.admin_modified_at = Date.now();
  next();
});

module.exports = new mongoose.model("admin_users", adminUsersSchema);
