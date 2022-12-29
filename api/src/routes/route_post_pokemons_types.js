const { findOrCreateType } = require("../controllers/controller_post_types");
const { validateIsNumber, validateIsText } = require("../helpers/validate");
const { Pokemon } = require("../db");
const validate_POST = require("../middleware/validate_post");
const express = require("express");
const pokemonRoute = express.Router();

// Create Pokemon
pokemonRoute.use("/", async (req, res) => {
  try {
    let request = req.body;
    let validate = await validate_POST(req);
    if (validate["error_400"]) res.status(400).json(validate);
    else {
      let isNumber = await validateIsNumber(req);
      let isText = await validateIsText(req);

      if (isNumber["error_400"]) res.status(400).json(isNumber);
      else if (isText["error_400"]) res.status(400).json(isText);
      else {
        // delete request.type
        // create(request)
        let newPokemon = await Pokemon.create(request);
        let typesDb = await findOrCreateType(request.types);

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
