var database = require("../database/config")

function selecionarPartida(fkUsuario) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", fkUsuario)
    var instrucaoSql = `
        SELECT COUNT(idPartida) AS qtd
        FROM partida
        WHERE fkUsuario = ${fkUsuario};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function selecionarVitorias(fkUsuario) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", fkUsuario)
    var instrucaoSql = `
        SELECT ROUND(
        (SELECT avg(venceu) * 100)) AS qtd
        FROM partida 
        WHERE fkUsuario = ${fkUsuario};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function selecionarRank(fkUsuario, usuarioNome) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", fkUsuario, usuarioNome)
    var instrucaoSql = `
        SELECT nome AS nome, SUM(pontos) AS pontos
        FROM partida JOIN usuario
        on fkUsuario = idUsuario
        GROUP BY fkUsuario 
        ORDER BY sum(pontos) DESC LIMIT 5;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

// Coloque os mesmos parâmetros aqui. Vá para a var instrucaoSql
function armazenarPartida(fkUsuario, venceu, desistiu, tentativas, pontos) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", venceu, desistiu, tentativas, pontos);
    
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucaoSql = `
        INSERT INTO partida (fkUsuario, venceu, desistiu, tentativas, pontos) VALUES (${fkUsuario}, ${venceu}, ${desistiu}, ${tentativas}, ${pontos});
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function obterDadosGrafico(fkUsuario) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", fkUsuario)
    var instrucaoSql = `
        SELECT tentativas
        FROM partida
        WHERE fkUsuario = ${fkUsuario}
        ORDER BY idPartida DESC LIMIT 8;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function obterDadosGraficoPizza(fkUsuario) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", fkUsuario)
    var instrucaoSql = `
        SELECT sum(venceu) as Vitórias,
        sum(desistiu) as Derrotas
        FROM partida
        WHERE fkUsuario = ${fkUsuario};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function obterTentativasGerais() {
    console.log("ACESSEI O TT GERAIS MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar():")
    var instrucaoSql = `
    SELECT ROUND(AVG(tentativas)) AS media,
    nome as nome FROM usuario JOIN partida
    ON fkUsuario = idUsuario GROUP BY idUsuario;
    `;

    return database.executar(instrucaoSql);
}

module.exports = {
    armazenarPartida,
    selecionarPartida,
    selecionarVitorias,
    selecionarRank,
    obterDadosGrafico,
    obterDadosGraficoPizza,
    obterTentativasGerais
};