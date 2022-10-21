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
      returning: true,
    });
  },

  delete(carId, adminId) {
    return Cars.update(
      { deletedBy: adminId },
      { where: { id: carId }, fields: ["deletedBy"], silent: true }
    );
  },

  findAll() {
    return Cars.findAll({
      include: Size,
      where: {
        deletedBy: null,
      },
    });
  },

  findById(carId) {
    return Cars.findByPk(carId, {
      include: Size,
      where: {
        deletedBy: null,
      },
    });
  },

  findBySize(sizeId) {
    return Cars.findAll({
      include: Size,
      where: { sizeId: sizeId, deletedBy: null },
    });
  },
};
