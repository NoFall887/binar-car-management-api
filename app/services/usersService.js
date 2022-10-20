const usersRepository = require("../repositories/usersRepository");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwtSecret = "binarapisecret";

function hashPassword(password) {
  return bcrypt.hashSync(password);
}

function verifyJwt(token) {
  return jwt.verify(token, jwtSecret);
}

function parseUserData(userObj) {
  temp = userObj;
  temp = JSON.parse(JSON.stringify(temp));
  delete temp.roleId;
  temp.Role = temp.Role.role;
  return temp;
}

module.exports = {
  createMember(email, password) {
    return usersRepository.createMember({
      email: email,
      password: hashPassword(password),
    });
  },

  createAdmin(email, password) {
    return usersRepository.createAdmin({
      email,
      password: hashPassword(password),
    });
  },

  async login(email, password) {
    try {
      let foundUser = await usersRepository.findByEmail(email);
      if (!foundUser) {
        return false;
      }

      const encPassword = foundUser.password;
      const isAuth = bcrypt.compareSync(password, encPassword);
      console.log(password, encPassword);
      if (!isAuth) {
        return false;
      }

      foundUser = parseUserData(foundUser);

      const token = jwt.sign(foundUser, jwtSecret);

      return { ...foundUser, token };
    } catch (error) {
      console.log(error);
      return false;
    }
  },

  async authorize(token) {
    try {
      const payload = verifyJwt(token);
      let user = await usersRepository.findByPk(payload.id);
      user = parseUserData(user);
      return user;
    } catch (error) {
      throw error;
    }
  },
};
