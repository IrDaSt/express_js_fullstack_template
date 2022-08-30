const typeormconn = require("../utilities/typeorm.utils")
const app = require("../app")
const supertest = require("supertest")
const Server = require("../index")

class TestFactory {
  _app
  _server

  get app() {
    return supertest(this._app)
  }

  get server() {
    return this._server
  }

  /**
   * Connect to DB and start server
   */
  async init() {
    await typeormconn.init()
    this._server = Server
    this._app = app
  }

  /**
   * Close server and DB connection
   */
  async close() {
    this._server.close()
    await typeormconn.disconnectOne()
  }
}

module.exports = {
  TestFactory,
}
