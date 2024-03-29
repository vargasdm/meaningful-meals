// endpoint: /user
import dotenv from "dotenv";
dotenv.config();
import express from "express";
import jwt from "jsonwebtoken";
import { logger } from "../util/logger";

import type { Validation } from "../util/validation.type";
const router = express.Router();

import createUserService from "../service/userService";
import userDAO from "../repository/userDAO";
import { authenticateToken } from "../util/authenticateToken";
const userService = createUserService(userDAO);

router.post("/login", async (req: any, res: any) => {
  try {
    const validation: Validation = await userService.validateLogin(req.body);

    if (!validation.isValid) {
      res.status(400).json({ errors: validation.errors });
      return;
    }

    const targetUser = await userService.getUserByUsername(req.body.username);

    if (await userService.credentialsMatch(req.body, targetUser)) {
      const token = jwt.sign(
        { user_id: targetUser.user_id },
        process.env.JWT_KEY as string,
        { expiresIn: "30m" }
      );

      res.status(200).json({
        token: token,
        user_id: targetUser.user_id,
        username: targetUser.username,
      });

      return;
    }

    res.status(401).json({ errors: "CREDENTIALS DO NOT MATCH" });
  } catch (err) {
    logger.error(err);
    res.sendStatus(500);
  }
});

// Create
router.post("/register", async (req: any, res: any) => {
  try {
    const validation: Validation = await userService.validateRegistration(
      req.body
    );

    if (!validation.isValid) {
      res.status(400).json({ errors: validation.errors });
      return;
    }

    await userService.createUser(req.body);
    res.sendStatus(201);
  } catch (err) {
    logger.error(err);
    res.sendStatus(500);
  }
});

router.put("/update", authenticateToken, async (req: any, res: any) => {
  try {
    const validation: Validation = userService.validateUpdate(req.body);
    const newUsername = req.query.newUsername;

    if (!validation.isValid) {
      res.status(400).json({ errors: validation.errors });
      return;
    }

    if (!newUsername) {
      await userService.updateUser(req.body);
      res.sendStatus(201);
    } else {
      await userService.updateUser({username:req.body.username, pasword: req.body.password , newUsername: newUsername });
      res.sendStatus(201);
    }
  } catch (error) {
    logger.error(error);
    res.sendStatus(500);
  }
});

export default router;
