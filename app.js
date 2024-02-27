//express setup
const express = require("express");
// const { localStrategy, jwtStrategy } = require("./middlewares/passports");
// const passport = require("passport");
const errorHandler = require("./src/middlewares/errorHandler");
const notFoundHandler = require("./src/middlewares/notFoundHandler");
const morgan = require("morgan");
const cors = require("cors");
const requestRoutes = require("./api/requests/routes");
const connectDB = require("./database");
const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
// app.use(passport.initialize());
// passport.use("local", localStrategy);
// passport.use("jwt", jwtStrategy);

//router setup
app.use("/api", requestRoutes);

//not found handler
app.use(notFoundHandler);
// error handler
app.use(errorHandler);

/// connect to DB
connectDB();
const PORT = 8000;
app.listen(PORT, () => {
  console.log(`RUNNING ON PORT ${PORT}`);
});
