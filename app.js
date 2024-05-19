require("dotenv").config();

const path = require("path");
const express = require("express");
const cookiePaser = require("cookie-parser");

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.urlencoded({ extended: false }));
app.use(cookiePaser());
app.use(express.static(path.resolve("./public")));

app.get("/", async (req, res) => {
  res.send("Welcome");
});

app.listen(PORT, () => console.log(`Server Started at PORT:${PORT}`));
