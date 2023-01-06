const { modifyPokemon } = require("../controllers/controller_put_pokemons");
const { findOrCreateType } = require("../controllers/controller_post_types");
const { validateIsNumber, validateIsText } = require("../helpers/validate");
const validate_PUT = require("../middleware/validate_put");
const express = require("express");
const pokemonRoute = express.Router();

// Ruta para modificar un Pokemon de la base de datos
pokemonRoute.use("/", async (req, res) => {
  try {
    let request = req.body;

    // Validadores
    let validate = await validate_PUT(req);
    if (validate["error_400"]) res.status(400).json(validate);
    else {
      let isNumber = await validateIsNumber(req);
      let isText = await validateIsText(req);

      if (isNumber["error_400"]) res.status(400).json(isNumber);
      else if (isText["error_400"]) res.status(400).json(isText);
      else if(isText["error_404"]) res.status(404).json(isText)
      else {

        // Modificacion del Pokemon
        let newType = await findOrCreateType(request.types);
        await modifyPokemon(req, newType);
        res.status(201).json({ success_201: "Successfully modified Pokemon!" });
      }
    }
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

module.exports = pokemonRoute;
