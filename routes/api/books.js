const express = require("express");
const router = express.Router();
const books = require("../../services/api/books.services");
const middleware = require("../../services/middleware");
const upload = require("../../services/multer");

// GET all books data
router.get("/", async (req, res, next) => {
  try {
    res.json(await books.getAll());
  } catch (error) {
    console.error(`Error getting books data `, error.message);
    next(error);
  }
});

// GET book data by id
router.get("/:id", async (req, res, next) => {
  try {
    res.json(await books.getById(req.params.id));
  } catch (error) {
    console.error(`Error getting book data `, error.message);
    next(error);
  }
});

// POST create new book
router.post(
  "/",
  upload.array(),
  middleware.verifyToken,
  async (req, res, next) => {
    try {
      res.json(await books.create(req.body));
    } catch (error) {
      console.error(`Error creating books data `, error.message);
      next(error);
    }
  }
);

// PUT update book
router.put(
  "/:id",
  upload.array(),
  middleware.verifyToken,
  async (req, res, next) => {
    try {
      res.json(await books.update(req.params.id, req.body));
    } catch (error) {
      console.error(`Error updating books data `, error.message);
      next(error);
    }
  }
);

// DELETE book by id
router.delete("/:id", middleware.verifyToken, async (req, res, next) => {
  try {
    res.json(await books.remove(req.params.id));
  } catch (error) {
    console.error(`Error deleting books data `, error.message);
    next(error);
  }
});

module.exports = router;
