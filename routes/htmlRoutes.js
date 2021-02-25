const express = require("express");
const router = express.Router();
const path = require("path");

router.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

router.get("/reserve", function (req, res) {
  res.sendFile(path.join(__dirname, "../public/reserve.html"));
});

router.get("/tables", function (req, res) {
  res.sendFile(path.join(__dirname, "../public/tables.html"));
});

module.exports = router;