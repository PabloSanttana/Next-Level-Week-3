import { Router } from "express";
import multer from "multer";
import OrphanagesController from "./controllers/OrphanagesController";

import uploadConfig from "./config/upload";
import UserCreateController from "./controllers/UserCreateController";
import AuthMiddleware from "./middlewares/auth";
import AuthController from "./controllers/AuthController";

const routes = Router();
const upload = multer(uploadConfig);

routes.post("/login", AuthController.auth);
routes.get("/authenticate/token", AuthMiddleware, AuthController.autoAuth);

routes.get("/orphanages", OrphanagesController.index);
routes.get("/orphanages/:id", OrphanagesController.show);
routes.delete("/orphanages/:id", AuthMiddleware, OrphanagesController.destroy);
routes.put(
  "/orphanages/:id",
  AuthMiddleware,
  upload.array("images"),
  OrphanagesController.update
);
routes.post(
  "/orphanages",
  AuthMiddleware,
  upload.array("images"),
  OrphanagesController.create
);

/* routes.get("/users", UserCreateController.index); */
routes.post("/users", UserCreateController.create);
routes.get("/users/orphanages", AuthMiddleware, UserCreateController.index);

export default routes;
