const helper = require("./helper");

const InternalServerError = (res, error) =>
  res.status(500).json(
    helper.responseCustom({
      status_code: 500,
      status_message: "error",
      error: error,
    })
  );

const BadRequest = (res, error) =>
  res.status(400).json(
    helper.responseCustom({
      status_code: 400,
      status_message: "error",
      error: error,
    })
  );

const NotFound = (res, error) =>
  res.status(404).json(
    helper.responseCustom({
      status_code: 404,
      status_message: "error",
      error: error,
    })
  );

const exceptions = {
  InternalServerError,
  BadRequest,
  NotFound,
};

module.exports = exceptions;
