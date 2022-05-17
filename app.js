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
const mongoose = require("mongoose");
const swaggerUi = require("swagger-ui-express");

const webRouter = require("./routes/web");
const apiRouter = require("./routes/api");

const config = require("./constants/config");
const swaggerConfig = require("./swagger/swagger-config");
const { loggerHttp } = require("./utilities/winston.utils");

const app = express();

// Connecting to mongo db database
// mongoose.connect(config.mongo.uri, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   useCreateIndex: true,
//   useFindAndModify: false,
// });

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
app.use(
  morgan("combined", {
    stream: {
      write: (message) => loggerHttp.info(message.trim()),
    },
  })
);

// Json Parser
app.use(express.json());
// Form encoded Parser
app.use(express.urlencoded({ extended: true }));
// Cookie parser
app.use(cookieParser());

// Session set up
// Please use Cookie instead of session for production environment
// app.use(session(config.session_setting));
// Flash session
// app.use(flash());

// Public folder set up
app.use(express.static(path.join(__dirname, "public")));
// Cross-origin resource sharing
app.use(cors());

// Web Guard By Helmet
app.use(
  helmet({
    originAgentCluster: false,
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false,
  })
);

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
  const message = err.message;
  const error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("pages/error", { message, error });
});

module.exports = app;
