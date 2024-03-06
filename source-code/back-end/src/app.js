require('dotenv').config(); // You should place this as early as possible in any source file that reads from process.env
const express = require("express");
const app = express();
const PORT = process.env.PORT;
const recipeRouter = require('./controller/recipeRouter.ts');

app.use(express.json());
app.use('/recipes', recipeRouter);

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}.`);
});