const { Type } = require("../db");
const {
  save_pokemon_types,
  save,
} = require("./controller_get_types");

// find Or Create Type
const findOrCreateType = async (types) => {
  try {
    if (save.length === 0) await save_pokemon_types();
    
    let typesCreate = await types.map(async (e) => {
      return Type.findOrCreate({
        where: {
          name: e.toString(),
        },
      });
    });
    
    let typesDb = await Promise.all(typesCreate);
    return typesDb;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = { findOrCreateType };
