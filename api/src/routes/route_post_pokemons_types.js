const { findOrCreateType } = require("../controllers/controller_post_types");
const { validateIsNumber, validateIsText } = require("../helpers/validate");
const { Pokemon } = require("../db");
const validate_POST = require("../middleware/validate_post");
const express = require("express");
const pokemonRoute = express.Router();

// Ruta para crear un nuevo Pokemon en la base de datos
pokemonRoute.use("/", async (req, res) => {
  try {
    let request = req.body;

    // Validadores
    let validate = await validate_POST(req);
    if (validate["error_400"]) res.status(400).json(validate);
    else {
      let isNumber = await validateIsNumber(req);
      let isText = await validateIsText(req);

      if (isNumber["error_400"]) res.status(400).json(isNumber);
      else if (isText["error_400"]) res.status(400).json(isText);
      else {

        // Creacion del Pokemon
        // Los tipos de pokemon no se agrega en el metodo .create
        let newPokemon = await Pokemon.create(request);
        let typesDb = await findOrCreateType(request.types);
        
        //[{tipo1}{tipo2}{tipo3}]
        await typesDb.forEach((e) => {
          newPokemon.addType(e[0]);
        });
        res.status(201).json({ success_201: "Successfully created Pokémon!" });
      }
    }
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

module.exports = pokemonRoute;
