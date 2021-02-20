var express = require("express"),
  router = express.Router();
var db = require("./database");
var _ = require("lodash");

router.get("/", (req, res) => {
  var sql = `select * from items`;
  var params = [];
  db.all(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      result,
    });
  });
});

router.put("/", (req, res) => {
  var sql = `select * from items`;
  var params = [];
  db.all(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      result,
    });
  });
});

router.post("/:id", (req, res) => {
  var sql = `select * from items`;
  var params = [];
  db.all(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      result,
    });
  });
});

router.delete("/:id", (req, res) => {
  var sql = `select * from items`;
  var params = [];
  db.all(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      result,
    });
  });
});

module.exports = router;
