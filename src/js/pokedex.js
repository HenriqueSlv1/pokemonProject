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

// Evento que é acionado quando o conteúdo HTML é completamente carregado
document.addEventListener('DOMContentLoaded', function () {
    // Seleciona o elemento HTML onde os Pokémon serão exibidos
    let div = document.getElementById("pokemon");

    // Itera sobre a lista de Pokémon armazenados
    arrayPokemons.forEach(function (id) {
        // Requisição para obter os detalhes de cada Pokémon
        fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
            .then(response => response.json())
            .then(function (poke) {
                // Criação de um elemento div para exibir cada Pokémon
                let divPokemon = document.createElement('div');
                divPokemon.classList = 'borda';

                // Capitaliza a primeira letra do nome do Pokémon e do tipo
                let nomeMaiusculo = poke.name.charAt(0).toUpperCase() + poke.name.slice(1);
                let tipo = poke.types[0].type.name.charAt(0).toUpperCase() + poke.types[0].type.name.slice(1);
                let cor = cores[poke.types[0].type.name];

                // Define a cor de fundo do Pokémon
                divPokemon.style.backgroundColor = cor;

                // Preenche o conteúdo HTML para exibir informações do Pokémon
                divPokemon.id = `pokemon${poke.id}`
                divPokemon.innerHTML =
                    `
                    <div class="pokemons">
                        <p id="id">#${poke.id}</p>
                        <p id="nome">${nomeMaiusculo}</p>
                        <p id="tipo">${tipo}</p>
                    </div>
                    <div id=imagem>
                        <img src="${poke.sprites.front_default}">
                    </div>

                    <div id="todosBotoes">
                        <!-- Botões para remover e detalhar -->
                        <button id="botaoAdicionar" onClick="remove(${poke.id})">Remover</button>
                        <button id="botaoExcluir" onClick="detalhar(${poke.id})"><a href="detalhes.html">Detalhes</a></button>
                    </div>
                    `;
                // Adiciona o elemento à seção de Pokémon na página HTML
                div.appendChild(divPokemon);
            })
            .catch(err => console.log("Erro: " + err));
    });
});

// Função para remover um Pokémon da Pokédex
function remove(id) {
    const index = arrayPokemons.indexOf(id);
    if (index !== -1) {
        arrayPokemons.splice(index, 1);
        // Remove o elemento do DOM
        const div = document.getElementById(`pokemon${id}`);
        div.remove();
        // Atualiza a lista de Pokémon na sessão do navegador
        sessionStorage.setItem('arrayPokemons', JSON.stringify(arrayPokemons));
    }
}

// Função para armazenar o ID do Pokémon selecionado para detalhes na sessão do navegador
function detalhar(id) {
    let pokeDetalhes = id
    sessionStorage.setItem('pokeDetalhes', JSON.stringify(pokeDetalhes))
}
