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
  console.log(req.body);
  try {
    const obj = req.body;
    const html = `<div>
        <p>${obj.firstName}</p>
        <p>${obj.lastName}</p>
        <p>${obj.email}</p>
        <p>${obj.contact}</p>
      </div>`;
    const info = await client.send({
      from: sender,
      to: recipients,
      subject: "You are awesome!",
      text: "Congrats for sending test email with Mailtrap!",
      category: "Integration Test",
      html: html,
    });
    console.log(info);
    console.log(html);

    res.send("Hello World!");
  } catch {
    console.log("error");
    res.send("Error");
  }
});
app.listen(PORT, () => console.log(`Server Started at PORT:${PORT}`));
