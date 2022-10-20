const { Cars, Size } = require("../models");

module.exports = {
  create(createArgs) {
    return Cars.create(createArgs);
  },

  update(carId, updateArgs) {
    return Cars.update(updateArgs, {
      where: {
        id: carId,
      },
    });
  },

  delete(carId) {
    return Cars.destroy({ where: { id: carId } });
  },

  findAll() {
    return Cars.findAll({ include: Size });
  },

  findById(carId) {
    return Cars.findByPk(carId, { include: Size });
  },

  findBySize(sizeId) {
    return Cars.findAll({ include: Size, where: { sizeId: sizeId } });
  },
};
