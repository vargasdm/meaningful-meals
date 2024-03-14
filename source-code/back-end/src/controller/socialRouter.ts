// endpoint: /social
require("dotenv").config();
import express from "express";
import { logger } from "../util/logger";

import type { Validation } from "../util/response";
const router = express.Router();

/**
 * postlike
 * deletelike
 * getalluserlike
 * getallrecipelike
 *
 * post comment
 * update comment
 * delete comment
 * getall user comment
 * getall recipe comment
 */

router.post("like", async (req: any, res: any) => {
  try {
    const validation: Validation = await socialService.validateRegistration(
      req.body
    );

    if (!validation.isValid) {
      res.status(400).json({ errors: validation.errors });
      return;
    }

    await userService.createUser(req.body);
    res.sendStatus(201);
  } catch (err) {
    console.error(err);
    logger.error(err);
    res.sendStatus(500);
  }
});

router.delete("like", async (req: any, res: any) => {
  try {
    const validation: Validation = await socialService.validateRegistration(
      req.body
    );

    if (!validation.isValid) {
      res.status(400).json({ errors: validation.errors });
      return;
    }

    await userService.createUser(req.body);
    res.sendStatus(201);
  } catch (err) {
    console.error(err);
    logger.error(err);
    res.sendStatus(500);
  }
});

router.get("/", async (req: any, res: any) => {
  try {
    const user: string = req.query.user;
    const item: string = req.query.item;
    let validation: Validation;

    if (user) {
    } else if (item) {
    } else {
    }

    validation = await socialService.getAllUserLikes(req.body);

    if (!validation.isValid) {
      res.status(400).json({ errors: validation.errors });
      return;
    }

    await userService.createUser(req.body);
    res.sendStatus(201);
  } catch (err) {
    console.error(err);
    logger.error(err);
    res.sendStatus(500);
  }
});

export default router;
