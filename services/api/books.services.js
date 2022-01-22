const idGeneratorUtils = require("../../utilities/id-generator");
const mysqlconn = require("../../utilities/mysql");

// all books
const getAll = async () => {
  const rows = await mysqlconn.query(`select * from books`);
  return rows;
};

// book by id
const getById = async (id_book) => {
  const rows = await mysqlconn.query("Select * from books where id_book=?", [
    id_book,
  ]);
  return rows;
};

// create book
const create = async ({ name, author, year, description }) => {
  const result = await mysqlconn.query(
    "insert into books(id_book, name, author, year, description) values (?,?,?,?,?)",
    [idGeneratorUtils.generateUUIDV4(), name, author, year, description]
  );
  return result;
};

// update book
const update = async ({ id_book, name, author, year, description }) => {
  const result = await mysqlconn.query(
    "update books set name=?, author=?, year=?, description=? where id_book=?",
    [name, author, year, description, id_book]
  );
  return result;
};

// remove book
const remove = async (id_book) => {
  const result = await mysqlconn.query("delete from books where id_book=?", [
    id_book,
  ]);
  return result;
};

const booksServicesApi = {
  getAll,
  getById,
  create,
  update,
  remove,
};

module.exports = booksServicesApi;
