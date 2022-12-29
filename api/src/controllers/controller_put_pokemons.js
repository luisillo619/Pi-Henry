const { Pokemon, Type } = require("../db");
const { findOrCreateType } = require("./controller_post_types");

const findPokemon = async (id) => {
  try {
    const onePokemon = await Pokemon.findOne({
      where: { id },
      include: {
        model: Type,
      },
    });
 
    const oldType = await findOrCreateType(
      onePokemon.toJSON().types.map((e) => e.name) // arr de types
    );

    return { oldType, onePokemon };
  } catch (error) {
    throw new Error(error.message);
  }
};

// Modificar datos de pokemon
const modifyPokemon = async (req, newType) => {
  try {
    let request = { ...req.body };
    const { oldType, onePokemon } = await findPokemon(request.id);

    await Pokemon.update(
      {
        name: request.name,
        life: request.life,
        attack: request.attack,
        defense: request.defense,
        speed: request.speed,
        height: request.height,
        weight: request.weight,
        image: request.image,
      },
      {
        where: {
          id: request.id,
        },
      }
    );

    //[[type1][type2]]
    
    await oldType.forEach((e) => {
      onePokemon.removeType(e[0]);
    });

    await newType.forEach((e) => {
      onePokemon.addType(e[0]);
    });

    return { success_200: "success_200" };
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = { modifyPokemon };
