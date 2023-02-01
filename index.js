import * as dotenv from "dotenv";
import db from "./src/models";
import express from "express";
import routes from "./src/routes";
dotenv.config();
const app = express();

app.use(express.json());
app.use(routes);

app.listen(3000, async () => {
  try {
    await db.sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
});
