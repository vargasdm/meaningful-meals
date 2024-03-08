import dotenv from "dotenv";
dotenv.config();
/* For any source file that accesses process.env,
import and call config() on dotenv as early as possible*/

import express from 'express';
import cors from 'cors';
// import recipeRouter from './controller/recipeRouter';
// const cors = require("cors");
// import express, { Express, Request, Response } from "express";
import recipeRouter from "./controller/recipeRouter";
import userRouter from "./controller/userRouter";
import { logger } from "./util/logger";

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());

app.use("/recipes", recipeRouter);
app.use("/user", userRouter);
// app.get("/", (req: Request, res: Response) => {
//   res.send("The dude abides");
// });

app.use((req, res, next) => {
  logger.info(`Incoming ${req.method} : ${req.url}`);
  next();
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}.`);
});
