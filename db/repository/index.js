require('dotenv').config();

const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const DataTypes = Sequelize.DataTypes;
const mysql2 = require('mysql2');

const instance = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: 'mysql',
  dialectModule : mysql2,
  logging: false
});

// console.log(instance)
const users=instance.import('../models/users');
const balance=instance.import('../models/balance');
const transaction=instance.import('../models/transaction');
const coin_price=instance.import('../models/coin_price')
const queryInterface = instance.getQueryInterface();

const initTransaction = () => instance.transaction();

const addWhere = (lookup) => {
  return { where: lookup };
};

const getAttributes = (columns) => {
  return { attributes: columns };
};

const makeInQuery = (list) => {
  return { [Op.in]: list };
};

const addNotEqual = (lookup) => {
  return { [Op.ne]: lookup };
};

const orderBy = (ordering) => {
  let order = [];

  order.push(ordering);

  return { order };
};

const addOperator = (operator, value) => ({ [operator]: value });

const raw_query = async (query) => {
  return instance.query(query, { type: Sequelize.QueryTypes.SELECT });
};

const common_query = async (query) => {
  return instance.query(query);
};





module.exports = {
  raw_query, 
  common_query,
  queryInterface, 
  DataTypes, 
  Op, 
  addNotEqual, 
  addWhere, 
  addOperator,
  getAttributes, 
  makeInQuery, 
  orderBy,
  initTransaction,
  balance,
  users,
  transaction,
  coin_price
};