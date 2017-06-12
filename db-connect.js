var mysql = require('mysql');

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "esme",
  port: "3306"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

connection.query('SELECT * FROM `slcresults` WHERE symbol_no = ?', ['456789'], function(err, rows, fields) {
  if (!err) {
    console.log('All rows: ', rows);
    console.log(typeof rows);
    if (rows.length === 1) {
      // The desired symbol_no exist in our system
      for (var i = 0; i < rows.length; i++) {
        if (rows[i].points !== '') {
          // Return grade from here
          console.log('Congratulation! your grade is ', rows[i].points);
        } else {
          // Not graded because student may be absent in one or more subjects
          console.log('You are absent in one or more subjects');
        }
      }
    } else {
      // The desired symbol_no didn't exist in our system
      console.log("The requested symbol_no didn\'t exist.");
    }
  }
  else {
    throw err;
    console.log('Error while performing Query.');
  }
});

connection.end();
