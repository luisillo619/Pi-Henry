const {
  pokemon_types_DB,
  findByName,
  findById,
} = require("../controllers/controller_get_types");
const express = require("express");
const pokemonRoute = express.Router();

// Ruta para obtener un Tipo de pokemon por Nombre o todos los Tipos
pokemonRoute.get("/", async (req, res) => {
  try {
    const { name } = req.query;
    if (name) {
      let findPokemon = await findByName(name);
      findPokemon["error"]
        ? res.status(404).json(findPokemon)
        : res.status(200).json(findPokemon);
    } else {
      let allPokemons = await pokemon_types_DB();
      res.status(200).json(allPokemons);
    }
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

// Ruta para obtener Tipo de pokemon por ID
pokemonRoute.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (id) {
      let findPokemon = await findById(id);
      findPokemon["error"]
        ? res.status(404).json(findPokemon)
        : res.status(200).json(findPokemon);
    }
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

module.exports = pokemonRoute;
