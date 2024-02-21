    const express = require('express');
    const bodyParser = require('body-parser');
    const dados = '/data/dados.json'
    const fs = require('fs');

    const app = express();
    app.use(bodyParser.json());

    app.post('/adicionarPokemon', (req, res) => {
        console.log('Recebida solicitação POST para adicionar um Pokémon:', req.body);

        // Restante do código..
        const { id, nome, tipo } = req.body;

        let dados;
        try {
            dados = fs.readFileSync('./data/dados.json', 'utf8');
            dados = JSON.parse(dados);
        } catch (err) {
            dados = { Pokemon: [] };
        }

        dados.Pokemon.push({ id, nome, tipo });
        salvarDados(dados)

        fs.writeFileSync('./data/dados.json', JSON.stringify(dados));

        res.json({ success: true });
    });

    function salvarDados(){
        fs.writeFileSync(
            __dirname + ".\data\dados.json",
            JSON.stringify(dados, null, 2)
        )
    }

    app.listen(3000, () => {
        console.log('Servidor rodando na porta 3000');
    });
