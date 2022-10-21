"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Cars extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Cars.belongsTo(models.Size, { foreignKey: { name: "sizeId" } });
      Cars.belongsTo(models.User, {
        foreignKey: { name: "createdBy", allowNull: false },
      });
      Cars.belongsTo(models.User, {
        foreignKey: { name: "updatedBy" },
      });
      Cars.belongsTo(models.User, {
        foreignKey: { name: "deletedBy" },
      });
    }
  }
  Cars.init(
    {
      image: DataTypes.STRING,
      rentPerDay: DataTypes.INTEGER,
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Cars",
    }
  );
  return Cars;
};
