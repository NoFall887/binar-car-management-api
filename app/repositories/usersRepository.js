const { User, Role } = require("../models");

module.exports = {
  createMember(createArgs) {
    console.log({ ...createArgs, roleId: 3 });
    return User.create({ ...createArgs, roleId: 3 });
  },

  createAdmin(createArgs) {
    console.log({ ...createArgs, roleId: 3 });
    return User.create({ ...createArgs, roleId: 2 });
  },

  findByPk(id) {
    return User.findByPk(id, { include: Role });
  },

  findByEmail(email) {
    return User.findOne({
      where: {
        email: email,
      },
      include: Role,
    });
  },
};
