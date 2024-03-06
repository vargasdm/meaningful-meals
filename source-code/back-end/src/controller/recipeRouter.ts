require('dotenv').config();
const express = require('express');
const router = express.Router();
const recipeService = require('../service/recipeService.ts');

router.get('/:query', async (req, res) => {
	res.json(recipeService.searchRecipes(req.params.query));
});