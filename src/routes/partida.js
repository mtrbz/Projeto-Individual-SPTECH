var express = require("express");
var router = express.Router();

var partidaController = require("../controllers/partidaController");

//Recebendo os dados do html e direcionando para a função cadastrar de partidaController.js
router.post("/armazenarPartida", function (req, res) {
    partidaController.armazenarPartida(req, res);
})

router.post("/selecionarPartida", function (req, res) {
    partidaController.selecionarPartida(req, res);
});

module.exports = router;