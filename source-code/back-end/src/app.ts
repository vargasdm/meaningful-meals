import dotenv from 'dotenv';
dotenv.config();
/* For any source file that accesses process.env,
import and call config() on dotenv as early as possible*/

import express, { Express, Request, Response } from 'express';

// const express = require('express');
// const recipeRouter = require('./controller/recipeRouter.ts');
const app: Express = express();
const PORT = process.env.PORT;

app.use(express.json());
// app.use('/recipes', recipeRouter);
app.get('/', (req: Request, res: Response) => {
	res.send('Hello, world!');
});

app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}.`);
});