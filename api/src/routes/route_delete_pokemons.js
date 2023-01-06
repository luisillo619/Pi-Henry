const { deleteById } = require("../controllers/controller_delete_pokemons");
const express = require("express");
const pokemonRoute = express.Router();

// Ruta Para eliminar pokemon de la base de datos
pokemonRoute.use("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (id) {
      let deletePokemon = await deleteById(id);
      if (deletePokemon["error_404"]) res.status(404).json(deletePokemon);
      if (deletePokemon["error_400"]) res.status(400).json(deletePokemon);
      else if (deletePokemon["success_200"]) res.status(200).json(deletePokemon);
    }
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

module.exports = pokemonRoute;
