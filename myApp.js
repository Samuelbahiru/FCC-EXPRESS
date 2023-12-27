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
    next();
  },
  (req, res) => {
    res.json({ time: req.time });
  }
);
app.get("/:word/echo", (req, res) => {
  res.json({
    echo: req.params.word,
  });
});

app
  .route("/name")
  .get((req, res) => {
    console.log("req", req.query);
    let firstName = req.query.first;
    let lastName = req.query.last;

    res.json({
      name: `${firstName} ${lastName}`,
    });
  })
  .post((req, res) => {
    let firstName = req.query.first;
    let lastName = req.query.last;

    res.json({
      name: `${firstName} ${lastName}`,
    });
  });

app.get("/json", (req, res) => {
  let response = "Hello json";
  console.log("process.env", process.env.MESSAGE_STYLE);
  if (process.env.MESSAGE_STYLE === "uppercase") {
    response = response.toUpperCase();
  }
  res.json({ message: response });
});

module.exports = app;
