import db from "./src/models";
import express from "express";
import UserController from "./src/controllers/user";
import GuardiansController from "./src/controllers/guardians";
import GuardedController from "./src/controllers/guarded";
import MessageController from "./src/controllers/message";
import TagsController from "./src/controllers/tags";
const app = express();

app.use(express.json());

app.post("/AddGuarded", GuardedController.create);
app.post("/AddUsers", UserController.create);
app.post("/AddGuardians", GuardiansController.create);
app.post("/AddMessage", MessageController.create);
app.post("/AddTags", TagsController.create);

app.listen(3333, async () => {
  try {
    await db.sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
});
