const { Pokemon, Type } = require("../db");
const { findOrCreateType } = require("./controller_post_types");

// Busca al pokemon que se va a modifcar por id y busca los TIPOS que tiene el mismo pokemon que se va a modificar.
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

// Modifica los atributos de algun pokemon dentro de la base de datos
const modifyPokemon = async (req, newType) => {
  try {
    let request = { ...req.body };
    // Se obtiene el Pokemon y los Tipos del Pokemon que se va a modificar
    const { oldType, onePokemon } = await findPokemon(request.id);

    // Se modifican los atributos excepto los tipos
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
    // Se remueven los tipos del pokemon que se va a modificar
    await oldType.forEach((e) => {
      onePokemon.removeType(e[0]);
    });
    // se agregan los nuevos tipos que vienen en el cuerpo de la solicitud
    await newType.forEach((e) => {
      onePokemon.addType(e[0]);
    });

    return { success_200: "success_200" };
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = { modifyPokemon };
