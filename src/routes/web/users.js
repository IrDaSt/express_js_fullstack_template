const express = require("express");
const router = express.Router();

const userServices = require("../../services/web/user.services");

/* GET users listing. */
router.get("/users", async (req, res, next) => {
  const users = await userServices.getAllUsers();
  res.render("pages/user", { users: users });
});

module.exports = router;
