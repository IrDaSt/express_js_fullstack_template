const winston = require("winston");
require("winston-daily-rotate-file");

function isString(str) {
  return typeof str === "string";
}

// Create a rotating write stream for Http Logging system
const dailyRotateTransportHttp = new winston.transports.DailyRotateFile({
  filename: "application-%DATE%.log",
  dirname: `./logs/http/`,
  datePattern: "YYYY-MM-DD-HH",
  zippedArchive: true,
  maxSize: "10m",
  maxFiles: "1d",
  format: winston.format.json(),
});

// Create a rotating write stream for Console Logging system
const dailyRotateTransportConsole = new winston.transports.DailyRotateFile({
  filename: "application-%DATE%.log",
  dirname: `./logs/console/`,
  datePattern: "YYYY-MM-DD-HH",
  zippedArchive: true,
  maxSize: "10m",
  maxFiles: "1d",
  format: winston.format.json(),
});

dailyRotateTransportHttp.on("rotate", function (oldFilename, newFilename) {
  // do something fun
});

const loggerHttp = winston.createLogger({
  exitOnError: false,
  transports: [dailyRotateTransportHttp],
});

const loggerConsole = winston.createLogger({
  exitOnError: false,
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss.SSS" }),
        winston.format.colorize(),
        winston.format.printf(
          ({ level, message, label, timestamp }) =>
            `${timestamp} ${label || "-"} ${level}: ${message}`
        )
      ),
    }),
    dailyRotateTransportConsole,
  ],
});

module.exports = { loggerHttp, loggerConsole };
