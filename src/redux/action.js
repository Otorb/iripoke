import axios from "axios";
export const GET_POKEMON = "GET_POKEMON";
export const GET_TYPES = "GET_TYPES";
export const ORDER_NAME = "ORDER_NAME";
export const GET_NAME_POKEMON = "GET_NAME_POKEMON";
export const POST_POKEMON = "POST_POKEMON";
export const GET_DETAIL = "GET_DETAIL";
export const FILTER_ATTACK = "FILTER_ATTACK";
export const FILTER_BY_TYPE = "FILTER_BY_TYPE";

export function getPokemon() {
  return async function (dispatch) {
    var json = await axios.get("https://pokeapi.co/api/v2/pokemon");
    let poke2 = await axios.get(json.data.next);

    let pokesList = [...json.data.results, ...poke2.data.results];
    pokesList = pokesList.map(async (e) => {
      return await axios.get(e.url);
    });

    pokesList = await Promise.all(pokesList);

    const pokemonsResult = pokesList.map((e) => e.data);
    const pokemonsFinal = [];

    pokemonsResult.map((e) => {
      pokemonsFinal.push({
        id: e.id,
        name: e.name,
        attack: e.stats[1].base_stat,
        img: e.sprites.other.dream_world.front_default,
        types: e.types.map((p) => p.type.name),
      });
    });
    return dispatch({
      type: "GET_POKEMON",
      payload: pokemonsFinal,
    });
  };
}

export function getDetail(id) {
  return async function (dispatch) {
    try {
      var json = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
     
      const pokeArray = [];
      pokeArray.push(json.data);

      const pokeFinal = [];

      pokeArray.map((e) => {
        pokeFinal.push({
          id: e.id,
          name: e.name,
          life: e.stats[0].base_stat,
          attack: e.stats[1].base_stat,
          defense: e.stats[2].base_stat,
          speed: e.stats[5].base_stat,
          height: e.height,
          weight: e.weight,
          img: e.sprites.other.dream_world.front_default,
          types: e.types.map((typePoke) => typePoke.type.name),
        });
      });
      
  
      return dispatch({
        type: GET_DETAIL,
        payload: pokeFinal[0]
      });
    } catch (err) {
      console.log(err);
    }
  };
}

export function getTypes() {
  return async function (dispatch) {
    const json = await axios.get("https://pokeapi.co/api/v2/type");
    let types = json.data.results;
    console.log(types.map(e => e.name),"tipos");
    return dispatch({
      type: "GET_TYPES",
      payload: types.map(e => e.name)
    });
  };
}

export function getNamePokemon(name) {
  return async function (dispatch) {
    // var { name } = req.query;
console.log("un name", name);
    try {
      var json = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
      const pokeArrayData = [];
      pokeArrayData.push(json.data);

      const pokemonFinal = [];
	    pokeArrayData.map(e => {
	        pokemonFinal.push({
		        id: e.id,
		        name: e.name,
		        life: e.stats[0].base_stat,
		        attack: e.stats[1].base_stat,
		        defense: e.stats[2].base_stat,
		        speed: e.stats[5].base_stat,
		        height: e.height,
		        weight: e.weight,
		        img: e.sprites.other.dream_world.front_default,
		        types: e.types.map(p => p.type.name)
		    })
		})
  
      return dispatch({
        type: GET_NAME_POKEMON,
        payload: pokemonFinal
      });
    } catch (err) {
      console.log(err);
    }
  };
}

let idPoke = 1000;

export function postPokemon(payload) {
  return async function (dispatch) {
    const json = await axios.post("http://localhost:3001/pokemons", payload);
    // return json;
  };
}

export function orderName(payload) {
  return {
    type: "ORDER_NAME",
    payload,
  };
}

export function filterAttack(payload) {
  return {
    type: "FILTER_ATTACK",
    payload,
  };
}

export function filterType(payload) {
  return {
    type: "FILTER_BY_TYPE",
    payload,
  };
}