const { spawn } = require("child_process");
const path = require("path");
const fs = require("fs");

const handleProfessional = function (commands) {
  const cmd = spawn("cmd.exe", [
    "/c",
    "start",
    "cmd.exe",
    "/K",
    "opener",
    "scriptPath",
  ]);

  cmd.stdout.on("data", (data) => {
    console.log(`stdout: ${data}`);
  });

  cmd.stderr.on("data", (data) => {
    console.error(`stderr: ${data}`);
  });

  cmd.on("close", (code) => {
    console.log(`child process exited with code ${code}`);
  });
};

module.exports = {
  handleProfessional,
};
