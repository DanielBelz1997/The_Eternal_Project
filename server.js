const express = require("express");
const app = express();
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const os = require("os");
const path = require("path");
const fs = require("fs");
const { logger, logEntries } = require("./middleware/functions.js");
const EventEmitter = require("events");
const fsPromises = require("fs").promises;
const errorHandler = require("./middleware/errorHandler.js");
const verifyJWT = require("./middleware/verifyJWT");
const cookieParser = require("cookie-parser");
const PORT = process.env.PORT || 8080;
const session = require("express-session");
const credentials = require("./middleware/credentials");
const cmd = require("node-cmd");
const { connect } = require("./data/database");

app.use(credentials);

app.set("view engine", "ejs");

app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: false }));

app.use(express.json());

app.use(cookieParser());

app.use("*/css", express.static("public/css"));
app.use("*/js", express.static("public/js"));
app.use("*/img", express.static("public/img"));

app.use("/", require("./routes/root"));
app.use("/register", require("./routes/register"));
app.use("/login", require("./routes/login"));
app.use("/refresh", require("./routes/refresh"));
app.use("/logout", require("./routes/logout"));
app.use("/professinal", require("./routes/professinal"));
app.use(verifyJWT);
app.use("/users", require("./routes/api/users"));

// -----------------

class MyEmitter extends EventEmitter {}
const myEmitter = new MyEmitter();

myEmitter.on("log", (msg) => logEntries(msg));
myEmitter.emit("log", "connection established!");

// ----------------

app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "pages", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ error: "404 Not Found" });
  } else {
    res.type("txt").send("404 Not Found");
  }
});

app.use(errorHandler);

app.listen(PORT, () => console.log(`server running on port: ${PORT}`));

connect();

//  os.type
//  os.version
//  os.homedir
