const express = require("express");
const router = express.Router();
const booksServices = require("../../services/api/books.services");
const middleware = require("../../services/middleware");
const upload = require("../../services/multer");
const helper = require("../../helper");

// GET all books data
router.get("/", async (req, res, next) => {
  const { id_book } = req.query;
  try {
    if (id_book) {
      // GET book data by id_book
      const book = await booksServices.getById(id_book);
      res.json(
        helper.responseCustom({
          data: book[0],
        })
      );
    } else {
      // GET all books data
      const books = await booksServices.getAll();
      res.json(
        helper.responseCustom({
          data: books,
        })
      );
    }
  } catch (error) {
    res.status(500).json(
      helper.responseCustom({
        status_message: "error",
        status_code: 500,
        error: error,
      })
    );
    next(error);
  }
});

// GET book data by id
router.get("/:id", async (req, res, next) => {
  try {
    res.json(await booksServices.getById(req.params.id));
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
      res.json(await booksServices.create(req.body));
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
      res.json(await booksServices.update(req.params.id, req.body));
    } catch (error) {
      console.error(`Error updating books data `, error.message);
      next(error);
    }
  }
);

// DELETE book by id
router.delete("/:id", middleware.verifyToken, async (req, res, next) => {
  try {
    res.json(await booksServices.remove(req.params.id));
  } catch (error) {
    console.error(`Error deleting books data `, error.message);
    next(error);
  }
});

module.exports = router;
