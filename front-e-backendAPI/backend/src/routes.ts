import { Router } from "express";
import multer from "multer";

import uploadConfig from "./config/upload";
import PostController from "./controllers/PostController";
import UsersController from "./controllers/UsersController";

const routes = Router();
const upload = multer(uploadConfig);

routes.post("/users", UsersController.create);
routes.get("/users", UsersController.index);
routes.get("/users/:id", UsersController.show);
routes.delete("/users/:id", UsersController.delete);

routes.get("/posts", PostController.index);
routes.get("/posts/:id", PostController.show);
routes.post("/posts", upload.array("images"), PostController.create);


export default routes;