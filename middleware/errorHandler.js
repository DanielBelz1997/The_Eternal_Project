const { logEntries } = require("./functions");

const errorHandler = (err, req, res, next) => {
  logEntries(`${err.name}: ${err.message}`, "errLog.txt");
  console.error(err.stack);
  res.status(500).send(err.message);
};

module.exports = errorHandler;
