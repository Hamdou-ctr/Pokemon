// Funktion zum Abrufen von Daten von der PokeAPI
async function fetchPokemonData(pokemonName) {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Fehler beim Abrufen von Pokémon-Daten:', error);
    }
  }
  
  // Funktion zum Abrufen von Evolutionstheoriedaten eines Pokémon
  async function fetchEvolutionData(pokemonName) {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemonName}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Fehler beim Abrufen von Evolutionstheoriedaten:', error);
    }
  }
  
  // Funktion zum Anzeigen der Evolutionstheorie eines Pokémon
  async function displayEvolutionTheory(pokemonName) {
    const pokemonData = await fetchPokemonData(pokemonName);
    const evolutionData = await fetchEvolutionData(pokemonName);
    
    console.log('Evolutionstheorie von', pokemonName, ':', evolutionData.evolution_chain);
  }
  
  // Beispielaufruf zum Anzeigen der Evolutionstheorie von Pikachu
  displayEvolutionTheory('bulbasaur');
  