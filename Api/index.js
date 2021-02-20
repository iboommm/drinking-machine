var express = require('express');
var cors = require('cors');
const bodyParser = require('body-parser');
var app = express();
var port = 5000;

app.use(bodyParser.json());
app.use(cors());

var auth = require('./auth');
var cart = require('./cart');

app.get('/', function(req, res) {
  const data = { result: 'Service is running!' };
  res.send(data);
});

app.use('/api/auth', auth);
app.use('/api/cart', cart);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
