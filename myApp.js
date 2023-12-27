let express = require("express");
let bodyParser = require("body-parser");
let app = express();

console.log("Hello World");

//below this, it show us how to use one of express middle ware to serve our public files for /public routes
app.use("/public", express.static(__dirname + "/public"));

app.use(bodyParser.urlencoded({ extended: false }));

// below this, it is showing us how to use middle ware for all routes
app.use((req, res, next) => {
  console.log(req.method + " " + req.path + " - " + req.ip);
  next();
});

// below this, we see how to serve files to http request
// you sholud know that, __dirname is node glbal variable that store the absolute file
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
