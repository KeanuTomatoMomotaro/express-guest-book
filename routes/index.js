var express = require('express');
var router = express.Router();

const mysql = require('mysql');
const dbconfig = require('../config/db');
const connection = mysql.createConnection(dbconfig.connection);

connection.query('USE ' + dbconfig.database);


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET home page. */
router.get('/get-all-guest-comments', function(req, res, next) {
  connection.query(`select * from guest_comments`, function(err, rows){
    if(err){
      console.log(err,"ERROR")
    }else{
      res.render('all-guest-comments', { 
        title: "Keanu's Guestbook",
        guest_comments: rows
       });      
    }
  })
});

module.exports = router;
