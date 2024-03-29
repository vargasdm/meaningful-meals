import dotenv from "dotenv";
dotenv.config();
import {
	authenticateToken,
} from "../util/authenticateToken";
import { validateRecipeBody, validateRecipeID } from "../util/authenticateBody";

import express from "express";
const router = express.Router();
import recipeService from "../service/recipeService";
import { logger } from "../util/logger";

// This should return search results if there's a 'query' query parameter,
// or a specific recipe if there's an 'id' query parameter
router.get("/", async (req: any, res: any) => {
	try {
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
	} catch (err) {
		console.error(err);
		res.sendStatus(500);
	}
});

// this is endpoint for when user is looking at thier recipe tab
// this is a protected endpoint, but I didnt want to make a token so I will need to add the authenticateNoToken later
router.get(
	"/user-recipes/:username",
	authenticateToken,
	async (req: any, res: any) => {
		console.log(req.params);
		console.log(req.params.username);

		if (req.params) {
			const recipes = await recipeService.getUserRecipes(req.params);
			res.status(200).json(recipes);
			return;
		}
	}
);

router.put(
	"/update",
	validateRecipeBody,
	authenticateToken,
	async (req: any, res: any) => {
		console.log("recipeRouter.post(/update)...");
		console.log(req.body);

		const data = await recipeService.putRecipe(req.body);

		if (data) {
			logger.info(`Updated Recipe: ${data.title}`);
			res.status(201).json({ message: `Recipe Updated Successfully` });
		} else {
			res.status(401).json({
				message: "Recipe was not updated. Invalid Inputs.",
			});
		}
	}
);

router.post(
	"/create",
	validateRecipeBody,
	authenticateToken,
	async (req: any, res: any) => {
		console.log("recipeRouter.post(/create)...");
		console.log(req.body);

		const data = await recipeService.createRecipe(req.body);

		if (data) {
			logger.info(`New Recipe: ${data.title}`);
			res.status(201).json({ message: `New Recipe Created Successfully` });
		} else {
			res.status(401).json({
				message: "Recipe was not created. Invalid Inputs.",
			});
		}
	}
);

router.delete(
	"/user-recipes/delete/:id",
	validateRecipeID,
	async (req: any, res: any) => {
		console.log(req.params);

		const idParam = req.params;

		const data = await recipeService.deleteRecipe(idParam);

		if (data) {
			logger.info(`Deleted Recipe: ${data.title}`);
			res.status(201).json({ message: `Recipe Deleted Successfully` });
		} else {
			res.status(401).json({
				message: "Recipe was not deleted. Invalid Inputs.",
			});
		}
	}
);

export default router;
