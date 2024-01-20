const pokemonList = document.getElementById('pokemonList')
const paginationButton = document.getElementById('paginationButton')
const limit = 10;
let offset = 0;
const maxRecords = 151;

function convertPokemonTypesToLi(pokemonTypes) {
    return pokemonTypes.map((typeSlot) => `<li class ="type">${type}</li>`)
}

function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.mainType}">
            <span class="number">${pokemon.no}</span>
            <span class="name">${pokemon.name}</span>
            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) =>`<li class ="type ${type}">${type}</li>`).join('')}
                </ol>
                <img src="${pokemon.photo}" 
                alt="${pokemon.name}">
            </div>
        </li>
    `
}

function loadPokemonItens(offset, limit){
pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
    pokemonList.innerHTML += pokemons.map(convertPokemonToLi).join('')
})}

loadPokemonItens(offset, limit)

paginationButton.addEventListener('click', () =>{
    offset += limit
    const recordNextPage = offset + limit

    if (recordNextPage >= maxRecords){
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)
        paginationButton.parentElement.removeChild(paginationButton)
    } else {
    loadPokemonItens(offset, limit)
    }
})