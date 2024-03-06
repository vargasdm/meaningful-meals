require('dotenv').config(); // You should place this as early as possible in any source file that reads from process.env
const express = require("express");
const app = express();
const PORT = process.env.PORT;

app.use(express.json());

app.listen(PORT, () => {
    console.log(`Server is listening on http://localhost:${PORT}`);
});
