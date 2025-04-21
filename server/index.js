// Express
const express = require("express");
const mongoose = require("./config/dbConnection");

// config
const keys = require("./config/keys");
const cors = require("cors");

const corsOptions = {
  origin: "http://localhost:5173",
};

const { port } = keys;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors(corsOptions));

// User routes
const routes = require("./routes/index");
app.use(routes);

app.get("/getDbModels", (req, res) => {
  const modelNames = mongoose.connection.modelNames();
  res.send(modelNames);
});

app.listen(port);
