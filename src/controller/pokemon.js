const express = require("express");
const server = express();
const dados = require("../data/dados.json");
const fs = require("fs");

server.use(express.json());

server.listen(3000, () => {
  console.log(`Se funcionou, não mexe!`);
});

server.post("/adicionarPokemon", (req, res) => {
  const novoPokemon = req.body;

  if (
    !novoPokemon.id ||
    !novoPokemon.nome ||
    !novoPokemon.tipo
  ) {
    return res
      .status(400)
      .json({ mensagem: "Dados incompletos, tente novamente" });
  } else {
    dados.Pokemon.push(novoPokemon);
    salvarDados(dados);
    return res
      .status(201)
      .json({ mensagem: "Novo usuario cadastrado com sucesso!" });
  }
});


function salvarDados(){
    fs.writeFileSync(__dirname + '../data/dados.json', JSON.stringify(dadosHerois, null, 2))
}
