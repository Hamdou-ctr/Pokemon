





//   Hier ist der Richtige code es funktioniert bis hier richtigt.


let baseUrl = "https://pokeapi.co/api/v2/pokemon/";
let currentPokemon;
let allPokemon = [];
let numberOfPokemon = 3;

let typePokemonBackgroundColor = {
  grass: "rgb(0, 102, 0)",
  fire: "rgb(241,79,14)",
  water: "rgb(49,124,218)",
  normal: "rgb(100, 99, 99)",
  electric: "rgb(228, 210, 6)",
  ice: "rgb(116,207,192)",
  fighting: "rgb(186,85,68)",
  poison: "rgb(149,83,204)",
  ground: "rgb(166,116,57)",
  bug: "rgb(115,29,12)",
  flying: "rgb(150,202,254)",
  rock: "rgb(187,170,102)",
  psychic: "rgb(255,98,128)",
  ghost: "rgb(110,67,111)",
  dragon: "rgb(85,112,189)",
  steel: "rgb(170,170,187)",
  fairy: "rgb(236,142,230)",
  dark: "rgb(78,68,69)",
};

async function init() {
  await loadAllPokemon();
  renderChart();
}

async function loadAllPokemon() {
  for (let i = 1; i <= numberOfPokemon; i++) {
    let currentPokemon = await loadPokemon(i);
    renderPokemon(currentPokemon);

    allPokemon.push(currentPokemon);
  }
}

async function loadNextPokemon() {
  numberOfPokemon += 20;
  document.getElementById("pokedex").innerHTML = "";
  await loadAllPokemon();
}

async function searchPokemonName() {
  let search = document.getElementById("search").value.toLowerCase();
  console.log(search);
  let pokemonName = document.getElementById("pokedex");
  pokemonName.innerHTML = "";
  for (let i = 1; i <= numberOfPokemon; i++) {
    let currentPokemon = await loadPokemon(i);
    if (currentPokemon.name.toLowerCase().includes(search)) {
      renderPokemon(currentPokemon);
    }
  }
}

async function loadPokemon(i) {
  let url = baseUrl + i;
  let response = await fetch(url);
  return await response.json();
}

function renderPokemon(currentPokemon) {
  const pokemonElement = document.getElementById("pokedex");
  pokemonElement.innerHTML += pokemonHtml(currentPokemon);
}

function pokemonHtml(currentPokemon) {
  let backgroundColorPokemonType = generateBackgroundColor(currentPokemon);
  return /* html*/  `
  <div onclick="pokemonInfo(${currentPokemon.id})">
    <div class="all-pokemon" style="background-color: ${backgroundColorPokemonType};">
      <div class="name-and-id-div">
        <h1>${currentPokemon.name}</h1>
        <h1>№ ${currentPokemon.id}</h1>
      </div>
      <div class="pokemon-type-and-image-div">
        <div class="pokemon-type-div">
          <p>Type:</p>
          <p class="pokemon-type">${currentPokemon.types[0].type.name}</p>
          <p class="pokemon-type">${
            currentPokemon.types.length > 1
              ? currentPokemon.types[1].type.name
              : ""
          }</p>
        </div>
        <img src="${
          currentPokemon.sprites.other.dream_world.front_default
        }" alt="">
      </div>
    </div>
  </div>
  `;
}

// <img src="${currentPokemon.sprites.other.showdown.front_default}" alt="">    Animierte Bilder
// <img src="${pokemonData.sprites.other.home.front_shiny}" alt="">

function generateBackgroundColor(currentPokemon) {
  let type = currentPokemon.types[0].type.name;
  return typePokemonBackgroundColor[type] || "blue";
}

function pokemonInfo(id) {
  let currentPokemon = allPokemon.find((pokemon) => pokemon.id === id);
  let onePokemon = document.getElementById("info-pokemon-Container");
  onePokemon.innerHTML = pokemonInfoHtml(currentPokemon);
}

function pokemonInfoHtml(currentPokemon) {
  let backgroundColorPokemonType = generateBackgroundColor(currentPokemon);
  return /* html*/  `
  <div onclick="pokemonInfo(${currentPokemon.id})">
    <div class="all-pokemon" style="background-color: ${backgroundColorPokemonType};">
      <div class="name-and-id-div">
        <h1>${currentPokemon.name}</h1>
        <h1>№ ${currentPokemon.id}</h1>
      </div>
      <div class="pokemon-type-and-image-div">
        <div class="pokemon-type-div">
          <p>Type:</p>
          <p class="pokemon-type">${currentPokemon.types[0].type.name}</p>
          <p class="pokemon-type">${
            currentPokemon.types.length > 1
              ? currentPokemon.types[1].type.name
              : ""
          }</p>
        </div>
        <img src="${
          currentPokemon.sprites.other.dream_world.front_default
        }" alt="">
      </div>
    </div>
    <div>
          <canvas id="myChart"></canvas>
      </div> 
  </div>
  `;
}
