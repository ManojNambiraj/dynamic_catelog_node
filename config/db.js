const mongoose = require("mongoose");

const connection = (URL) => {
  try {
    mongoose.connect(URL);

    const db = mongoose.connection;

    db.once("open", () => {
      console.log("DB Connected");
    });
  } catch (error) {
    db.on("error", console.error.bind(console, "MongoDB connection error..!"));
  }
};

module.exports = connection;
