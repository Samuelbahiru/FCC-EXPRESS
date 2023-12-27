let express = require("express");
let app = express();

console.log("Hello World");

app.use("/public", express.static(__dirname + "/public"));

app.use((req, res, next) => {
  console.log(req.method + " " + req.path + " - " + req.ip);
  next();
});

app.get("/", (req, res) => {
  //   console.log("Hello Express");
  //   res.send("Hello Express");
  res.sendFile(__dirname + "/views/index.html");
});

app.get(
  "/now",
  (req, res, next) => {
    req.time = new Date().toString();
  },
  (req, res) => {
    res.json({ time: req.time });
  }
);

app.get("/json", (req, res) => {
  let response = "Hello json";
  console.log("process.env", process.env.MESSAGE_STYLE);
  if (process.env.MESSAGE_STYLE === "uppercase") {
    response = response.toUpperCase();
  }
  res.json({ message: response });
});

module.exports = app;
