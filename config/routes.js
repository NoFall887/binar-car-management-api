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
  controller.api.usersController.authorize,
  upload.single("image"),
  controller.api.carController.update
);
apiRouter.get("/cars", controller.api.carController.get);
apiRouter.get(
  "/cars/:id",
  controller.api.usersController.authorize,
  controller.api.carController.getById
);
apiRouter.delete(
  "/cars/:id",
  controller.api.usersController.authorize,
  controller.api.carController.delete
);

apiRouter.post("users/register", controller.api.usersController.register);
apiRouter.post(
  "users/admin",
  controller.api.usersController.authorize,
  controller.api.usersController.createAdmin
);
apiRouter.post(
  "users/whoami",
  controller.api.usersController.authorize,
  controller.api.usersController.whoami
);
apiRouter.post("users/login", controller.api.usersController.login);
module.exports = apiRouter;
