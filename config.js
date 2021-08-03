require("dotenv").config();

const config = {
  db: {
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "admin",
    password: process.env.DB_PASSWORD || "admin",
    database: process.env.DB_NAME || "express_rest_api",
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
};

module.exports = config;
