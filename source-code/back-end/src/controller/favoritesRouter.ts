// endpoint: /social
require("dotenv").config();
import express from "express";
import { logger } from "../util/logger";

import type { Validation } from "../util/validation.type";
const router = express.Router();

import FavoriteService from "../service/favoriteService";
import * as favoriteDAO from "../repository/favoriteDAO";
import * as userDAO from "../repository/userDAO";
const favoriteService = FavoriteService(favoriteDAO, userDAO);

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

router.post("/", async (req: any, res: any) => {
  try {
    const validation: Validation = await favoriteService.validateInputFavorite(
      req.body
    );

    if (!validation.isValid) {
      res.status(400).json({ errors: validation.errors });
      return;
    }

    await favoriteService.createFavorite(req.body);
    res.sendStatus(201);
  } catch (err) {
    console.error(err);
    logger.error(err);
    res.sendStatus(500);
  }
});

router.delete("/", async (req: any, res: any) => {
  try {
    const validation: Validation = await favoriteService.validateUpdateFavorite(
      req.body
    );

    if (!validation.isValid) {
      res.status(400).json({ errors: validation.errors });
      return;
    }

    await favoriteService.deleteFavorite(req.body);
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
    const content: string = req.query.content;
    let validation: Validation = { isValid: false, errors: []};

    if (user) {
      validation = await favoriteService.validateId(user);
    } else if (content) {
      validation = await favoriteService.validateId(content);
    } 

    if (!validation.isValid) {
      res.status(400).json({ errors: validation.errors });
      return;
    }

    let data;
    if (user) {
      data = await favoriteService.getUserFavorites(user);
    } else if (content) {
      data = await favoriteService.getContentFavorites(content);
    } 

    res.sendStatus(201).json(data);
  } catch (err) {
    console.error(err);
    logger.error(err);
    res.sendStatus(500);
  }
});

export default router;
