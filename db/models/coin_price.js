'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class coin_price extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  coin_price.init({
    name: DataTypes.STRING,
    ticker: DataTypes.STRING,
    code: DataTypes.STRING,
    exchange: DataTypes.STRING,
    idr: DataTypes.STRING,
    record_times: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'coin_price',
  });
  return coin_price;
};