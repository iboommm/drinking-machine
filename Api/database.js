var fs = require("fs");
var sqlite3 = require("sqlite3").verbose();
var sql = fs.readFileSync("db.sql").toString();

const DBSOURCE = "db.sqlite";

let db = new sqlite3.Database(DBSOURCE, (err) => {
  if (err) {
    // Cannot open database
    console.error(err.message);
    throw err;
  } else {
    console.log("Connected to the SQLite database.");
    console.log("Database migrations starting...");
    db.exec(sql, (err) => {
      if (!err) {
        console.log("Table has been finised.");
      } else {
        console.log("There have some error here.", err);
      }
    });
  }
});

module.exports = db;
