const typeorm = require("typeorm");
const config = require("../constants/config");
const { PostsEntity } = require("../models/entities/Posts.entity");
const { UserEntity } = require("../models/entities/User.entity");
const { loggerConsole } = require("./winston.utils");

const connection1 = {
  type: "mariadb",
  name: "conn1",
  host: config.database.one.host,
  port: config.database.one.port,
  username: config.database.one.user,
  password: config.database.one.password,
  database: config.database.one.database,
  synchronize: false,
  entities: [PostsEntity, UserEntity],
};

class TypeOrmConnection {
  constructor() {
    this.connection_one = undefined;
    this.init();
  }

  init = async () => {
    await this.connectOne();
    if (!this.connection_one?.isConnected) this.reconnectOne();
  };

  connectOne = async () => {
    if (this.connection_one?.isConnected) return;
    loggerConsole.info(`connecting to connection_one...`);
    await typeorm
      .createConnection({
        ...connection1,
      })
      .then((conn) => {
        this.connection_one = conn;
        loggerConsole.info(`connected to connection_one`);
      })
      .catch((err) => {
        loggerConsole.error("database connection_one error");
        // eslint-disable-next-line no-console
        console.error({
          error: {
            message: err.message,
            stack: err.stack,
            ...err,
          },
        });
      });
  };

  disconnectOne = async () => {
    if (this.connection_one?.isConnected) {
      await this.connection_one?.close();
      this.connection_one = undefined;
    }
  };

  reconnectOne = async () => {
    await this.disconnectOne();
    while (!this.connection_one?.isConnected) {
      await this.connectOne();
      if (this.connection_one?.isConnected) return;
      loggerConsole.info(`reconnecting to database_one after 10 seconds...`);
      await new Promise((resolve) => setTimeout(resolve, 10000));
    }
  };
}

const typeormconn = new TypeOrmConnection();

module.exports = typeormconn;
