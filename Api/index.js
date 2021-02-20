var express = require("express");
var app = express();
var port = 5000;

const bodyParser = require("body-parser");
app.use(bodyParser.json());

var auth = require("./auth");
var cart = require("./cart");

app.get("/", function (req, res) {
  const data = { result: "Service is running!" };
  res.send(data);
});

app.use("/api", auth);
app.use("/api", cart);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
