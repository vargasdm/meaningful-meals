import dotenv from 'dotenv';
dotenv.config();
/* For any source file that accesses process.env,
import and call config() on dotenv as early as possible*/

import express from 'express';
import cors from 'cors';
import recipeRouter from './controller/recipeRouter';

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use('/recipes', recipeRouter);
app.get('/', (req: any, res: any) => {
	res.send('The dude abides');
});

app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}.`);
});