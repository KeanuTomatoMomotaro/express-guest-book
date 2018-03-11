// env. variables
require('dotenv').config();

// config/database.js

'use strict';
const mysql = require('mysql');


module.exports = {
  'connection': {
    'host': process.env.DB_HOST,
    'user': process.env.DB_USER,
    'password': process.env.DB_PASSWORD
  },
  'database': process.env.DB_DATABASE
};
