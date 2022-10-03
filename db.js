const mongoose = require("mongoose");
require('dotenv').config();

function connectdb() {
  mongoose.connect(process.env.MONGO_DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const db = mongoose.connection;
  db.on("error", (error) => console.error(error));
  db.once("open", () => console.log("Connected to db"));
}

module.exports = connectdb;