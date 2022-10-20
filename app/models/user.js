"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsTo(models.Role, { foreignKey: { name: "roleId" } });
      User.hasMany(models.Cars, {
        foreignKey: { name: "createdBy", allowNull: false },
      });
      User.hasMany(models.Cars, {
        foreignKey: {
          name: "updatedBy",
        },
      });
      User.hasMany(models.Cars, {
        foreignKey: {
          name: "deletedBy",
        },
      });
    }
  }
  User.init(
    {
      email: DataTypes.STRING,
      password: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
