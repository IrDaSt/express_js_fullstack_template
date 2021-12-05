const jwt = require("jsonwebtoken");
const config = require("../config");
const helper = require("../helper");
const tokenSecret = config.secret_token;

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token)
    res.status(403).json(
      helper.responseCustom({
        status_message: "success",
        errors: { message: "Please provide a bearer token authorization" },
      })
    );
  else {
    const tokenize = token.split(" ")[1];
    jwt.verify(
      tokenize.substring(0, 40) + tokenize.substring(40 + 15),
      tokenSecret,
      (err, value) => {
        if (err)
          res.status(500).json(
            helper.responseCustom({
              status_code: 500,
              status_message: "error",
              errors: { message: "Failed to authenticate token" },
            })
          );
        req.user = value.data;
        next();
      }
    );
  }
};

module.exports = {
  verifyToken,
};
