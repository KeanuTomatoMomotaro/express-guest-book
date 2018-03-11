var express = require('express');
var router = express.Router();

const mysql = require('mysql');
const dbconfig = require('../config/db');
const connection = mysql.createConnection(dbconfig.connection);

const uuidv4 = require('uuid/v4');

connection.query('USE ' + dbconfig.database);


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET all comments page. */
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

/* post new comment page */
router.get('/post-new-guest-comment',function(req, res, next) {
    res.render('guest-comment-form', { 
      title: "Guest Comment Form"
     });      
  })

router.post('/post-new-guest-comment',function (req, res, next) {
    let postSql = `INSERT INTO guest_comments 
    (id, comment_title, comment_author, comment_content) VALUES (?, ?, ?, ?)`

    let id = uuidv4()
    let title = req.body.comment_title
    let author = req.body.comment_author
    let content = req.body.comment_content

    connection.query(postSql, [id, title, author, content],function(err, rows){
      if(err){
        console.log(err,"ERROR")
      }else{
        res.redirect('/get-all-guest-comments');      
      }
    })
  })  

module.exports = router;
