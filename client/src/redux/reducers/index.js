let initialState = {
  pokemons: [],
  onePokemon: [],
  types: [],

  filters: {
    pokemonsFrom: "",
    pokemonsSorted: "",
    pokemonsTypes: "",
    pokemonNames: "",
  },

  totalPages: 0,
  currentPage: 1,
  reloadPokemons: null,
  pokemonIdList: null,
  reset: null,
 
};

export default function getReducers(state = initialState, { type, payload }) {
  switch (type) {
    case "GET_POKEMONS":
      return {
        ...state,
        pokemons: payload,
      };
    case "GET_ONE_POKEMON":
      return {
        ...state,
        onePokemon: payload,
      };
    case "GET_ONE_POKEMON_NAME":
      return {
        ...state,
        pokemons: [...state.pokemons, payload],
      };
    case "GET_TYPES":
      return {
        ...state,
        types: payload,
      };
    case "ADD_FILTER":
      return {
        ...state,
        filters: payload,
      };

    case "TOTAL_PAGES":
      return {
        ...state,
        totalPages: payload,
      };
    case "CURRENT_PAGE":
      return {
        ...state,
        currentPage: payload,
      };
    case "RESET_PAGE":
      return {
        ...state,
        currentPage: 1,
      };

    case "RELOAD_POKEMONS":
      return {
        ...state,
        reloadPokemons: payload.name,
      };

    case "DELETE_POKEMON":
      return {
        ...state,
        pokemons: [...state.pokemons].filter((e) => e.id !== payload),
      };

    default:
      return { ...state };
  }
}
