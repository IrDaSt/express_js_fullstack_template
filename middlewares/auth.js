const jwt = require("jsonwebtoken");
const config = require("../constants/config");
const responses = require("../utilities/responses.utils");

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
            err,
          });
        req.user = value;
        next();
      }
    );
  }
};

const authMiddleware = {
  verifyToken,
};

module.exports = authMiddleware;
