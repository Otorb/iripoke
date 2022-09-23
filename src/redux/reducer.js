import {
  GET_POKEMON,
  GET_TYPES,
  ORDER_NAME,
  GET_NAME_POKEMON,
  GET_DETAIL,
  POST_POKEMON,
  FILTER_BY_TYPE,
  
} from "./action";

const initialState = {
  pokemons: [],
  allPokemon: [],
  types: [],
  detail: {},
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_POKEMON:
      return {
        ...state,
        pokemons: action.payload,
      };
    case GET_DETAIL:
      return {
        ...state,
        detail: action.payload,
      };
    case GET_NAME_POKEMON:
      return {
        ...state,
        pokemons: action.payload,
      };
    case GET_TYPES:
      return {
        ...state,
        types: action.payload,
      };
    case ORDER_NAME:
      let sorteArr =
        action.payload === "asc"
          ? state.pokemons.sort(function (a, b) {
              if (a.name > b.name) {
                return 1;
              }
              if (b.name > a.name) {
                return -1;
              }
              return 0;
            })
          : state.pokemons.sort(function (a, b) {
              if (a.name > b.name) {
                return -1;
              }
              if (b.name > a.name) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        pokemons: sorteArr,
      };
      case FILTER_BY_TYPE:
        let pokeArr = state.allPokemon;
        let pokeFin = [];
  
        if (action.payload === "All") {
          return {
            ...state,
            pokemons: pokeArr,
          };
        } else {
          pokeArr.forEach((e) => {
            if (e.types.includes(action.payload)) {
              pokeFin.push(e);
            }
          });
          return {
            ...state,
            pokemons: pokeFin,
          };
        }
    case POST_POKEMON:
      return {
        ...state,
      };

    default:
      return state;
  }
}
export default reducer;
