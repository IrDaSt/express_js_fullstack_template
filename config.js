require("dotenv").config();
const env = process.env;

const config = {
  db: {
    host: env.DB_HOST || "localhost",
    user: env.DB_USER || "admin",
    password: env.DB_PASSWORD || "admin",
    database: env.DB_NAME || "express_rest_api",
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
};

module.exports = config;
