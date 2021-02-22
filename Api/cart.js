const express = require('express'),
  router = express.Router();

const db = require('./database');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
var config = require('./config.json');

const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(' ')[1];

    jwt.verify(token, config.accessTokenSecret, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }

      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

router.get('/:table', authenticateJWT, (req, res) => {
  const sql = `select * from ${req.params.table}`;
  const params = [];
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

router.get('/:table/:id', authenticateJWT, (req, res) => {
  const sql = `select * from ${req.params.table} where id = ${req.params.id} `;
  const params = [];
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

router.put('/:table', authenticateJWT, (req, res) => {
  const data = _.values(req.body)
    .map((x) => `"${x}"`)
    .join(',');
  const sql = `insert into ${req.params.table} values (NULL, ${data})`;
  const params = [];
  db.all(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      result: true,
    });
  });
});

router.post('/:table', authenticateJWT, (req, res) => {
  let values_sql = '';
  const columns = _.keys(req.body);
  _.each(req.body, (data, key) => {
    if (!_.includes(['id', 'msg', 'valid'], key))
      values_sql += `${key} = '${data}' `;
  });
  
  const sql = ` UPDATE ${req.params.table} SET ${values_sql} WHERE id = ${req.body.id}`;
  const params = [];
  db.all(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      result: true
    });
  });
});

router.delete('/:table/:id', authenticateJWT, (req, res) => {
  const sql = `delete from ${req.params.table} WHERE id = ${req.params.id}`;
  const params = [];
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
