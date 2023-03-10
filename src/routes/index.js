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

//----> Authenticated routes
routes.use(authMiddleware);

routes.get("/user", UserController.get);
routes.put("/user", UserController.updateUser);
routes.get("/userdetails/:id", UserController.userDetails);
routes.post("/addUsers", UserController.create);
routes.get("/finduser", UserController.getAll);
routes.put("/userUpdate", UserController.changedRegisterUser);

routes.post("/addGuardians", GuardiansController.create);
routes.get("/guardiandetails/:id", GuardiansController.guardianDetails);
routes.put("/guardianUpdate", GuardiansController.changedRegisterGuardian);
routes.get("/findguardians", GuardiansController.getAll);

routes.post("/addGuarded", GuardedController.create);
routes.get("/findguarded", GuardedController.getAll);
routes.get("/guardeddetails/:id", GuardedController.guardedDetails);
routes.post("/sendsms", GuardedController.sendMessage);
routes.post("/changed-guardian", GuardedController.changedGuardian);

routes.post("/addMessage", MessageController.create);
routes.get("/findmessages", MessageController.getAll);
routes.get("/messagedetails/:id", MessageController.messageDetails);
routes.get("/updateMessage", MessageController.changedRegisterMessage);

routes.post("/addTags", TagsController.create);
routes.get("/findtags", TagsController.getAll);
routes.get("/tagsdetails/:id", TagsController.tagsDetails);

export default routes;
