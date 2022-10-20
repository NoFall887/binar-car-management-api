const usersService = require("../../services/usersService");

module.exports = {
  register(req, res) {
    const { email, password } = req.body;
    usersService
      .createMember(email, password)
      .then((result) => {
        res.json({ status: "OK", data: result });
      })
      .catch((err) => {
        console.log(err);
        res.status(406).json({ status: "FAIL", error: err });
      });
  },

  createAdmin(req, res) {
    const { email, password } = req.body;
    if (req.user.Role !== "superadmin") {
      res.status(403).json({ status: "FAIL", error: "Unauthorized" });
      return;
    }

    usersService
      .createAdmin(email, password)
      .then((result) => {
        res.json({ status: "OK", data: result });
      })
      .catch((err) => {
        console.log(err);
        res.status(406).json({ status: "FAIL", error: err });
      });
  },

  login(req, res) {
    const { email, password } = req.body;
    usersService
      .login(email, password)
      .then((result) => {
        if (!result) {
          throw "Login fail";
        }
        res.json({ status: "OK", data: result });
      })
      .catch((err) => {
        console.log(err);
        res.status(406).json({ status: "FAIL", error: err });
      });
  },

  authorize(req, res, next) {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      res.status(403).json({ status: "FAIL", error: "Unauthorized" });
      return;
    }

    usersService
      .authorize(token)
      .then((user) => {
        if (!user) {
          res.status(403).json({ status: "FAIL", error: "Unauthorized" });
          return;
        }
        req.user = user;
        next();
      })
      .catch((err) => {
        console.log(err);
        res.status(403).json({ status: "FAIL", error: "Unauthorized" });
      });
  },

  whoami(req, res) {
    res.json({ status: "OK", data: req.user });
  },
};
