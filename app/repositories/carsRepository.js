const { cars, size } = require("../models");

module.exports = {
  create(createArgs) {
    return cars.create(createArgs);
  },

  update(carId, updateArgs) {
    return cars.update(updateArgs, {
      where: {
        id: carId,
      },
    });
  },

  delete(carId) {
    return cars.destroy({ where: { id: carId } });
  },

  findAll() {
    return cars.findAll({ include: size });
  },

  findById(carId) {
    return cars.findByPk(carId, { include: size });
  },

  findBySize(sizeId) {
    return cars.findAll({ include: size, where: { sizeId: sizeId } });
  },
};
