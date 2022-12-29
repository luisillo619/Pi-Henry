const express = require("express");
const {
  findByName,
  fullData,
  findById,
  apiData,
} = require("../controllers/controller_get_pokemons");
const pokemonRoute = express.Router();


// All pokemons and query pokemons
pokemonRoute.get("/", async (req, res) => {
  try {
    const { name } = req.query;
    if (name) {
      let findPokemon = await findByName(name);
      findPokemon["error"]
        ? res.status(404).json(findPokemon)
        : res.status(200).json(findPokemon);
    } else {
      const allPokemons = await fullData();
      res.status(200).json(allPokemons);
    }
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

// Params Pokemons
pokemonRoute.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (id) {
      let findPokemon = await findById(id);
      findPokemon["error_404"]
        ? res.status(404).json(findPokemon)
        : res.status(200).json(findPokemon);
    }
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

module.exports = pokemonRoute;
