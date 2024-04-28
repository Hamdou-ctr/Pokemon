let baseUrl = "https://pokeapi.co/api/v2/pokemon/";
let currentPokemon;
let allPokemon = [];
let numberOfPokemon = 20;

let typePokemonBackgroundColor = {
  grass: "rgb(0, 102, 0)",
  fire: "rgb(241,79,14)",
  water: "rgb(49,124,218)",
  normal: "rgb(100, 99, 99)",
  electric: "rgb(198, 182, 7)",
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

let typePokemonBackgroundColorDiv = {
  grass: "rgb(14, 43, 14)",
  fire: "rgb(149, 46, 11)",
  water: "rgb(7, 70, 147)",
  normal: "rgb(58, 54, 54)",
  electric: "rgb(228, 210, 6)",
  ice: "rgb(28, 161, 139)",
  fighting: "rgb(181, 35, 9)",
  poison: "rgb(138, 56, 205)",
  ground: "rgb(149, 92, 27)",
  bug: "rgb(133, 53, 37)",
  flying: "rgb(133, 190, 246)",
  rock: "rgb(181, 160, 76)",
  psychic: "rgb(234, 88, 115)",
  ghost: "rgb(133, 56, 134)",
  dragon: "rgb(70, 100, 185)",
  steel: "rgb(152, 152, 180)",
  fairy: "rgb(222, 121, 216)",
  dark: "rgb(77, 51, 53)",
};

async function init() {
  removeclassList();
  await loadAllPokemon();
}

async function loadAllPokemon() {
  let url = `https://pokeapi.co/api/v2/pokemon?limit=154&offset=0`;
  let response = await fetch(url);
  let data = await response.json();
  allPokemon = data.results;
  let allPromises = [];
  for (let i = 0; i < allPokemon.length; i++) {
    let pokemonUrl = allPokemon[i].url;
    allPromises.push(fetch(pokemonUrl));
  }
  let allPokemonResponses = await Promise.all(allPromises);
  allPokemon = await Promise.all(
    allPokemonResponses.map((response) => response.json())
  );
  renderAllPokemon();
}

async function renderAllPokemon() {
  for (let i = 1; i <= numberOfPokemon; i++) {
    let currentPokemon = await loadPokemon(i);
    renderPokemon(currentPokemon);
    allPokemon.push(currentPokemon);
  }
  removeclassList();
  console.log("Loaded all Pokémon", allPokemon);
}

async function loadNextPokemon() {
  numberOfPokemon += 50;
  let newNumberOfPokemon = (document.getElementById("pokedex").innerHTML = "");
  newNumberOfPokemon.innerHTML = await loadAllPokemon();
}

async function loadPokemon(i) {
  let url = baseUrl + i;
  let response = await fetch(url);
  return await response.json();
}

function renderPokemon(currentPokemon) {
  let pokemonElement = document.getElementById("pokedex");
  pokemonElement.innerHTML += pokemonHtml(currentPokemon);
}

function pokemonHtml(currentPokemon) {
  let pokemonBackgroundColor = generateBackgroundColor(currentPokemon);
  let typePokemonBackgroundColorDiv =
    generateBackgroundColorTypeDiv(currentPokemon);
  return /* html */ `
    <div class="all-pokemon-div" onclick="pokemonInfo(${currentPokemon.id})">
      <div class="all-pokemon" style="background-color: ${pokemonBackgroundColor};">
        <div class="name-and-id-div">
          <h1 class="h1">${
            currentPokemon.name.charAt(0).toUpperCase() +
            currentPokemon.name.slice(1)
          }</h1>
          <h1>№ ${currentPokemon.id}</h1>
        </div>
        <div class="pokemon-type-and-image-div">
          <div class="pokemon-type-div">
            <p>Type:</p>
            <p class="pokemon-type" style="background-color: ${typePokemonBackgroundColorDiv};">${
    currentPokemon.types[0].type.name
  }
            </p>
            <p class="pokemon-type" style="background-color: ${typePokemonBackgroundColorDiv};">${
    currentPokemon.types.length > 1 ? currentPokemon.types[1].type.name : ""
  }
            </p>
          </div>
          <img src="${
            currentPokemon.sprites.other.showdown.front_default
          }" alt=""> 
        </div>
      </div>
    </div>
  `;
}

/* function generateBackgroundColor(currentPokemon) {
  let type = currentPokemon.types[0].type.name;
  return typePokemonBackgroundColor[type] || "blue";
} */

function generateBackgroundColor(currentPokemon) {
  if (
    currentPokemon &&
    currentPokemon.types &&
    currentPokemon.types.length > 0
  ) {
    let type = currentPokemon.types[0].type.name;
    return typePokemonBackgroundColor[type] || "blue";
  } else {
    return "blue";
  }
}

function generateBackgroundColorTypeDiv(currentPokemon) {
  if (
    currentPokemon &&
    currentPokemon.types &&
    currentPokemon.types.length > 0
  ) {
    let type = currentPokemon.types[0].type.name;
    return typePokemonBackgroundColorDiv[type] || "blue";
  } else {
    return "blue";
  }
}

async function startSearch() {
  let search = document.getElementById("search").value.trim().toLowerCase();
  if (search.length >= 0) {
    searchPokemonName(search);
  } else if (search.length === 0) {
    init();
  }
}

async function searchPokemonName(search) {
  let pokemonName = document.getElementById("pokedex");
  pokemonName.innerHTML = "";
  let count = 0;
  for (let i = 1; i <= numberOfPokemon; i++) {
    // Anpassung der Schleifenbedingung
    let currentPokemon = await loadPokemon(i);
    if (currentPokemon.name.toLowerCase().includes(search)) {
      renderPokemon(currentPokemon);
      count++;
      console.log("Aktuelles Pokémon ist.", currentPokemon);
      if (count >= numberOfPokemon) {
        // Anpassung der Bedingung für das Beenden der Schleife
        break;
      }
    }
  }
}

/*
function startSearch(){
  let search = document.getElementById("search").value.trim().toLowerCase();
  if (search.length < 2) {
    searchPokemonName();
  } else if (search.length === 0) {
    init();
  }
}

async function searchPokemonName() {
  let pokemonName = document.getElementById("pokedex");
  pokemonName.innerHTML = "";
  let count = 0;
  for (let i = 2; i <= numberOfPokemon; i++) {
    let currentPokemon = await loadPokemon(i);
    if (currentPokemon.name.toLowerCase().includes(search)) {
      renderPokemon(currentPokemon);
      count++;
      console.log("Aktuelles Pokémon ist.", currentPokemon);
      if (count >= i++) {
        break;
      }
    }
  }
}

/* function nextPokemon(id){
  let currentPokemon = allPokemon.find((pokemon) => pokemon.id === id);
  let numberOfPokemon = currentPokemon.length;
  if ((currentPokemon.length = numberOfPokemon)) {
    currentPokemon = 1;
  }else if(currentPokemon.length = 0){
    currentPokemon = numberOfPokemon;
  }
} */

function nextPokemon(id) {
  let currentPokemonIndex = allPokemon.findIndex(
    (pokemon) => pokemon.id === id
  );
  let numberOfPokemon = allPokemon.length;
  let nextPokemonIndex = (currentPokemonIndex + 1) % numberOfPokemon;

  if (nextPokemonIndex === 0) {
    alert("Das ist der erste Pokemon");
    init();
    return;
    //return allPokemon[numberOfPokemon]; // Gehe zum letzten Pokémon, wenn das aktuelle das erste ist
  } else if (nextPokemonIndex === currentPokemonIndex) {
    return allPokemon[0]; // Gehe zum ersten Pokémon, wenn das aktuelle das letzte ist
  } else {
    return allPokemon[nextPokemonIndex]; // Ansonsten gehe zum nächsten Pokémon in der Liste
  }
}

function pokemonInfo(id) {
  let currentPokemon = allPokemon.find((pokemon) => pokemon.id === id);
  let onePokemon = document.getElementById("info-pokemon-Container");
  onePokemon.innerHTML = pokemonInfoHtml(currentPokemon);
  let nextPoke = nextPokemon(id);
  addclassList();

  about(currentPokemon.id);
  renderChart(currentPokemon);
  movesChart(currentPokemon);
}

function pokemonInfoHtml(currentPokemon) {
  if (currentPokemon && currentPokemon.name) {
    let backgroundColorPokemonType = generateBackgroundColor(currentPokemon);
    let typePokemonBackgroundColorDiv =
      generateBackgroundColorTypeDiv(currentPokemon);
    return /* html */ `
    <div class="CenteredColumnContainer">
      <div class="PokemonOverlay">
        <div class="PokemonInfoDiv">
          <div class="border"> 
            <div class="AllPokemonInfoAllPokemonInfo" style="background-color: ${backgroundColorPokemonType};">
              <div class="NameAndIdDivInfo">
                <div class="NameIdDivInfo">
                  <h1 class="h1">${currentPokemon.name.toUpperCase()}</h1>
                  <h1>№ ${currentPokemon.id}</h1>
                </div>
                <div class="PokemonTypeDivInfo">
                  <p>Type:</p>
                  <p style="background-color: ${typePokemonBackgroundColorDiv};">${
      currentPokemon.types[0].type.name
    }
                  </p>
                  <p style="background-color: ${typePokemonBackgroundColorDiv};">${
      currentPokemon.types.length > 1 ? currentPokemon.types[1].type.name : ""
    }
                  </p>
                </div>
              </div>
              <img class="OnPokemonImage" src="${
                currentPokemon.sprites.other.dream_world.front_default
              }" alt="">
            </div>
            <div class="ChartJsDiv">
              <div class="navigationLinks">
                <div class="directionPointer-div">
                  <img class="directionPointer left" onclick="pokemonInfo(${
                    currentPokemon.id - 1
                  })" src="image./left.webp" alt="">
                  <img class="directionPointer right" onclick="pokemonInfo(${
                    currentPokemon.id + 1
                  })" src="image./right.webp" alt="">
                </div>
                <div class="quickLink-div">
                  <a class="quickLink" onclick="about(${
                    currentPokemon.id
                  })" href="#"> About
                  </a>
                  <a class="quickLink" onclick="baseStats()" href="#">Base Stats</a>
                   <!-- <a class="quickLink" onclick="evaluation()" href="#">Evaluation</a>  -->
                  <a class="quickLink" onclick="moves()" href="#">Moves</a>
                </div>
              </div>

              <div class="About hidden" id="About">
              </div>

              <div class="Base-Stats hidden" id="Base-Stats">
                 <canvas id="myChart"></canvas> 
              </div>

              <div class="Evaluation hidden" id="Evaluation">
                <canvas id="myChartEvaluation"></canvas> 
              </div>

              <div class="Moves hidden" id="Moves">
                <canvas id="myChartMoves"></canvas>
              </div>
              <img class="directionPointer back" onclick="closePokemon()" src="image./road-sign.webp" alt="">
            </div>  
          </div>
        </div>
      </div>
    </div>
  `;
  }
}

function detailedInfoHtml(foundPokemon) {
  let typePokemonBackgroundColorDivInfo = generateBackgroundColorTypeDiv(foundPokemon);
  return /* html*/ `
    <div class="About" >
      <p style="background-color: ${typePokemonBackgroundColorDivInfo};"> <b>Species</b> ${
        foundPokemon.species
        }
       </p>
      <p style="background-color: ${typePokemonBackgroundColorDivInfo};"> <b>height</b> ${
       foundPokemon.height
  } Cm</p>
      <p style="background-color: ${typePokemonBackgroundColorDivInfo};"> <b>weight</b> ${
    foundPokemon.weight
  } Gr</p>
      <p style="background-color: ${typePokemonBackgroundColorDivInfo};"> <b>Abilities</b> ${
    foundPokemon.abilities[0].ability.name
  }, ${
    foundPokemon.abilities.length > 1
      ? foundPokemon.abilities[1].ability.name
      : ""
  }</p>
      <p style="background-color: ${typePokemonBackgroundColorDivInfo};"> <b>Gender</b> ${
    foundPokemon.species
  } Gr</p>
      <p style="background-color: ${typePokemonBackgroundColorDivInfo};"> <b>Egg Groups</b> ${
    foundPokemon.base_experience
  } Gr</p>
      <p style="background-color: ${typePokemonBackgroundColorDivInfo};"> <b>Egg Cycle</b> ${
    foundPokemon.base_experience
  } Gr</p>
    </div>
  `;
}

function about(id) {
  let foundPokemon = allPokemon.find((pokemon) => pokemon.id === id);
  document
    .getElementById("Base-Stats")
    .classList.replace("Base-Stats", "hidden");
  document
    .getElementById("Evaluation")
    .classList.replace("Evaluation", "hidden");
  document.getElementById("Moves").classList.replace("Moves", "hidden");
  document.getElementById("About").classList.replace("hidden", "About");
  let aboutDeteil = document.getElementById("About");
  aboutDeteil.innerHTML = detailedInfoHtml(foundPokemon);
  //console.log(detailedInfoHtml(foundPokemon));
}

function baseStats() {
  document.getElementById("About").classList.replace("About", "hidden");
  document
    .getElementById("Base-Stats")
    .classList.replace("hidden", "Base-Stats");
  document
    .getElementById("Evaluation")
    .classList.replace("Evaluation", "hidden");
  document.getElementById("Moves").classList.replace("Moves", "hidden");
}

function evaluation(id) {
  let foundPokemon = allPokemon.find((pokemon) => pokemon.id === id);
  document.getElementById("About").classList.replace("About", "hidden");
  document
    .getElementById("Base-Stats")
    .classList.replace("Base-Stats", "hidden");
  document
    .getElementById("Evaluation")
    .classList.replace("hidden", "Evaluation");
  document.getElementById("Moves").classList.replace("Moves", "hidden");
  let Evolutionstheorie = document.getElementById("Evaluation");
  Evolutionstheorie.innerHTML = displayEvolutionTheory(foundPokemon);
  console.log(displayEvolutionTheory(foundPokemon));
}

function moves() {
  document.getElementById("About").classList.replace("About", "hidden");
  document
    .getElementById("Base-Stats")
    .classList.replace("Base-Stats", "hidden");
  document
    .getElementById("Evaluation")
    .classList.replace("Evaluation", "hidden");
  document.getElementById("Moves").classList.replace("hidden", "Moves");
}

function closePokemon() {
  document.getElementById("info-pokemon-Container").innerHTML = "";
  removeclassList();
}

function addclassList() {
  document
    .getElementById("pokedex")
    .classList.replace("pokedex", "pokedex-opacity");
  document.getElementById("button-loadPokemon").style = "display: none;";
  document.getElementById("info-pokemon-Container").style = "display: flex;";
}

function removeclassList() {
  document
    .getElementById("pokedex")
    .classList.replace("pokedex-opacity", "pokedex");
  document.getElementById("button-loadPokemon").style = "display: flex;";
  document.getElementById("info-pokemon-Container").style = "display: none;";
}
