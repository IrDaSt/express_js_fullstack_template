const express = require("express");
const router = express.Router();

const booksRouter = require("./books");
const authRouter = require("./auth");
const akunRouter = require("./akun");
const phoneRouter = require("./phone");

router.use("/books", booksRouter);
router.use("/auth", authRouter);
router.use("/akun", akunRouter);
router.use("/phone", phoneRouter);

router.get("/", (req, res, next) => {
  res.send("Welcome to the api");
});

module.exports = router;
