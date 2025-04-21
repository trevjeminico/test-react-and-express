const keys = require("./keys");

const { database } = keys;

const mongoose = require("mongoose");

// Wait for database to connect, logging an error if there is a problem
main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(database);
  const connectionState = mongoose.connection.readyState;
  console.log(
    `database status to ${mongoose.connection.name}: ${mongoose.connection.states[connectionState]}....`
  );
}

module.exports = mongoose;
