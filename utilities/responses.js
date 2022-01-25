const { StatusCodes } = require("http-status-codes");

const responseCustom = ({ status_code, status_message, data, error }) => {
  const response = {};
  response.status_code = status_code ?? StatusCodes.OK;
  response.status_message = status_message ?? "success";
  if (data) response.data = data;
  if (error) response.error = error;
  return response;
};

const Success = (res, data) =>
  res.status(StatusCodes.OK).json(
    responseCustom({
      status_code: StatusCodes.OK,
      data: data,
    })
  );

const Created = (res, data) =>
  res.status(StatusCodes.CREATED).json(
    responseCustom({
      status_code: StatusCodes.CREATED,
      data: data,
    })
  );

const BadRequest = (res, error) =>
  res.status(StatusCodes.BAD_REQUEST).json(
    responseCustom({
      status_code: StatusCodes.BAD_REQUEST,
      status_message: "error",
      error: error,
    })
  );

const Unauthorized = (res, error) =>
  res.status(StatusCodes.UNAUTHORIZED).json(
    responseCustom({
      status_code: StatusCodes.UNAUTHORIZED,
      status_message: "error",
      error: error,
    })
  );

const Forbidden = (res, error) =>
  res.status(StatusCodes.FORBIDDEN).json(
    responseCustom({
      status_code: StatusCodes.FORBIDDEN,
      status_message: "error",
      error: error,
    })
  );

const NotFound = (res, error) =>
  res.status(StatusCodes.NOT_FOUND).json(
    responseCustom({
      status_code: StatusCodes.NOT_FOUND,
      status_message: "error",
      error: error,
    })
  );

const InternalServerError = (res, error) =>
  res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(
    responseCustom({
      status_code: StatusCodes.INTERNAL_SERVER_ERROR,
      status_message: "error",
      error: error,
    })
  );

const InternalServerErrorCatch = (res, error) =>
  res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(
    responseCustom({
      status_code: StatusCodes.INTERNAL_SERVER_ERROR,
      status_message: "error",
      error: {
        message: error.message,
        stack: error.stack,
        errors: error,
      },
    })
  );

const responses = {
  Success,
  Created,
  BadRequest,
  Unauthorized,
  Forbidden,
  NotFound,
  responseCustom,
  InternalServerError,
  InternalServerErrorCatch,
};

module.exports = responses;
