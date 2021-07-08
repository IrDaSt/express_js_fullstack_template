const db = require("../db");
const helper = require("../../helper");
const config = require("../../config");

// all books
const getAll = async () => {
  const rows = await db.query(`select * from books`);
  const data = helper.emptyOrRows(rows);

  return {
    data,
  };
};

// book by id
const getById = async (id) => {
  const rows = await db.query("Select * from books where id=?", [id]);
  const data = helper.emptyOrRows(rows);

  return {
    data,
  };
};

// create book
const create = async (request) => {
  const result = await db.query(
    "insert into books(name, author, year, description) values (?,?,?,?)",
    [request.name, request.author, request.year, request.description]
  );

  var message = "Error creating new book";
  if (result.affectedRows) {
    message = "Successfully created new book";
  }
  return { message };
};

// update book
const update = async (id, request) => {
  const result = await db.query(
    "update books set name=?, author=?, year=?, description=? where id=?",
    [request.name, request.author, request.year, request.description, id]
  );
  var message = "Error updating book";
  if (result.affectedRows) {
    message = "Successfully updated book";
  }
  return { message };
};

// remove book
const remove = async (id) => {
  const result = await db.query("delete from books where id=?", [id]);
  var message = "Error deleting book";
  if (result.affectedRows) {
    message = "Successfully deleted book";
  }
  return { message };
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};
