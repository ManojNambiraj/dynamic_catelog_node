const mongoose = require("mongoose");

const schema = mongoose.Schema({
  Name: { type: String, required: true },
  Email: { type: String, required: true },
  Password: { type: String, required: true },
  Age: { type: Number, require: true },
  Mobile: { type: Number, require: true },
});

module.exports = mongoose.model("users", schema);
