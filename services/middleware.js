const jwt = require("jsonwebtoken");
const config = require("../config");
const helper = require("../helper");
const responses = require("../responses");

const verifyToken = (req, res, next) => {
  const authorization = req.headers.authorization;
  if (!authorization)
    responses.Unauthorized(res, {
      message: "Please provide a bearer token authorization",
    });
  else {
    const token = authorization.split(" ")[1];
    jwt.verify(
      token.substring(0, 40) + token.substring(40 + 15),
      config.secret_token,
      (err, value) => {
        if (err)
          responses.InternalServerError(res, {
            message: "Failed to authenticate token",
          });
        req.user = value;
        next();
      }
    );
  }
};

const middleware = {
  verifyToken,
};

module.exports = middleware;
