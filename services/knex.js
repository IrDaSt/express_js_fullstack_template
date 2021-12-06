const Knex = require("knex");
const config = require("../config");

const knex1 = Knex({
  client: "mysql2",
  connection: {
    ...config.db,
  },
  acquireConnectionTimeout: 10000,
});

module.exports = {
  knex1,
};
