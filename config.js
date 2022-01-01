require("dotenv").config();

const config = {
  port: process.env.PORT || "4000",
  db: {
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "admin",
    port: process.env.DB_PORT || 3306,
    password: process.env.DB_PASSWORD || "admin",
    database: process.env.DB_NAME || "express_rest_api",
  },
  database: {
    1: {
      host: process.env.DB_HOST || "localhost",
      user: process.env.DB_USER || "admin",
      port: process.env.DB_PORT || 3306,
      password: process.env.DB_PASSWORD || "admin",
      database: process.env.DB_NAME || "express_rest_api",
    },
  },
  secret_token: process.env.JWT_SECRET || "secret_token_express_fullstack",
  session_secret_key:
    process.env.SESSION_SECRET || "secret_session_key_express_fullstack",
  session_setting: {
    cookie: { maxAge: 1000 * 60 * 60 * 24 }, // a day in milliseconds
    // store: new session.MemoryStore(),
    saveUninitialized: true,
    resave: true,
    secret:
      process.env.SESSION_SECRET || "secret_session_key_express_fullstack",
  },
  mail: {
    MAIL_MAILER: process.env.MAIL_MAILER,
    MAIL_HOST: process.env.MAIL_HOST,
    MAIL_PORT: process.env.MAIL_PORT,
    MAIL_USERNAME: process.env.MAIL_USERNAME,
    MAIL_PASSWORD: process.env.MAIL_PASSWORD,
    MAIL_ENCRYPTION: process.env.MAIL_ENCRYPTION,
    MAIL_FROM_ADDRESS: process.env.MAIL_FROM_ADDRESS,
    MAIL_FROM_NAME: process.env.MAIL_FROM_NAME,
  },
  mongo: {
    uri: process.env.MONGO_URI,
  },
  cookie_config: {
    domain: process.env.COOKIE_DOMAIN,
    path: "/",
  },
};

module.exports = config;
