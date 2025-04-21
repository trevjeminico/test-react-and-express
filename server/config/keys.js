require("dotenv").config("/.env");

module.exports = {
  port: process.env.PORT,
  database: process.env.MONGO_URL,
};
