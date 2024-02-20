//\\ بسم الله الرحمن الرحيم //\\
//express setup
const express = require("express");

const app = express();
app.use(express.json());
//express^setup^
//router setup
const userRouter = require(`./api/users/routes`);
const connectDB = require("./database");
app.use(userRouter);
//router^setup^
//port setup
const PORT = 8000;
connectDB();
app.listen(PORT, () => {
  console.log(`RUNNINGoNpORT${PORT}`);
});
//port^setup^
