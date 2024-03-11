import dotenv from "dotenv";
dotenv.config();
import { authenticateNoToken } from "../util/authenticateToken";

import express from "express";
const router = express.Router();
import recipeService from "../service/recipeService";
import { log } from "console";

// This should return search results if there's a 'query' query parameter,
// or a specific recipe if there's an 'id' query parameter
router.get("/", async (req: any, res: any) => {
  if (req.query.query) {
    const recipes = await recipeService.searchRecipes(req.query.query);
    res.status(200).json(recipes);
    return;
  }

  if (req.query.id) {
    const recipe: any = await recipeService.getRecipe(req.query.id);
    res.status(200).json(recipe);
    return;
  }

  res.status(400).json({ error: "QUERY PARAMS INVALID" });
});

// this is endpoint for when user is looking at thier recipe tab
// this is a protected endpoint, but I didnt want to make a token so I will need to add the authenticateNoToken later
router.get("/:username", async (req: any, res: any) => {
  console.log(req.params);
  console.log(req.params.username);

  if (req.params) {
    const recipes = await recipeService.getUserRecipes(req.params);
    res.status(200).json(recipes);
    return;
  }
});

export default router;
