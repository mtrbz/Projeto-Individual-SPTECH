var express = require("express");
var router = express.Router();

var partidaController = require("../controllers/partidaController");

//Recebendo os dados do html e direcionando para a função cadastrar de partidaController.js
router.post("/armazenarPartida", function (req, res) {
    partidaController.armazenarPartida(req, res);
});

router.post("/selecionarPartida", function (req, res) {
    partidaController.selecionarPartida(req, res);
});

router.post("/selecionarVitorias", function (req, res) {
    partidaController.selecionarVitorias(req, res);
});

router.get("/selecionarPontos/:fkUsuario", function (req, res) {
    partidaController.selecionarPontos(req, res);
});

router.get("/selecionarFavorito/:fkUsuario", function (req, res) {
    partidaController.selecionarFavorito(req, res);
});

router.get("/selecionarRank", function (req, res) {
    partidaController.selecionarRank(req, res);
});

router.get("/obterDadosGrafico/:fkUsuario", function (req, res) {
    partidaController.obterDadosGrafico(req, res);
});

router.get("/obterDadosGraficoPizza/:fkUsuario", function (req, res) {
    partidaController.obterDadosGraficoPizza(req, res);
});

router.get("/obterTentativasGerais", function (req, res) {
    partidaController.obterTentativasGerais(req, res)
});

router.get("/porcentagemAcertoGeral", function (req, res) {
    partidaController.porcentagemAcertoGeral(req, res)
});

router.get("/totalPartidas", function (req, res) {
    partidaController.totalPartidas(req, res)
});

router.get("/obterDesempenhoGeral", function (req, res) {
    partidaController.obterDesempenhoGeral(req, res)
});

module.exports = router;