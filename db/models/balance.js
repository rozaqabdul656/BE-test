'use strict';
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define(
    'balance',
    {
      user_id: { allowNull: false, type: DataTypes.INTEGER },
      amount_available: { allowNull: false, type: DataTypes.DECIMAL(10,2) },
    },
    { freezeTableName: true, underscored: true, timestamps: false }
  );
  user.associate = function (models) {
    // associations can be defined here
  };
  return user;
};
