// import des packages
const mongoose = require("mongoose");

const Favorite = mongoose.model("Favorite", {
  body: Object,
  type: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = Favorite;
