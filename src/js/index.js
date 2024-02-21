// Definição das cores associadas a tipos de Pokémon



cores = {
    fighting: '#d56723', normal: '#a4acaf', ghost: '#7b62a3', steel: '#9eb7b8', dark: '#707070', ice: '#51c4e7',
    fire: '#fd7d24', grass: '#9bcc50', electric: '#eed535', water: '#4592c4', ground: '#ab9842', rock: '#a38c21',
    fairy: '#fdb9e9', poison: '#b97fc9', bug: '#729f3f', dragon: '#53a4cf', psychic: '#f366b9', flying: '#bdb9b8'
}

// Recupera a lista de Pokémon armazenada na sessão do navegador
const armazenarArray = sessionStorage.getItem('arrayPokemons')
let arrayPokemons;

// Verifica se a lista de Pokémon existe e a carrega, caso contrário, cria uma lista vazia
if (armazenarArray) {
    arrayPokemons = JSON.parse(armazenarArray);
} else {
    arrayPokemons = [];
}

// Requisição à API PokeAPI para obter os detalhes dos primeiros 20 Pokémon
fetch(`https://pokeapi.co/api/v2/pokemon/?offset=0&limit=20`)
    .then(response => response.json())
    .then(function (data) {
        // Seleciona o elemento HTML onde os Pokémon serão exibidos
        let div = document.getElementById("pokemon");

        // Itera sobre os resultados da API
        data.results.forEach(function (pokemon) {
            // Requisição para obter os detalhes de cada Pokémon
            fetch(pokemon.url)
                .then(response => response.json())
                .then(function (poke) {
                    // Criação de um elemento div para exibir cada Pokémon
                    let divPokemon = document.createElement('div');
                    divPokemon.classList = 'borda';

                    // Capitaliza a primeira letra do nome do Pokémon e do tipo
                    let nomeMaiusculo = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
                    let tipos = poke.types[0].type.name.charAt(0).toUpperCase() + poke.types[0].type.name.slice(1);

                    // Obtém a cor associada ao tipo primário do Pokémon
                    let cor = cores[poke.types[0].type.name];
                    divPokemon.style.backgroundColor = cor;

                    // Preenche o conteúdo HTML para exibir informações do Pokémon
                    divPokemon.id = `pokemon${poke.id}`
                    divPokemon.innerHTML =
                        `
                <div class="pokemons">
                    <p id="id">#${poke.id}</p>
                    <p id="nome">${nomeMaiusculo}</p>
                    <p id="tipo">${tipos}</p>
                </div>
                <div id=imagem>
                <img src="${poke.sprites.front_default}">
                </div>

                <div id=todosBotoes>    
                    <!-- Botões para adicionar e detalhar -->
                    <button id="botaoAdicionar" onClick="adiciona(${poke.id})">Adicionar</button>
                    <button id="botaoExcluir" onClick="detalhar(${poke.id})"><a href="detalhes.html">Detalhes</a></button>
                </div>
                `;

                    // Adiciona o elemento à seção de Pokémon na página HTML
                    div.appendChild(divPokemon);

                    // Oculta os Pokémon já presentes na Pokédex
                    for (let i = 0; i < arrayPokemons.length; i++) {
                        let divpoke = document.getElementById(`pokemon${arrayPokemons[i]}`)
                        divpoke.style.display = 'none'
                    }
                })
                .catch(err => console.log("erro: " + err));
        });
    })
    .catch(err => console.log("erro: " + err));

// Função para adicionar um Pokémon à Pokédex
function adiciona(id, nome, tipo) {
    const div = document.getElementById(`pokemon${id}`);
    div.remove();
    arrayPokemons.push(id);
    sessionStorage.setItem('arrayPokemons', JSON.stringify(arrayPokemons));

    // Enviar os dados do Pokémon para o servidor
    fetch('http://localhost:3000/adicionarPokemon', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, nome, tipo }),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Pokémon adicionado com sucesso aos dados.json!', data);
    })
    .catch(error => {
        console.error('Erro ao adicionar Pokémon:', error);
    });
}

// Função para armazenar o ID do Pokémon selecionado para detalhes na sessão do navegador
function detalhar(id) {
    let pokeDetalhes = id
    sessionStorage.setItem('pokeDetalhes', JSON.stringify(pokeDetalhes))
}


