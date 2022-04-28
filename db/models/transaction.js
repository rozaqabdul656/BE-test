'use strict';
module.exports = (sequelize, DataTypes) => {
  const transaction = sequelize.define(
    'transaction',
    {
      trx_id: { allowNull: false, type: DataTypes.STRING },
      amount: { allowNull: false, type: DataTypes.DECIMAL(10,2) },
      user_id: { allowNull: false, type: DataTypes.INTEGER },
    },
    { freezeTableName: true, underscored: true, timestamps: false }
  );
  transaction.associate = function (models) {
    // associations can be defined here
  };
  return transaction;
};
