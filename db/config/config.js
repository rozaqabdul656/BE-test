require('dotenv').config();
const mysql2 = require('mysql2');


const username = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const database = process.env.DB_NAME;
const host = process.env.DB_HOST;
const seederStorage = 'sequelize';
const dialect = 'mysql';
const dialectModule = mysql2;

const connection = { username, password, database, host, seederStorage, dialect,dialectModule };

module.exports = connection;
