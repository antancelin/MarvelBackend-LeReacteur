// import des packages
const mongoose = require("mongoose");

// création du modèle
const User = mongoose.model("User", {
  username: String,
  email: String,
  token: String,
  hash: String,
  salt: String,
});

module.exports = User;
