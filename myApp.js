let express = require("express");
let app = express();

console.log("Hello World");

app.get("/", (req, res) => {
  console.log("Hello Express");
  res.send("Hello Express");
});

module.exports = app;
