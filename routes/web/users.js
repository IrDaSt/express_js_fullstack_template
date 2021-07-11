const express = require("express");
const router = express.Router();

const user = require("../../services/web/user.services");

/* GET users listing. */
router.get("/users", async (req, res, next) => {
  const users = await user.getAllUsers();
  res.render("pages/user", { users: users });
});

module.exports = router;
