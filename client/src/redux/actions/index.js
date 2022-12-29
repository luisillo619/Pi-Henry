import {
  GET_POKEMONS,
  GET_ONE_POKEMON,
  GET_TYPES,
  SERVER_ERROR,
  ADD_FILTER,
  TOTAL_PAGES,
  CURRENT_PAGE,
  RELOAD_POKEMONS,
  RESET_PAGE,
  GET_ONE_POKEMON_NAME,
  DELETE_POKEMON,
  
} from "../types/index";

export const getPokemons = () => (dispatch) => {
  return fetch("http://localhost:3001/pokemons")
    .then((res) => res.json())
    .then((pokemons) =>
      dispatch({
        type: GET_POKEMONS,
        payload: pokemons,
      })
    )
    .catch((err) => {
      console.log(err);
      dispatch({
        type: SERVER_ERROR,
        payload: err,
      });
    });
};

export const getOnePokemonID = (id) => (dispatch) => {
  return fetch(`http://localhost:3001/pokemons/${id}`)
    .then((res) => res.json())
    .then((pokemon) =>
      dispatch({
        type: GET_ONE_POKEMON,
        payload: pokemon,
      })
    )
    .catch((err) => {
      console.log(err);
      dispatch({
        type: SERVER_ERROR,
        payload: err,
      });
    });
};

export const getOnePokemonName = (name) => (dispatch) => {
  return fetch(`http://localhost:3001/pokemons?name=${name}`)
    .then((res) => res.json())
    .then((pokemon) =>
      dispatch({
        type: GET_ONE_POKEMON_NAME,
        payload: pokemon,
      })
    )
    .catch((err) => {
      console.log(err);
      dispatch({
        type: SERVER_ERROR,
        payload: err,
      });
    });
};

export const getTypes = () => (dispatch) => {
  return fetch("http://localhost:3001/types")
    .then((res) => res.json())
    .then((types) =>
      dispatch({
        type: GET_TYPES,
        payload: types,
      })
    )
    .catch((err) => {
      console.log(err);
      dispatch({
        type: SERVER_ERROR,
        payload: err,
      });
    });
};

export const addFilter = (filter) => {
  return {
    type: ADD_FILTER,
    payload: filter,
  };
};

export const totalPages = (totalPages) => {
  return {
    type: TOTAL_PAGES,
    payload: totalPages,
  };
};

export const currentPage = (currentPage) => {
  return {
    type: CURRENT_PAGE,
    payload: currentPage,
  };
};

export const resetPage = () => {
  return {
    type: RESET_PAGE,
  };
};

export const postPokemon = (form, initialForm, setForm) => (dispatch) => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(form),
  };

  return fetch("http://localhost:3001/create", options)
    .then(() =>
      dispatch({
        type: RELOAD_POKEMONS,
        payload: form,
      })
    )
    .then(() => {
      setForm(initialForm);
    })
    .then(() => alert("Pokemon creado")) // 400 no creado, mañana
    .catch((err) => {
      alert("Pokemon no Creado");
      dispatch({
        type: SERVER_ERROR,
        payload: err,
      });
    });
};

export const deletePokemon = (id) => (dispatch) => {
  const options = {
    method: "DELETE",
  };

  return fetch(`http://localhost:3001/delete/${id}`, options)
    .then(() =>
      dispatch({
        type: DELETE_POKEMON,
        payload: id,
      })
    )
    .then(() => alert("Pokemon eliminado"))
    .catch((err) => {
      alert("Pokemon no eliminado");
      dispatch({
        type: SERVER_ERROR,
        payload: err,
      });
    });
};


const callServer =
  (url, successType, options = null) =>
  (dispatch) => {
    return fetch(url, options)
      .then((res) => res.json())
      .then((response) =>
        dispatch({
          type: successType,
          payload: response,
        })
      )
      .catch((err) => {
        console.log(err);
        dispatch({
          type: SERVER_ERROR,
          payload: err,
        });
      });
  };

// export const getPokemons = () => (dispatch) => {
//   return callServer("http://localhost:3001/pokemons", GET_POKEMONS)(dispatch);
// };

// export const getOnePokemonID = (id) => (dispatch) => {
//   return callServer(
//     `http://localhost:3001/pokemons/${id}`,
//     GET_ONE_POKEMON_ID
//   )(dispatch);
// };

// export const getOnePokemonName = (name) => (dispatch) => {
//   return callServer(
//     `http://localhost:3001/pokemons?name=${name}`,
//     GET_ONE_POKEMON_NAME
//   )(dispatch);
// };

// export const getTypes = () => (dispatch) => {
//   return callServer("http://localhost:3001/types", GET_TYPES)(dispatch);
// };

// export const postPokemon = (form, initialForm, setForm) => (dispatch) => {
//   const options = {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(form),
//   };

//   return fetch("http://localhost:3001/create", options)
//     .then(() =>
//       dispatch({
//         type: RELOAD_POKEMONS,
//         payload: form,
//       })
//     )
//     .then(() => {
//       setForm(initialForm);
//     })
//     .then(() => alert("Pokemon creado")) // 400 no creado, mañana
//     .catch((err) => {
//       alert("Pokemon no Creado");
//       dispatch({
//         type: SERVER_ERROR,
//         payload: err,
//       });
//     });
// };

// export const deletePokemon = (id) => (dispatch) => {
//   const options = {
//     method: "DELETE",
//   };

//   return fetch(`http://localhost:3001/delete/${id}`, options)
//     .then(() =>
//       dispatch({
//         type: DELETE_POKEMON,
//         payload: id,
//       })
//     )
//     .then(() => alert("Pokemon eliminado"))
//     .catch((err) => {
//       alert("Pokemon no eliminado");
//       dispatch({
//         type: SERVER_ERROR,
//         payload: err,
//       });
//     });
// };