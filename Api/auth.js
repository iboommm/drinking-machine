var express = require("express"),
  router = express.Router();

var db = require("./database");
const jwt = require("jsonwebtoken");
var _ = require("lodash");
var config = require("./config.json");

const errorMsg = "username or password has wrong.";

router.post("/auth", (req, res) => {
  const request = req.body || {};
  const username = request.username || "";
  const password = request.password || "";
  if (username === "" || password === "") {
    res.status(401).json({ error: errorMsg });
    return;
  }
  var sql = `select username, role from users where username = '${username}' AND password = '${password}'`;
  var params = [];
  db.all(sql, params, (err, data) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    const result = data.length > 0;
    if (result) {
      const user = data[0];
      const accessToken = jwt.sign(
        { username: user.username, role: user.role },
        config.accessTokenSecret
      );
      res.json({
        result,
        accessToken,
      });
    } else {
      res.status(401).json({ error: errorMsg });
    }
  });
});

module.exports = router;
