const { Router } = require("express");
const express = require("express");
const upload = require("./multer");

const controller = require("../app/controllers");

const apiRouter = Router();

apiRouter.post(
  "/cars",
  upload.single("image"),
  controller.api.carController.create
);
apiRouter.put(
  "/cars/:id",
  upload.single("image"),
  controller.api.carController.update
);
apiRouter.get("/cars", controller.api.carController.get);
apiRouter.get("/cars/:id", controller.api.carController.getById);
apiRouter.delete("/cars/:id", controller.api.carController.delete);

module.exports = apiRouter;
