import dotenv from "dotenv";
dotenv.config();
/* For any source file that accesses process.env,
import and call config() on dotenv as early as possible*/

import express, { Express, Request, Response } from "express";
import recipeRouter from "./controller/recipeRouter";
import userRouter from "./controller/userRouter";

const app: Express = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use("/recipes", recipeRouter);
app.use("/user", userRouter);
app.get("/", (req: Request, res: Response) => {
  res.send("The dude abides");
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}.`);
});
