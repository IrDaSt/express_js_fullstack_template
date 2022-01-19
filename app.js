require("dotenv").config();
const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const session = require("express-session");
const flash = require("express-flash");
const helmet = require("helmet");
const cors = require("cors");
const rfs = require("rotating-file-stream");
const mongoose = require("mongoose");
const swaggerUi = require("swagger-ui-express");

const webRouter = require("./routes/web");
const apiRouter = require("./routes/api");

const config = require("./constants/config");
const swaggerConfig = require("./swagger/swagger-config");

const app = express();

// Connecting to mongo db database
// mongoose.connect(config.mongo.uri, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   useCreateIndex: true,
//   useFindAndModify: false,
// });

// Create a rotating write stream for Logging system

const pad = (num) => (num > 9 ? "" : "0") + num;

const generator = (time, index) => {
  if (!time) return "access.log";

  const month = time.getFullYear() + "-" + pad(time.getMonth() + 1);
  const day = pad(time.getDate());
  const hour = pad(time.getHours());
  const minute = pad(time.getMinutes());

  return `${month}/${month}${day}-${hour}${minute}-${index}-access.log.gzip`;
};

const accessLogStream = rfs.createStream(generator, {
  size: "10M", // rotate every 10 MegaBytes written
  interval: "1d", // rotate daily
  compress: "gzip", // compress rotated files
  path: path.join(__dirname, "logs"), // place access log file to log folder
});

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

if (process.env.NODE_ENV === "development") {
  console.log("Development mode");
  // Use Morgan Logging system
  // Dev console logs
  app.use(morgan("dev"));
}
// Use Morgan Logging system
// Stream logs to file
app.use(morgan("combined", { stream: accessLogStream }));

// Web Guard By Helmet
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);

// Form data parser
// app.use(upload.array());
// Json Parser
app.use(express.json());
// Form encoded Parser
app.use(express.urlencoded({ extended: true }));
// Cookie parser
app.use(cookieParser());

// Session set up
// Please use Cookie instead of session for production environment
app.use(session(config.session_setting));
// Flash session
app.use(flash());

// Public folder set up
app.use(express.static(path.join(__dirname, "public")));
// Cross-origin resource sharing
app.use(cors());

// Swagger UI
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup({ ...swaggerConfig }, { explorer: false })
);

// Routing
app.use("/", webRouter);
app.use("/api", apiRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("pages/error");
});

module.exports = app;
