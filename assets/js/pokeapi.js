

const pokeApi = {}

function convertPokeApiDetalToPokemon(pokeDetail){
    const pokemon = new Pokemon()
    pokemon.name = pokeDetail.name
    pokemon.no = String(pokeDetail.id).padStart(3,0)

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    pokemon.types = types
    pokemon.mainType = type
    pokemon.photo = pokeDetail.sprites.front_default
    pokemon.shiny = pokeDetail.sprites.front_shiny
    const abilities = pokeDetail.abilities.map((abilities) => abilities.ability.name)
    pokemon.abilities = abilities

    pokemon.hp = pokeDetail.stats[0].base_stat
    pokemon.atk = pokeDetail.stats[1].base_stat
    pokemon.def = pokeDetail.stats[2].base_stat
    pokemon.spA = pokeDetail.stats[3].base_stat
    pokemon.spD = pokeDetail.stats[4].base_stat
    pokemon.ms = pokeDetail.stats[5].base_stat
    return pokemon
}

pokeApi.getPokemonsDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertPokeApiDetalToPokemon)
}

pokeApi.getPokemons = (offset = 0, limit = 20) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
    return fetch(url)
    .then((response) => response.json())
    .then((jsonBody) => jsonBody.results)
    .then((pokemons) => pokemons.map(pokeApi.getPokemonsDetail)) 
    .then((detailRequests) => Promise.all(detailRequests))
    .then((pokemonsDetails) => pokemonsDetails)
    .catch((error) => console.error(error))
}