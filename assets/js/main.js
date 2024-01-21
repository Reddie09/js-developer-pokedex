const pokemonList = document.getElementById('pokemonList')
const paginationButton = document.getElementById('paginationButton')
const limit = 10;
let offset = 0;
let oldspinChildid = 0;
const maxRecords = 151;
const spinner = document.getElementById('spinner')

function convertPokemonTypesToLi(pokemonTypes) {
    return pokemonTypes.map((typeSlot) => `<li class ="type">${type}</li>`)
}

function convertPokemonToLi(pokemon) {

    return `
        <li class="pokemon ${pokemon.mainType}" pokemonNum="${pokemon.no}" value="${pokemon.no}">
            <span class="number">#${pokemon.no}</span>
            <span class="name">${pokemon.name}</span>
            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) =>`<li class ="type ${type}">${type}</li>`).join('')}
                </ol>
                <img src="${pokemon.photo}" alt="${pokemon.name}">
            </div>
        </li>
    `
}

function addPokemonSpinner(pokemon){
    return `
    <div id="${pokemon.no}" class="spinnerChild ${pokemon.mainType} ">
        <span class="name">#${pokemon.no} - ${pokemon.name}</span>
        <div class="detail">
            <ol class="types">
                ${pokemon.types.map((type) =>`<li class ="type ${type}">${type}</li>`).join('')}
            </ol>
        </div>
        <div class="imgdiv">
            <img src="${pokemon.photo}" alt="${pokemon.name}">
            <img src="${pokemon.shiny}" alt="${pokemon.name}">    
        </div>
        <div class="attributes">
            <ol class="abilities">
                ${pokemon.abilities.map((ability) =>`<li class ="ability ${pokemon.mainType}">${ability}</li>`).join('')}
            </ol>
            <span class="atr">HP: ${pokemon.hp} </span>
            <span class="atr">ATK: ${pokemon.atk} </span>
            <span class="atr">DEF: ${pokemon.def} </span>
            <span class="atr">SpA: ${pokemon.spA} </span>
            <span class="atr">SpD: ${pokemon.spD} </span>
            <span class="atr">Speed: ${pokemon.ms} </span>
        </div>
        <button id="close${pokemon.no}" class="closebtn ${pokemon.mainType}" pokemonNum="${pokemon.no}">Fechar</btn>
    </div>
    `
}

function loadPokemonItens(offset, limit){
pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
    pokemonList.innerHTML += pokemons.map(convertPokemonToLi).join('')
    spinner.innerHTML += pokemons.map(addPokemonSpinner).join('')
    queryPokemonall()
    queryPokemonAllb()
})}

function queryPokemonall(){
    var q = document.querySelectorAll("li[pokemonNum]");

    q.forEach(node => {
        node.addEventListener("click", qClick);
    })
}

function queryPokemonAllb(){
    var x = document.querySelectorAll("button[pokemonNum]");

    x.forEach(node => {
        node.addEventListener("click", cClick);
    })
}

function qClick(event) {
    let v = 0;
    v = String(event.target.value).padStart(3,0)
    if(event.target.value != undefined && v!=null){
        if(oldspinChildid != 0){
            document.getElementById(oldspinChildid).style.display='none';
        }
        document.getElementById(v).style.visibility='visible';
        document.getElementById(v).style.display='flex';
        oldspinChildid = v
    }
}

function cClick(){
    document.getElementById(oldspinChildid).style.visibility='hidden';
    document.getElementById(oldspinChildid).style.display='none';
    oldspinChildid = 0;
    v = 0;
}
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