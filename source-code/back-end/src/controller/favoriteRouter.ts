// endpoint: /social
require("dotenv").config();
import express from "express";
import { logger } from "../util/logger";

import type { Validation } from "../util/validation.type";
const router = express.Router();

import { authenticateToken } from "../util/authenticateToken";
import { validateFavoriteBody } from "../util/authenticateBody";

import favoriteDAO from "../repository/favoriteDAO";
import FavoriteService from "../service/favoriteService";
const favoriteService = FavoriteService(favoriteDAO);

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
      logger.error(err);
      res.sendStatus(500);
    }
  }
);

router.get("/", authenticateToken, async (req: any, res: any) => {
  try {
    const user: string = req.query.user;
    const item: string = req.query.user;
    if (!user && !item) {
      res.status(400).json({ errors: "MISSING QUERIES" });
      return;
    }
    let validation: Validation = {
      isValid: false,
      errors: ["MISSING QUERIES"],
    };

    if (user && item) {
      validation = await favoriteService.validateInputFavorite({
        user_id: user,
        content_id: item,
      });
    } else if (!user && item) {
      validation = await favoriteService.validateId(item);
    } else if (user && !item) {
      validation = await favoriteService.validateId(user);
    }

    if (!validation.isValid) {
      res.status(400).json({ errors: validation.errors });
      return;
    }

    let data;

    if (user && item) {
      data = await favoriteService.getUserContentFavorite({
        user_id: user,
        content_id: item,
      });
    } else if (!user && item) {
      data = await favoriteService.getContentFavorites(item);
    } else if (user && !item) {
      data = await favoriteService.getUserFavorites(user);
    }

    res.status(200).json(data);
  } catch (err) {
    logger.error(err);
    res.sendStatus(500);
  }
});

export default router;
