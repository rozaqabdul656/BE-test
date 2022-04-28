'use strict';
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define(
    'users',
    {
      email: { allowNull: false, type: DataTypes.STRING },
      password: { allowNull: false, type: DataTypes.STRING },
    },
    { freezeTableName: true, underscored: true, timestamps: false }
  );
  user.associate = function (models) {
    // associations can be defined here
  };
  return user;
};
