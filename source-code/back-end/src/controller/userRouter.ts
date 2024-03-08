// endpoint: /user
require("dotenv").config();
import express from "express";
import jwt from "jsonwebtoken";
const router = express.Router();
import { logger } from "../util/logger";
import {
  validateLoginBody,
  validateRegisterBody,
} from "../util/authenticateBody";
import { authenticateNoToken } from "../util/authenticateToken";

import { postEmployee, login } from "../service/userService";

// Read
router.post(
  "/login",
  authenticateNoToken,
  validateLoginBody,
  async (req: any, res: any) => {
    const data: any = await login(req.body);
    if (data) {
      const token = jwt.sign(
        {
          user_id: data.user_id,
          username: data.username,
          role: data.role,
        },
        process.env.JWT_KEY as string,
        {
          expiresIn: "15m",
        }
      );

      logger.info(`Login: ${data.username} Token: ${token}`);
      res
        .status(201)
        .json({ message: `Login: ${data.username}`, token });
    } else {
      res.status(400).json({ message: "Failed login" });
    }
  }
);

// Create
router.post(
  "/register",
  authenticateNoToken,
  validateRegisterBody,
  async (req: any, res: any) => {
    const data = await postEmployee(req.body);
    if (data) {
      logger.info(`Created Employee: ${data.username}`);
      res.status(201).json({ message: `Created Employee ${data.username}` });
    } else {
      res.status(400).json({
        message: "Employee was not created. Invalid Credentials.",
      });
    }
  }
);

export default router;
