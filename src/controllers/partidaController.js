var partidaModel = require("../models/partidaModel");

function selecionarPartida(req, res) {
    var idUsuarioPartida = req.body.idUsuarioServer;

        partidaModel.selecionarPartida(idUsuarioPartida)
            .then(
                function (resultado) {
                    console.log(`\nResultados encontrados: ${resultado}`);
                    console.log(`Resultados: ${JSON.stringify(resultado)}`); // transforma JSON em String

                    if (resultado.length > 0) {
                        var qtd = resultado[0].qtd;

                        console.log(resultado);
                        res.json({
                            qtdPartidas: qtd
                        });

                    } else {
                        res.json ({
                            qtdPartidas: 0
                        });
                    }
                    
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
}

function selecionarVitorias(req, res) {
    var idUsuarioVitorias = req.body.idUsuarioServer;

        partidaModel.selecionarVitorias(idUsuarioVitorias)
            .then(
                function (resultado) {
                     // transforma JSON em String

                    if (resultado.length > 0) {
                        var qtd = resultado[0].qtd;

                        console.log(resultado);
                        res.json({
                            qtdVitorias: qtd
                        });

                    } else {
                        res.json ({
                            qtdVitorias: 0
                        });
                    }
                    
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um ERRO: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
}

function selecionarRank(req, res) {
    var idUsuarioRank = req.body.idUsuarioServer;
    var usuarioNome = req.body.nomeServer;

        partidaModel.selecionarRank(idUsuarioRank, usuarioNome)
            .then(
                function (resultado) {
                     // transforma JSON em String

                        console.log(resultado);
                        res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um ERRO: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
}

function armazenarPartida(req, res) {
    var idUsuarioPartida = req.body.idUsuarioServer;
    var venceuPartida = req.body.venceuServer;
    var desistiuPartida = req.body.desistiuServer;
    var tentativasPartida = req.body.tentativasServer;
    var pontosPartida = req.body.pontosServer;

    if (tentativasPartida == 0) {
        res.status(400).send("Nem tentou");
    } else {

        partidaModel.armazenarPartida(idUsuarioPartida, venceuPartida, desistiuPartida, tentativasPartida, pontosPartida)
            .then(
                function (resultado) {
                     // transforma JSON em String

                    if (!tentativasPartida || !venceuPartida || !desistiuPartida || !idUsuarioPartida) {
                        
                        res.status(400).send('Inválido')

                    } else {
                        
                        res.json({
                            idPartida: resultado.idPartida,
                            fkUsuario: resultado.idUsuarioPartida,
                            venceu: resultado.venceuPartida,
                            desistiu: resultado.desistiuPartida,
                            tentativas: resultado.tentativasPartida,
                            pontos: resultado.pontosPartida
                        });
                    }
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

}

function obterDadosGrafico(req, res) {
    var fkUsuario = req.params.fkUsuario;
    console.log(fkUsuario)
        partidaModel.obterDadosGrafico(fkUsuario)
            .then(
                function (resultado) {
                    console.log(`\nResultados encontrados do grafico dos cria: ${resultado}`);
                    console.log(`Resultados: ${JSON.stringify(resultado)}`); // transforma JSON em String
                    
                    res.json(resultado);
                    
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um ERRO: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
}

function obterDadosGraficoPizza(req, res) {
    var fkUsuario = req.params.fkUsuario;
    console.log(fkUsuario)
        partidaModel.obterDadosGraficoPizza(fkUsuario)
            .then(
                function (resultado) {
                    console.log(`\nResultados encontrados do grafico pizza: ${resultado}`);
                    console.log(`Resultados: ${JSON.stringify(resultado)}`); // transforma JSON em String
                    
                    res.json(resultado);
                    
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um ERRO: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
}

function obterTentativasGerais(req, res) {
    partidaModel.obterTentativasGerais()
    .then(function (resposta) {
        console.log(`\n Resultados encontrados tt gerais: ${resposta}`);
        console.log(`\n Resultados ${JSON.stringify(resposta)}`);

        res.json(resposta);
    })
    .catch(function (erro) {
        console.log(erro);
        res.status(500).json(erro.sqlMessage);
    });
};

module.exports = {
    armazenarPartida,
    selecionarPartida,
    selecionarVitorias,
    selecionarRank,
    obterDadosGrafico,
    obterDadosGraficoPizza,
    obterTentativasGerais
}