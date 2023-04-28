const express = require("express");
const router = express.Router();
const path = require("path");
const verifyJWT = require("../middleware/verifyJWT");
const verifyRoles = require("../middleware/verifyRoles");

router.get("^/$|/login", (req, res) => {
  res.render(path.join(__dirname, "..", "pages", "login.ejs"));
});

router.get("/index(.html)?", (req, res) => {
  const { username, user_rule } = req.body;
  res.sendFile(path.join(__dirname, "..", "pages", "index.html"), {
    username,
    user_rule,
  });
});

router.get("/register(.ejs)?", (req, res) => {
  res.render(path.join(__dirname, "..", "pages", "register.ejs"));
});

router.get("/logout(.ejs)?", (req, res) => {
  const { username, user_rule } = req.body;
  res.render(path.join(__dirname, "..", "pages", "logout.ejs"), {
    username,
    user_rule,
  });
});

router.get("/professinal", (req, res) => {
  const { username, user_rule } = req.body;
  res.sendFile(path.join(__dirname, "..", "pages", "dashboard.html"), {
    username,
    user_rule,
  });
});

router.get("/scan(.html)?", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "pages", "scan.html"));
});

router.get("/scan_results(.html)?", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "pages", "scan_results.html"));
});

router.get("/ip_def(.html)?", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "pages", "ip_def.html"));
});

router.get("/ip_attack(.html)?", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "pages", "ip_attack.html"));
});

router.get("/def_actions(.html)?", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "pages", "def_actions.html"));
});

router.get("/att_actions(.html)?", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "pages", "att_actions.html"));
});

router.get("/fixing(.html)?", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "pages", "fixing.html"));
});

router.get("/fixing_finished(.html)?", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "pages", "fixing_finished.html"));
});

router.get("/run_exploit(.html)?", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "pages", "run_exploit.html"));
});

router.get("/vulner(.html)?", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "pages", "vulner.html"));
});

router.get("/Dashboard(.html)?", (req, res) => {
  const { username, user_rule } = req.body;
  res.sendFile(path.join(__dirname, "..", "pages", "dashboard.html"), {
    username,
    user_rule,
  });
});

module.exports = router;
