const Knex = require("knex");
const config = require("../config");

// Query Builder Type Database
// Knex documentation at https://knexjs.org
const knex1 = Knex({
  client: "mysql2",
  connection: {
    ...config.database[1],
  },
  acquireConnectionTimeout: 10000,
});

module.exports = {
  knex1,
};
