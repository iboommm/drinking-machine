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

router.get('/stockWithId/:id', authenticateJWT, (req, res) => {
  const sql = `select * from stock where machine_id = ${req.params.id}`;
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
  let column = '';
  _.each(req.body, (data, key) => {
    if (!_.includes(['id'], key)) column += `${key},`;
  });
  column = _.compact(column.split(',')).join(',');
  const data = _.values(req.body)
    .map((x) => `"${x}"`)
    .join(',');
  const sql = `insert into ${req.params.table} (id,${column}) values (NULL, ${data})`;
  const params = [];
  db.all(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message, sql });
      return;
    }
    res.json({
      result: true,
    });
  });
});

router.post('/:table', authenticateJWT, (req, res) => {
  let values_sql = '';
  _.each(req.body, (data, key) => {
    if (!_.includes(['id'], key)) values_sql += ` ${key} = '${data}' ,`;
  });
  values_sql = values_sql
    .split(' ')
    .reverse()
    .slice(1)
    .reverse()
    .join(' ');
  const sql = ` UPDATE ${req.params.table} SET${values_sql} WHERE id = ${req.body.id}`;
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

router.delete('/:table/:id', authenticateJWT, (req, res) => {
  const sql = `delete from ${req.params.table} WHERE id = ${req.params.id}`;
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

module.exports = router;
