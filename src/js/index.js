cores = {
    fire: '#fd7d24',
    grass: '#9bcc50',
    electric: '#eed535',
    water: '#4592c4',
    ground: '#ab9842',
    rock: '#a38c21',
    fairy: '#fdb9e9',
    poison: '#b97fc9',
    bug: '#729f3f',
    dragon: '#53a4cf',
    psychic: '#f366b9',
    flying: '#bdb9b8',
    fighting: '#d56723',
    normal: '#a4acaf',
    ghost: '#7b62a3',
    steel: '#9eb7b8',
    dark: '#707070',
    ice: '#51c4e7'
}


const armazenarArray = sessionStorage.getItem('arrayPokemons')
let arrayPokemons;

if (armazenarArray) {
    arrayPokemons = JSON.parse(armazenarArray);
} else {
    arrayPokemons = [];
}

fetch(`https://pokeapi.co/api/v2/pokemon/?offset=0&limit=20`)
    .then(response => response.json())
    .then(function (data) {
        let div = document.getElementById("pokemon");

        data.results.forEach(function (pokemon) {
            fetch(pokemon.url)
                .then(response => response.json())
                .then(function (poke) {
                    let divPokemon = document.createElement('div');
                    divPokemon.classList = 'borda';

                    let nomeMaiusculo = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
                    let tipos = poke.types[0].type.name.charAt(0).toUpperCase() + poke.types[0].type.name.slice(1);

                    let cor = cores[poke.types[0].type.name];
                    divPokemon.style.backgroundColor = cor;

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
                    <button id="botaoAdicionar" onClick="adiciona(${poke.id})">Adicionar</button>
                    <button id="botaoExcluir" onClick="detalhar(${poke.id})"><a href="detalhes.html">Detalhes</a</button>
                </div>
                `;

                    div.appendChild(divPokemon);

                    for (let i = 0; i < arrayPokemons.length; i++) {
                        let divpoke = document.getElementById(`pokemon${arrayPokemons[i]}`)
                        divpoke.style.display = 'none'
                    }
                })
                .catch(err => console.log("erro: " + err));
        });
    })
    .catch(err => console.log("erro: " + err));

function adiciona(id) {
    const div = document.getElementById(`pokemon${id}`)
    div.remove()
    arrayPokemons.push(id)
    sessionStorage.setItem('arrayPokemons', JSON.stringify(arrayPokemons))
}

function detalhar(id) {
    let pokeDetalhes = id
    sessionStorage.setItem('pokeDetalhes', JSON.stringify(pokeDetalhes))
}