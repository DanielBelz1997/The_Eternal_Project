const express = require("express");
const router = express.Router();
const professinalController = require("../controllers/professinalController");

router.post("/", professinalController.handleProfessional);

module.exports = router;
