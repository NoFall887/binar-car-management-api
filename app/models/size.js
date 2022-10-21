"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Size extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Size.hasMany(models.Cars, {
        onDelete: "RESTRICT",
        foreignKey: {
          name: "sizeId",
        },
      });
    }
  }
  Size.init(
    {
      size: DataTypes.STRING,
    },
    {
      sequelize,
      timestamps: false,
      modelName: "Size",
    }
  );
  return Size;
};
