const express = require("express");

const statCont = require("../controller/statusController");

const router = express.Router();

const { status_codes } = statCont;

router.get("/taskcodes", status_codes);

module.exports = router;
