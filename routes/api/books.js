const express = require("express");
const booksServices = require("../../services/api/books.services");
const authMiddleware = require("../../middlewares/auth");
const upload = require("../../middlewares/multer");
const responses = require("../../utilities/responses");

const booksRouterApi = express.Router();

/**
 * This is an example on how to implement mysql query with promise
 */

// GET all books data
booksRouterApi.get("/", async (req, res, next) => {
  const { id_book } = req.query;
  try {
    if (id_book) {
      // GET book data by id_book
      const book = await booksServices.getById(id_book);
      responses.Success(res, book[0]);
    } else {
      // GET all books data
      const books = await booksServices.getAll();
      responses.Success(res, books);
    }
  } catch (error) {
    return responses.InternalServerError(res, error);
  }
});

// GET book data by id
booksRouterApi.get("/:id", async (req, res, next) => {
  try {
    res.json(await booksServices.getById(req.params.id));
  } catch (error) {
    return responses.InternalServerError(res, {
      message: `Error getting book data ` + error.message,
    });
  }
});

// POST create new book
booksRouterApi.post(
  "/",
  upload.array(),
  authMiddleware.verifyToken,
  async (req, res, next) => {
    try {
      res.json(await booksServices.create(req.body));
    } catch (error) {
      return responses.InternalServerError(res, {
        message: `Error creating book data ` + error.message,
      });
    }
  }
);

// PUT update book
booksRouterApi.put(
  "/:id",
  upload.array(),
  authMiddleware.verifyToken,
  async (req, res, next) => {
    try {
      res.json(await booksServices.update(req.params.id, req.body));
    } catch (error) {
      return responses.InternalServerError(res, {
        message: `Error updating book data ` + error.message,
      });
    }
  }
);

// DELETE book by id
booksRouterApi.delete(
  "/:id",
  authMiddleware.verifyToken,
  async (req, res, next) => {
    try {
      res.json(await booksServices.remove(req.params.id));
    } catch (error) {
      return responses.InternalServerError(res, {
        message: `Error deleting book data ` + error.message,
      });
    }
  }
);

module.exports = booksRouterApi;
