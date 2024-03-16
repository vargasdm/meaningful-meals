// endpoint: /social
require("dotenv").config();
import express from "express";
import { logger } from "../util/logger";

import type { Validation } from "../util/response";
const router = express.Router();

import FavoriteService from "../service/favoriteService";
import favoriteDAO from "../repository/favoriteDAO";
import userDAO from "../repository/userDAO";
import { authenticateToken } from "../util/authenticateToken";
import { validateFavoriteBody } from "../util/authenticateBody";
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

router.post(
  "/",
  authenticateToken,
  validateFavoriteBody,
  async (req: any, res: any) => {
    try {
      const validation: Validation =
        await favoriteService.validateInputFavorite(req.body);

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
  }
);

router.delete(
  "/",
  authenticateToken,
  validateFavoriteBody,
  async (req: any, res: any) => {
    try {
      const validation: Validation =
        await favoriteService.validateUpdateFavorite(req.body);

      if (!validation.isValid) {
        res.status(400).json({ errors: validation.errors });
        return;
      }

      await favoriteService.deleteFavorite(req.body);
      res.sendStatus(202);
    } catch (err) {
      console.error(err);
      logger.error(err);
      res.sendStatus(500);
    }
  }
);

// not full working
router.get("/", authenticateToken, async (req: any, res: any) => {
  try {
    const user: string = req.query.user;
    const item: string = req.query.user;
    if (!user && !item) {
      res.status(400).json({ errors: "MISSING QUERIES" });
      return;
    }
    let validation: Validation = await favoriteService.validateInputFavorite({
      user_id: user,
      content_id: item,
    });

    if (!validation.isValid) {
      res.status(400).json({ errors: validation.errors });
      return;
    }

    let data;

    if (user && !item) {
      data = await favoriteService.getUserFavorites(user);
    } else if (!user && item) {
      data = await favoriteService.getContentFavorites(user);
    } else if (user && item) {
      data = await favoriteService.getUserContentFavorite({
        user_id: user,
        content_id: item,
      });
    }

    res.status(200).json(data);
  } catch (err) {
    console.error(err);
    logger.error(err);
    res.sendStatus(500);
  }
});

export default router;
