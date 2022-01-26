const express = require("express");
const booksServicesApi = require("../../services/api/books.services");
const authMiddleware = require("../../middlewares/auth");
const upload = require("../../middlewares/multer");
const responses = require("../../utilities/responses.utils");

const booksRouterApi = express.Router();

/**
 * This is an example on how to implement mysql query with promise
 */

// GET all books data
booksRouterApi.get("/", async (req, res, next) => {
  try {
    // GET all books data
    const books = await booksServicesApi.getAll();
    responses.Success(res, books);
  } catch (error) {
    return responses.InternalServerError(res, {
      message: `Error getting book data `,
      error,
    });
  }
});

// GET book data by id
booksRouterApi.get("/:id", async (req, res, next) => {
  try {
    const book = await booksServicesApi.getById(req.params.id);
    if (!book.length) {
      return responses.InternalServerError(res, {
        message: "Not Found",
      });
    }
    responses.Success(res, book);
  } catch (error) {
    return responses.InternalServerError(res, {
      message: `Error getting book data `,
      error,
    });
  }
});

// POST create new book
booksRouterApi.post(
  "/",
  upload.array(),
  authMiddleware.verifyToken,
  async (req, res, next) => {
    const { name, author, year, description } = req.body;
    try {
      const result_insert = await booksServicesApi.create({
        name: name,
        author: author,
        year: year,
        description: description,
      });
      if (!result_insert.affectedRows) {
        return responses.InternalServerError(res, {
          message: "Insert failed",
        });
      }
      responses.Created(res, {
        message: "Insert success",
      });
    } catch (error) {
      return responses.InternalServerError(res, {
        message: `Error creating book data`,
        error,
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
    const id_book = req.params.id;
    const { name, author, year, description } = req.body;
    try {
      const result_edit = await booksServicesApi.update({
        id_book,
        name,
        author,
        year,
        description,
      });
      if (!result_edit.affectedRows) {
        return responses.InternalServerError(res, {
          message: "Update failed",
        });
      }
      responses.Success(res, {
        message: "Update success",
      });
    } catch (error) {
      return responses.InternalServerError(res, {
        message: `Error updating book data `,
        error,
      });
    }
  }
);

// DELETE book by id
booksRouterApi.delete(
  "/:id",
  authMiddleware.verifyToken,
  async (req, res, next) => {
    const id_book = req.params.id;
    try {
      const result_delete = await booksServicesApi.remove(id_book);
      if (!result_delete.affectedRows) {
        return responses.InternalServerError(res, {
          message: "Delete failed",
        });
      }
      responses.Success(res, {
        message: "Delete success",
      });
    } catch (error) {
      return responses.InternalServerError(res, {
        message: `Error deleting book data `,
        error,
      });
    }
  }
);

module.exports = booksRouterApi;
