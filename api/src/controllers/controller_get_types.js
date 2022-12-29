const { Type } = require("../db");

// Guarda los types de la API en la DB
let save = false;

const save_pokemon_types = () => {
  const URL = "https://pokeapi.co/api/v2/type";

  return fetch(URL)
    .then((e) => e.json())
    .then((request) => {
     
      const types = [...new Set(request.results.map((e) => e.name))];
      
      return Promise.all(
        types.map((name) =>
          Type.findOne({ where: { name } }).then((type) => {
            if (type) return type;
            return Type.create({ name });
          })
        )
      ).then(() => (save = true));
    })
    .catch((error) => {
      throw new Error(error.message);
    });
};

// Recupera los types de la DB
const pokemon_types_DB = async () => {
  try {
    await save_pokemon_types()
    let data = await Type.findAll();
    let dataJson = await data.map((e) => e.toJSON());
    return dataJson;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Type por nombre
const findByName = async (name) => {
  try {
    const allTypeData = await pokemon_types_DB();
    const oneType = await allTypeData.find(
      (e) => e.name.toUpperCase() === name.toString().toUpperCase()
    );
    if (oneType) return oneType;
    return { error_404: `The type ${name} was not found` };
  } catch (error) {
    throw new Error(error.message);
  }
};

// Type por id
const findById = async (id) => {
  try {
    const allTypeData = await pokemon_types_DB();
    const oneType = await allTypeData.find((e) => e.id === parseInt(id));
    if (oneType) return oneType;
    return { error_404: `The type N.${id} was not found` };
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  pokemon_types_DB,
  findByName,
  findById,
  save_pokemon_types,
  save,
};
