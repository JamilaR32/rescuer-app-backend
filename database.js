//\\ بسم الله الرحمن الرحيم //\\

const mongoose = require("mongoose");
require("dotenv").config();
const connectDB = async () => {
  const conn = await mongoose.connect(process.env.MONGOPASS);
  console.log(`mongo connected: ${conn.connection.host}`);
};

module.exports = connectDB;
