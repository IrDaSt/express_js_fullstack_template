const helper = require("./helper");

const Success = (res, data) =>
  res.status(200).json(
    helper.responseCustom({
      status_code: 200,
      data: data,
    })
  );

const Created = (res, data) =>
  res.status(201).json(
    helper.responseCustom({
      status_code: 201,
      data: data,
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

const Unauthorized = (res, error) =>
  res.status(403).json(
    helper.responseCustom({
      status_code: 403,
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

const InternalServerError = (res, error) =>
  res.status(500).json(
    helper.responseCustom({
      status_code: 500,
      status_message: "error",
      error: error,
    })
  );

const responses = {
  Success,
  Created,
  Unauthorized,
  InternalServerError,
  BadRequest,
  NotFound,
};

module.exports = responses;
