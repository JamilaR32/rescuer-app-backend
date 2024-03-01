//\\ بسم الله الرحمن الرحيم //\\

//express setup
const express = require("express");
const { localStrategy, jwtStrategy } = require("./middlewares/passports");
const passport = require("passport");
const errorHandler = require("./middlewares/errorHandler");
const notFoundHandler = require("./middlewares/notFoundHandler");
const morgan = require("morgan");
const cors = require("cors");
const requestRoutes = require("./api/requests/routes");
const authRoutes = require("./api/auth/routes");
const connectDB = require("./database");
const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(passport.initialize());
passport.use("local", localStrategy);
passport.use("jwt", jwtStrategy);

//router setup
app.use("/api", requestRoutes);
app.use("/api", authRoutes);

//not found handler
app.use(notFoundHandler);
// error handler
app.use(errorHandler);

/// connect to DB
connectDB();
const PORT = 8080;
app.listen(PORT, () => {
  console.log(`RUNNING ON PORT ${PORT}`);
});
