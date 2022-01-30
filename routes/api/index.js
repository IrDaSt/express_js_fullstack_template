const express = require("express");
const router = express.Router();

const booksRouterApi = require("./books");
const phoneRouterApi = require("./phone");
const postsRouterApi = require("./posts");
const authRouterApi = require("./auth");
const { loggerConsole } = require("../../utilities/winston.utils");

router.use("/books", booksRouterApi);
router.use("/auth", authRouterApi);
router.use("/phone", phoneRouterApi);
router.use("/posts", postsRouterApi);

router.get("/", (req, res, next) => {
  // loggerConsole.info("Welcome to the api");
  res.send("Welcome to the api");
});

module.exports = router;
