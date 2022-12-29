// const { Pokemon, Type } = require("../db");

// // Recuperar data de la API mediante fetch
// let pokemonsApi = [];

// const fetcher = async (path) => {
//   const URL = "https://pokeapi.co/api/v2/pokemon/";
//   let response = await fetch(URL + path).then((data) => data.json());
//   return response;
// };

// // Solo se va a ejecutar una vez, los ifs estan de más
// const apiData = async () => {
//   try {
//     let allData = [];

//     if (pokemonsApi.length === 0) {
//       for (let i = 1; i <= 100; i++) {
//         // Devuelve un array de objetos
//         console.log(i);
//         let pokemons = await fetcher(i);
//         allData.push(pokemons);
//       }

//       allData.forEach((e) => {
//         pokemonsApi.push({
//           id: e.id,
//           name: e.forms[0].name,
//           life: e.stats[0].base_stat,
//           attack: e.stats[1].base_stat,
//           defense: e.stats[2].base_stat,
//           speed: e.stats[5].base_stat,
//           height: e.height,
//           weight: e.weight,
//           image: e.sprites.other["official-artwork"].front_default,
//           types: e.types.map((e) => e.type.name),
//         });
//       });
//     }
//   } catch (error) {
//     throw new Error(error.message);
//   }
// };

// // Recuperar data de la DB
// const dbData = async () => {
//   try {
//     // Joinea la tabla Type a la tabla Pokemon
//     // Devuelve un array de objetos
//     let data = await Pokemon.findAll({
//       include: {
//         model: Type,
//       },
//     });
//     // toJSON() evita que se muestren datos innecesarios de sequelize
//     let dataJson = data.map((e) => e.toJSON());

//     // return dataJson
//     return (dataJson = await dataJson.map((e) => {
//       return {
//         // Entidad(tabla) Pokemon
//         id: e.id,
//         name: e.name,
//         life: e.life,
//         attack: e.attack,
//         defense: e.defense,
//         speed: e.speed,
//         height: e.height,
//         weight: e.weight,
//         image: e.image,

//         //Entidad(tabla) Type
//         //type es un arr de objetos [{id,name,pokemon_type},{}]
//         types: e.types.map((e) => {
//           return e.name;
//         }),
//       };
//     }));
//   } catch (error) {
//     throw new Error(error.message);
//   }
// };

// // dbData + apiData
// const fullData = async () => {
//   try {
//     if (pokemonsApi.length === 0) {
//       await apiData();
//     }
//     const fromApi = pokemonsApi.slice(0, 100);
//     const fromDb = await dbData();
//     return [...fromApi, ...fromDb];
//   } catch (error) {
//     throw new Error(error.message);
//   }
// };

// // Data de pokemon por nombre
// const findByName = async (name) => {
//   try {
//     const allPokemonData = await fullData();
//     const onePokemon = await allPokemonData.find(
//       (e) => e.name.toUpperCase() === name.toString().toUpperCase()
//     );
//     if (onePokemon) return onePokemon;
//     return { error_404: `The pokemon ${name} was not found` };
//   } catch (error) {
//     throw new Error(error.message);
//   }
// };

// // Data de pokemon por id
// const findById = async (id) => {
//   try {
//     const allPokemonData = await fullData();
//     const onePokemon = await allPokemonData.find(
//       (e) => e.id.toString() === id.toString()
//     );
//     if (onePokemon) return onePokemon;
//     return { error_404: `The pokemon N.${id} was not found` };
//   } catch (error) {
//     throw new Error(error.message);
//   }
// };

// module.exports = {
//   dbData,
//   apiData,
//   fullData,
//   findByName,
//   findById,
// };

const { Pokemon, Type } = require("../db");
const axios = require("axios");
// Recuperar data de la API mediante fetch
let pokemonsURL = [];
let pokemonsData = [];
let fetchPokemonsDataCalled = false;

const fetchPokemonsURL = async (offset = 0) => {
  try {
    const URL = "https://pokeapi.co/api/v2/pokemon";
    let response = await axios.get(`${URL}?offset=${offset}&limit=500`, {
      headers: { "Accept-Encoding": "gzip,deflate,compress" },
    });

    const data = await response.data.results.map((response) => response.url);
    pokemonsURL.push(...data);
  } catch (error) {
    throw new Error(error.message);
  }
};

const fetchPokemonsData = async () => {
  
  fetchPokemonsDataCalled = true;

  try {
    await fetchPokemonsURL();
    let responses = await Promise.all(
      pokemonsURL.map(async (e) => {
        // Manejar cada error de manera individual
        try {
          const response = await axios.get(e, {
            headers: { "Accept-Encoding": "gzip,deflate,compress" },
          });

          return response.data;
        } catch (error) {
          return null;
        }
      })
    );

    let data = await responses.filter((response) => response !== null);
    pokemonsData.push(...data);
    console.log("termineee")
  } catch (error) {
    throw new Error(error.message);
  }
};

const apiData = async () => {
  try {
    if (fetchPokemonsDataCalled === false) {
      await fetchPokemonsData();
    }
    return pokemonsData.map((e) => {
      return {
        id: e.id,
        name: e.forms[0].name,
        life: e.stats[0].base_stat,
        attack: e.stats[1].base_stat,
        defense: e.stats[2].base_stat,
        speed: e.stats[5].base_stat,
        height: e.height,
        weight: e.weight,
        image: e.sprites.other["official-artwork"].front_default,
        types: e.types.map((e) => e.type.name),
      };
    });
  } catch (error) {
    throw new Error(error.message);
  }
};

const dbData = async () => {
  try {
    // Joinea la tabla Type a la tabla Pokemon
    // Devuelve un array de objetos
    let data = await Pokemon.findAll({
      include: {
        model: Type,
      },
    });
    // toJSON() evita que se muestren datos innecesarios de sequelize
    let dataJson = data.map((e) => e.toJSON());

    return (dataJson = await dataJson.map((e) => {
      return {
        id: e.id,
        name: e.name,
        life: e.life,
        attack: e.attack,
        defense: e.defense,
        speed: e.speed,
        height: e.height,
        weight: e.weight,
        image: e.image,

        types: e.types.map((e) => {
          return e.name;
        }),
      };
    }));
  } catch (error) {
    throw new Error(error.message);
  }
};

// dbData + apiData
const fullData = async () => {
  try {
    const fromApi = await apiData();
    const fromDb = await dbData();
    return [...fromApi, ...fromDb];
  } catch (error) {
    throw new Error(error.message);
  }
};

// Data de pokemon por nombre
const findByName = async (name) => {
  try {
    const allPokemonData = await fullData();
    const onePokemon = await allPokemonData.find(
      (e) => e.name.toUpperCase() === name.toString().toUpperCase()
    );
    if (onePokemon) return onePokemon;
    return { error_404: `The pokemon ${name} was not found` };
  } catch (error) {
    throw new Error(error.message);
  }
};

// Data de pokemon por id
const findById = async (id) => {
  try {
    const allPokemonData = await fullData();
    const onePokemon = await allPokemonData.find(
      (e) => e.id.toString() === id.toString()
    );
    if (onePokemon) return onePokemon;
    return { error_404: `The pokemon N.${id} was not found` };
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  dbData,
  fullData,
  findByName,
  findById,
};
