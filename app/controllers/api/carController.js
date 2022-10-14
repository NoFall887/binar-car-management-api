const carService = require("../../services/carService");

module.exports = {
  create(req, res) {
    carService
      .create(req.body, req.file)
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
    carService
      .update(req.params.id, req.body, req.file)
      .then((result) => {
        res.json({ status: "OK", data: result });
      })
      .catch((err) => {
        console.log(err);
        res.status(406).json({ status: "FAIL", error: err });
      });
  },

  delete(req, res) {
    carService
      .delete(req.params.id)
      .then((result) => {
        res.json({ status: "OK", data: result });
      })
      .catch((err) => {
        console.log(err);
        res.status(406).json({ status: "FAIL", error: err });
      });
  },
};
