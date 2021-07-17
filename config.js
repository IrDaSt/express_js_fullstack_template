const { env } = require("process");

const config = {
  db: {
    host: env.DB_HOST || "localhost",
    user: env.DB_USER || "admin",
    password: env.DB_PASSWORD || "admin",
    database: env.DB_NAME || "express_rest_api",
    connectTimeout: 10000,
  },
  secret_token: "eheheheh",
  session_secret_key: "secret_session_key",
  session_setting: {
    cookie: { maxAge: 1000 * 60 * 60 * 24 }, // a day in milliseconds
    // store: new session.MemoryStore(),
    saveUninitialized: true,
    resave: true,
    secret: "secret_session_key",
  },
  mail: {
    MAIL_MAILER: env.MAIL_MAILER,
    MAIL_HOST: env.MAIL_HOST,
    MAIL_PORT: env.MAIL_PORT,
    MAIL_USERNAME: env.MAIL_USERNAME,
    MAIL_PASSWORD: env.MAIL_PASSWORD,
    MAIL_ENCRYPTION: env.MAIL_ENCRYPTION,
    MAIL_FROM_ADDRESS: env.MAIL_FROM_ADDRESS,
    MAIL_FROM_NAME: env.MAIL_FROM_NAME,
  },
};

module.exports = config;
