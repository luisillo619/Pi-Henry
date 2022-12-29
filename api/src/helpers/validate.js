const isURL = require("validator/lib/isURL");
const { Pokemon } = require("../db");

const validateIsNumber = async (req) => {
  try {
    let request = { ...req.body };
    delete request.name;
    delete request.types;
    delete request.image;
    if (request.id) delete request.id;

    const typeNumber = (param, key) => {
      if (typeof param !== "number") {
        return { error_400: `The ${key} parameter must be of type Number` };
      }
      if (param < 0) {
        return { error_400: `The parameter ${key} cannot be negative` };
      }
      if (!Number.isInteger(param)) {
        return { error_400: `The parameter ${key} has to be an integer` };
      }
      return null;
    };

    for (const [key, value] of Object.entries(request)) {
      let mensaje = await typeNumber(value, key);

      if (mensaje) return mensaje;
    }

    return { success_200: "success_200" };
  } catch (error) {
    throw new Error(error.message);
  }
};

const validateIsText = async (req) => {
  try {
    let request = { ...req.body };
    delete request.life;
    delete request.attack;
    delete request.defense;
    delete request.speed;
    delete request.height;
    delete request.weight;

    const regexText = /^[A-Za-zñÑ-áéíóúÁÉÍÓÚ\s]+$/i;
    const regexUUID =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

    const typeText = (param, key) => {
      if (typeof param !== "string" && key !== "types") {
        return { error_400: `The ${key} parameter must be of type String` };
      }

      if (!regexText.test(param) && key === "name") {
        return { error_400: `Name parameter can contain letters only` };
      }

      if (key === "image" && !isURL(param)) {
        return { error_400: `the URL parameter: "${param}"  is invalid` };
      }

      if (key === "id" && !regexUUID.test(param)) {
        return { error_400: "ID parameter syntax is invalid" };
      }

      if (key === "types") {
        const errors = param.map((e) => {
          if (typeof e !== "string")
            return {
              error_400: `The elements of the types parameter must be string`,
            };

          if (!regexText.test(e))
            return {
              error_400: `Types parameter elements can contain only letters`,
            };
        });
        return errors.find((e) => typeof e === "object");
      }

      return null;
    };

    for (const [key, value] of Object.entries(request)) {
      let validate = await typeText(value, key);
      if (validate) return validate;
    }

    // verificar que exista el pokemon que se quiere modificar (PUT)
    if (request.id) {
      const onePokemon = await Pokemon.findOne({
        where: {
          id: request.id,
        },
      });

      if (!onePokemon) {
        return {
          error_404: ` Pokemon with ID ${request.id} not found inside database`,
        };
      } else {
        return { success_200: "success_200" };
      }
    }

    // verificar que no exista un pokemon con el mismo nombre (POST)
    const findDb = await Pokemon.findOne({
      where: {
        name: request.name,
      },
    });
    if (findDb !== null) {
      return { error_400: "Can't create two Pokemon with the same name" };
    }

    return { success_200: "success_200" };
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = { validateIsNumber, validateIsText };
