require("dotenv").config();

const path = require("path");
const express = require("express");
const cookiePaser = require("cookie-parser");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 8000;
const { MailtrapClient } = require("mailtrap");

app.use(express.urlencoded({ extended: false }));
app.use(cookiePaser());
app.use(express.static(path.resolve("./public")));

app.use(cors());

// support parsing of application/json type post data
app.use(bodyParser.json());

//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));

const TOKEN = "12ddcd213268f40ac6910b0703791140";
const ENDPOINT = "https://send.api.mailtrap.io/";

const client = new MailtrapClient({ endpoint: ENDPOINT, token: TOKEN });

const sender = {
  email: "mailtrap@demomailtrap.com",
  name: "Mailtrap Test",
};
const recipients = [
  {
    email: "harshitm1234@gmail.com",
  },
];
app.get("/", async (req, res) => {
  res.send("Welcome");
});
app.post("/contact-us", async (req, res) => {
  try {
    const obj = req.body;
    const html = `<div>
        <p>firstName: ${obj.firstName}</p>
        <p>lastName: ${obj.lastName}</p>
        <p>email: ${obj.email}</p>
        <p>contact: ${obj.contact}</p>
      </div>`;
    const info = await client.send({
      from: sender,
      to: recipients,
      subject: "User Query",
      text: "Below are the details for the contacted user",
      html: html,
    });
    res.send({ status: "Success", data: obj });
  } catch {
    res.statusCode = 500;
    res.send({ status: "Error" });
  }
});
app.listen(PORT, () => console.log(`Server Started at PORT:${PORT}`));
