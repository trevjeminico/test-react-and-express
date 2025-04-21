const express = require("express");
const usersModels = require("../models/userModel");

const router = express.Router();

router.get("/", async function (req, res) {
  await usersModels
    .find()
    .then(function (results) {
      res.json(results);
    })
    .catch((err) => console.log(err));
});

module.exports = router;
