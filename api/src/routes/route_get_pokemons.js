const express = require("express");
const {
  findByName,
  fullData,
  findById,
} = require("../controllers/controller_get_pokemons");
const pokemonRoute = express.Router();


// Ruta para obtener un Pokemon por Nombre o todos los Pokemons
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
    if(allPokemons.length !== 0){
      console.log(allPokemons)
      res.status(200).json(allPokemons);
    }
    
    }
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

// Ruta para obtener Pokemon por ID
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
