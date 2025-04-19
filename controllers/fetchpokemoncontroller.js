async function fetchAllPokemon() {
  try {
    const url = `https://pokeapi.co/api/v2/pokemon?limit=50&offset=0`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`response not okay ${response.status}`);
    }
    const data = await response.json();

    return data;
  } catch (err) {
    console.error(`error: `, err);
  }
}

async function fetchPokemonData(pokemonUrl) {
  const url = pokemonUrl;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to fetch pokemon data: ${response.status}`);
  }

  const pokemonData = await response.json();

  return pokemonData;
}


module.exports = {
  fetchAllPokemon,
  fetchPokemonData,
};
