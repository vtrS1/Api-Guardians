import * as dotenv from "dotenv";
dotenv.config();
import db from "./src/models";
import express from "express";
import routes from "./src/routes";
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
