import { Router } from "express";
import authMiddleware from "../middlewares/auth";
import UserController from "../controllers/user";
import GuardiansController from "../controllers/guardians";
import GuardedController from "../controllers/guarded";
import MessageController from "../controllers/message";
import TagsController from "../controllers/tags";

const routes = new Router();

//----> Unauthenticated routes
//User
routes.post("/login", UserController.login);
routes.post("/addUsers", UserController.create);
routes.post("/forgot-password", UserController.forgotPassword);
routes.post("/reset-password", UserController.resetPassword);
routes.get("/finduser", UserController.getAll);
routes.get("/userdetails/:id", UserController.userDetails);
//Guardian
routes.post("/addGuardians", GuardiansController.create);
routes.get("/findguardians", GuardiansController.getAll);
routes.get("/guardiandetails/:id", GuardiansController.guardianDetails);
//Guarded
routes.post("/addGuarded", GuardedController.create);
routes.get("/findguarded", GuardedController.getAll);
routes.get("/guardeddetails/:id", GuardedController.guardedDetails);
//Message
routes.post("/addMessage", MessageController.create);
//Tags
routes.post("/addTags", TagsController.create);

//----> Authenticated routes
routes.use(authMiddleware);
//User
routes.get("/user", UserController.get);

export default routes;
