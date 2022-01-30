const winston = require("winston");
require("winston-daily-rotate-file");

// Create a rotating write stream for Logging system
const dailyRotateTransport = new winston.transports.DailyRotateFile({
  filename: "application-%DATE%.log",
  dirname: `./logs/`,
  datePattern: "YYYY-MM-DD-HH",
  zippedArchive: true,
  maxSize: "10m",
  maxFiles: "1d",
});

dailyRotateTransport.on("rotate", function (oldFilename, newFilename) {
  // do something fun
});

const logger = winston.createLogger({
  format: winston.format.json(),
  exitOnError: false,
  transports: [dailyRotateTransport, new winston.transports.Console()],
});

module.exports = { logger };
