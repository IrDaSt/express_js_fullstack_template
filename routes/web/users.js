const express = require("express");
const router = express.Router();

const user = require("../../services/web/user.services");

/* GET users listing. */
router.get("/", async (req, res, next) => {
  const users = await user.getAllUsers();
  res
    .set(
      "Content-Security-Policy",
      "default-src *; style-src 'self' http://* 'unsafe-inline'; script-src 'self' http://* 'unsafe-inline' 'unsafe-eval'; font-src *; img-src 'self' data:; frame-src 'self' http://* 'unsafe-inline';"
    )
    .render("pages/user", { users: users });
});

module.exports = router;
