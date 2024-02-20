const mongoose = require("mongoose");
const connectDB = async () => {
  await mongoose.connect(""); //mongodb link here
  console.log("CONNECTEDtOdB!");
};
module.exports = connectDB;
