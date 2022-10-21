const carService = require("../../services/carService");

module.exports = {
  create(req, res) {
    const role = req.user.Role;
    if (role !== "superadmin" && role !== "admin") {
      res.status(403).json({ status: "FAIL", error: "Unauthorized" });
      return;
    }
    carService
      .create(req.body, req.file, req.user.id)
      .then((result) => {
        res.json({ status: "OK", data: result });
      })
      .catch((err) => {
        console.log(err);
        res.status(406).json({ status: "FAIL", error: err });
      });
  },

  get(req, res) {
    carService
      .get()
      .then((result) => {
        res.json({ status: "OK", data: result });
      })
      .catch((err) => {
        console.log(err);
        res.status(406).json({ status: "FAIL", error: err });
      });
  },

  getById(req, res) {
    carService
      .getById(req.params.id)
      .then((result) => {
        res.json({ status: "OK", data: result });
      })
      .catch((err) => {
        console.log(err);
        res.status(406).json({ status: "FAIL", error: err });
      });
  },

  update(req, res) {
    const role = req.user.Role;
    if (role !== "superadmin" && role !== "admin") {
      res.status(403).json({ status: "FAIL", error: "Unauthorized" });
      return;
    }
    carService
      .update(req.params.id, req.body, req.file, req.user.id)
      .then((result) => {
        console.log(result);
        res.json({ status: "OK", data: result[1][0] });
      })
      .catch((err) => {
        console.log(err);
        res.status(406).json({ status: "FAIL", error: err });
      });
  },

  delete(req, res) {
    const role = req.user.Role;
    if (role !== "superadmin" && role !== "admin") {
      res.status(403).json({ status: "FAIL", error: "Unauthorized" });
      return;
    }
    carService
      .delete(req.params.id, req.user.id)
      .then((result) => {
        res.json({ status: "OK", data: result });
      })
      .catch((err) => {
        console.log(err);
        res.status(406).json({ status: "FAIL", error: err });
      });
  },
};
