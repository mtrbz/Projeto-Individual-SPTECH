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

function armazenarPartida(req, res) {
    var idUsuarioPartida = req.body.idUsuarioServer;
    var venceuPartida = req.body.venceuServer;
    var desistiuPartida = req.body.desistiuServer;
    var tentativasPartida = req.body.tentativasServer;

    if (tentativasPartida == 0) {
        res.status(400).send("Nem tentou");
    } else {

        partidaModel.armazenarPartida(idUsuarioPartida, venceuPartida, desistiuPartida, tentativasPartida)
            .then(
                function (resultado) {
                    console.log(`\nResultados encontrados: ${resultado}`);
                    console.log(`Resultados: ${JSON.stringify(resultado)}`); // transforma JSON em String

                    if (!tentativasPartida || !venceuPartida || !desistiuPartida || !idUsuarioPartida) {
                        console.log(resultado);
                        res.status(400).send('Inválido')

                    } else {
                        console.log(resultado);
                        res.json({
                            idPartida: resultado.idPartida,
                            fkUsuario: resultado.idUsuarioPartida,
                            venceu: resultado.venceuPartida,
                            desistiu: resultado.desistiuPartida,
                            tentativas: resultado.tentativasPartida
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

module.exports = {
    armazenarPartida,
    selecionarPartida
}