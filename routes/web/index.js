const express = require("express");
const router = express.Router();

const usersRouter = require("./users");

router.use("/users", usersRouter);

/* GET home page. */
router.get("/", function (req, res, next) {
  // Set Cookies Example
  //Expires after 360000 ms from the time it is set.
  res.cookie("test1", "test1value", {
    expire: 1000 * 60 * 60 * 24 + Date.now(),
  }); // a day in milliseconds
  //This cookie also expires after 360000 ms from the time it is set.
  res.cookie("test2", "test2value", { maxAge: 1000 * 60 * 60 * 24 }); // a day in milliseconds

  // Access Cookie from another request
  console.log(`Cookies ${req.cookies.test2}`);

  res.render("pages/index", { title: "Express" });
});

module.exports = router;
