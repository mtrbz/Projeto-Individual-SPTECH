var quizModel = require("../models/quizModel");

function armazenarTentativas(req, res) {
    var tentativasQuiz = req.body.tentativasServer;

        quizModel.armazenarTentativas(tentativasQuiz)
            .then(
                function (resultado) {
                    console.log(`\nResultados encontrados: ${resultado}`);
                    console.log(`Resultados: ${JSON.stringify(resultado)}`); // transforma JSON em String

                    if (!tentativasQuiz) {
                        res.status(400).send("Tentativa inválida");

                    } else {
                        console.log(resultado);
                        res.json({
                            idQuiz: resultado.idQuiz,
                            tentativas: resultado.tentativasQuiz
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

module.exports = {
    armazenarTentativas
}