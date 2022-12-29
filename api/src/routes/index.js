const { Router } = require("express");
const { apiData, typesApi } = require("../controllers/controller_get_pokemons");
const { pokemon_types_DB } = require("../controllers/controller_get_types");
const { findByName } = require("../controllers/controller_get_types");
const {deleteById} = require("../controllers/controller_delete_pokemons")

const router_pokemons = require("./route_get_pokemons");
const router_types = require("./route_get_types");
const route_create = require("./route_post_pokemons_types");
const route_delete = require("./route_delete_pokemons");
const route_modify = require("./route_put_pokemons")
const router = Router();

router.use("/pokemons", router_pokemons);
router.use("/types", router_types);
router.use("/create", route_create);
router.use("/delete", route_delete);
router.use("/modify", route_modify)


module.exports = router;
