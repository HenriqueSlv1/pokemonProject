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

const pokemonArmazenado = sessionStorage.getItem('pokeDetalhes')

let pokemonId = JSON.parse(pokemonArmazenado);

fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
    .then(response => response.json())
    .then(function (poke) {
        let divPokemon = document.createElement('div');
        divPokemon.classList = 'bordas';

        let nomeMaiusculo = poke.name.charAt(0).toUpperCase() + poke.name.slice(1);
        document.title = `${nomeMaiusculo}`
        let cor = cores[poke.types[0].type.name];

        document.getElementById('titulo').innerText = `${nomeMaiusculo}`;

        let weight = poke.weight / 10;
        let height = poke.height / 10;

        let hp = poke.stats.find(stat => stat.stat.name === 'hp').base_stat;

        let attack = poke.stats.find(stat => stat.stat.name === 'attack').base_stat;

        let defense = poke.stats.find(stat => stat.stat.name === 'defense').base_stat;

        let special_attack = poke.stats.find(stat => stat.stat.name === 'special-attack').base_stat;

        let special_defense = poke.stats.find(stat => stat.stat.name === 'special-defense').base_stat;

        let speed = poke.stats.find(stat => stat.stat.name === 'speed').base_stat;

        let movimentos = poke.moves.slice(0, 6).map(move => move.move.name.charAt(0).toUpperCase() + move.move.name.slice(1));

        divPokemon.style.backgroundColor = cor;

        let tipos = poke.types.map((type) => `<p>${type.type.name}</p>`);
        tipos = tipos.join('');

        divPokemon.id = `pokemon${poke.id}`
        divPokemon.innerHTML =
            `
                    <div id="imagens">
                        <img src="${poke.sprites.front_default}">
                        <img src="${poke.sprites.back_default}">
                    </div>
                    <div class="pokemonDe">
                        <h1>Detalhes: </h1>
                        <p id="nome">Nome: ${nomeMaiusculo}</p>
                        <p>Peso: ${height}kg | Altura: ${weight}m</p>
                        <h1>Status:</h1>
                        <p id="hp">HP: ${hp}</p>
                        <p id="attack">Ataque: ${attack}</p>
                        <p id="defense">Defesa: ${defense}</p>
                        <p id="special-attack">Ataque Especial: ${special_attack}</p>
                        <p id="special-defense">Defesa Especial: ${special_defense}</p>
                        <p id="speed">Velocidade: ${speed}</p>
                    </div>
                    <div id="moves"> 
                        <h1>Tipos:</h1>${tipos.toUpperCase()}
                        <h1>Movimentos:</h1>
                        <p id="movimentos">${movimentos[0]}</p>
                        <p id="movimentos">${movimentos[1]}</p>
                        <p id="movimentos">${movimentos[2]}</p>
                        <p id="movimentos">${movimentos[3]}</p>
                        <p id="movimentos">${movimentos[4]}</p>
                    </div>                    
                    `
        document.getElementById("pokemonD").appendChild(divPokemon);
    })
    .catch(err => console.log("Erro: " + err));