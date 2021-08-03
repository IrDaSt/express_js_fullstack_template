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
const multer = require("multer");
const bodyParser = require("body-parser");
const rfs = require("rotating-file-stream");
const mongoose = require("mongoose");
const sass = require("node-sass");
const fs = require("fs");

const webRouter = require("./routes/web");
const apiRouter = require("./routes/api");

const config = require("./config");
const helper = require("./helper");

var upload = multer();
var app = express();

// Connecting to mongo db database
mongoose.connect(config.mongo.uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

// Create a rotating write stream for Logging system
const generator = (time, index) => {
  if (!time) return "access.log";

  var month = time.getFullYear() + "-" + helper.pad(time.getMonth() + 1);
  var day = helper.pad(time.getDate());
  var hour = helper.pad(time.getHours());
  var minute = helper.pad(time.getMinutes());

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
  // Session set up
  // Please use Cookie instead of session for production environment
  app.use(session(config.session_setting));
  // Flash session
  app.use(flash());
  // Use Morgan Logging system
  // Dev console logs
  app.use(morgan("dev"));

  const result = sass.renderSync({
    file: path.join(__dirname, "public/scss/main.scss"),
    outputStyle: "compressed",
    outFile: path.join(__dirname, "public/dist/main.css"),
  });
  fs.writeFile(
    path.join(__dirname, "public/dist/main.css"),
    result.css,
    (err) => {}
  );
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
app.use(upload.array());
// Json Parser
app.use(express.json());
// Form encoded Parser
app.use(express.urlencoded({ extended: true }));
// Cookie parser
app.use(cookieParser());

// Public folder set up
app.use(express.static(path.join(__dirname, "public")));
// Cross-origin resource sharing
app.use(cors());

// SASS LOADER
const result = sass.renderSync({
  file: path.join(__dirname, "public/scss/main.scss"),
  outputStyle: "compressed",
  outFile: path.join(__dirname, "public/dist/main.css"),
});
fs.writeFile(
  path.join(__dirname, "public/dist/main.css"),
  result.css,
  (err) => {}
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
