#!/usr/bin/env node

/**
 * Module dependencies.
 */
require("dotenv").config()
var app = require("./app")
var debug = require("debug")("express-js-fullstack-template:server")
var http = require("http")

/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.PORT || "3000")
app.set("port", port)

/**
 * Create HTTP/HTTPS server.
 */

// if (process.env.NODE_ENV === "development") {
var server = http.createServer(app)
// } else if (process.env.NODE_ENV === "production") {
//   var privateKey = fs.readFileSync(process.env.SSL_PRIVATE_KEY, "utf-8");
//   var certificate = fs.readFileSync(process.env.SSL_CERTIFICATE, "utf-8");
//   var credentials = { key: privateKey, cert: certificate };
//   var server = https.createServer(credentials, app);
// }

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port)
server.on("error", onError)
server.on("listening", onListening)

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10)

  if (isNaN(port)) {
    // named pipe
    return val
  }

  if (port >= 0) {
    // port number
    return port
  }

  return false
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== "listen") {
    throw error
  }

  var bind = typeof port === "string" ? "Pipe " + port : "Port " + port

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges")
      process.exit(1)
      break
    case "EADDRINUSE":
      console.error(bind + " is already in use")
      process.exit(1)
      break
    default:
      throw error
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address()
  var bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port
  debug("Listening on http://localhost:" + addr.port)
}

module.exports = server
