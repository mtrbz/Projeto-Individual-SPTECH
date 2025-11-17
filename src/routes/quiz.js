var express = require("express");
var router = express.Router();

var quizController = require("../controllers/quizController");

router.post("/armazenarTentativas", function (req, res) {
    quizController.armazenarTentativas(req, res);
});

module.exports = router;