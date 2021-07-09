const express = require("express");
const router = express.Router();

const usersRouter = require("./users");

router.use("/users", usersRouter);

/* GET home page. */
router.get("/", function (req, res, next) {
  // res
  //   .set(
  //     "Content-Security-Policy",
  //     "default-src *; style-src 'self' http://* 'unsafe-inline'; script-src 'self' http://* 'unsafe-inline' 'unsafe-eval'; font-src *; img-src 'self' data:; frame-src 'self' http://* 'unsafe-inline';"
  //   )
  //   .render("pages/index", { title: "Express" });
  res.render("pages/index", { title: "Express" });
});

module.exports = router;
