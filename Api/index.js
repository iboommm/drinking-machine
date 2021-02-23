var express = require('express');
var cors = require('cors');
var multer = require('multer');
var path = require('path');
var bodyParser = require('body-parser');
var app = express();
var port = 5000;

var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, __dirname + '/uploads/');
  },
  filename: function(req, file, cb) {
    let extArray = file.mimetype.split('/');
    let extension = extArray[extArray.length - 1];
    cb(null, file.fieldname + '-' + Date.now() + '.' + extension);
  },
});

app.use(bodyParser.json());
app.use(cors());
app.use(multer({ storage }).any());

var auth = require('./auth');
var cart = require('./cart');

app.get('/', function(req, res) {
  const data = { result: 'Service is running!' };
  res.send(data);
});

app.use('/api/auth', auth);
app.use('/api/cart', cart);

app.post('/upload', function(req, res) {
  res.send({ result: '/uploads/' + req.files[0].filename });
});

app.get('/uploads/:image', (req, res) => {
  res.sendFile(path.join(__dirname, './uploads/' + req.params.image));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
