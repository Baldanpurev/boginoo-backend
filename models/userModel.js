const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  orignal_link: { type: String },
  short_link: { type: String },
  ownerID: { type: String },
});
const User = mongoose.model("link", userSchema);
module.exports = User;
