import { Router } from "express";
import authMiddleware from "../middlewares/auth";
import UserController from "../controllers/user";
import GuardiansController from "../controllers/guardians";
import GuardedController from "../controllers/guarded";
import MessageController from "../controllers/message";
import TagsController from "../controllers/tags";

const routes = new Router();

//----> Unauthenticated routes
routes.post("/login", UserController.login);
routes.post("/forgot-password", UserController.forgotPassword);
routes.post("/reset-password", UserController.resetPassword);
routes.post("/addUsers", UserController.create);
//----> Authenticated routes
routes.use(authMiddleware);

routes.get("/user", UserController.get);
routes.put("/user", UserController.updateUser);
routes.get("/finduser", UserController.getAll);
routes.get("/userdetails/:id", UserController.userDetails);

routes.post("/addGuardians", GuardiansController.create);
routes.get("/findguardians", GuardiansController.getAll);
routes.get("/guardiandetails/:id", GuardiansController.guardianDetails);

routes.post("/addGuarded", GuardedController.create);
routes.get("/findguarded", GuardedController.getAll);
routes.get("/guardeddetails/:id", GuardedController.guardedDetails);

routes.post("/addMessage", MessageController.create);

routes.post("/addTags", TagsController.create);

export default routes;
