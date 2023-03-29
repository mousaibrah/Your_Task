const express = require("express");
require("dotenv").config();
const db = require("./module/db");
const cors = require("cors");
const todoRouter = require("./routes/toDos");
const app = express();
const PORT = 5000;
app.use(express.json());
app.use(cors());
app.use("/todos", todoRouter);

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));
