const isURL = require("validator/lib/isURL");
const { Pokemon } = require("../db");

// Validador de elementos de tipo Number
const validateIsNumber = async (req) => {
  try {
    // No modifica el objeto original
    let request = { ...req.body };
    delete request.name;
    delete request.types;
    delete request.image;
    if (request.id) delete request.id;

    const typeNumber = (param, key) => {
      // Es un numero
      if (typeof param !== "number") {
        return { error_400: `The ${key} parameter must be of type Number` };
      }
      // No es un numero positivo
      if (param < 0) {
        return { error_400: `The parameter ${key} cannot be negative` };
      }
      // Es un numero Entero
      if (!Number.isInteger(param)) {
        return { error_400: `The parameter ${key} has to be an integer` };
      }
      return null;
    };

    // Si existe algun error, retorna el Error
    for (const [key, value] of Object.entries(request)) {
      let errors = await typeNumber(value, key);
      if (errors) return errors;
    }

    // Si no existe error, retorna status 200
    return { success_200: "success_200" };
  } catch (error) {
    throw new Error(error.message);
  }
};

// Validador de elementos de tipo String
const validateIsText = async (req) => {
  try {
    // No modifica el objeto original
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
      // Es un String
      if (typeof param !== "string" && key !== "types") {
        return { error_400: `The ${key} parameter must be of type String` };
      }


      // El String solo contiene Letras
      if (!regexText.test(param) && key === "name") {
        return { error_400: `Name parameter can contain letters only` };
      }


      // La imagen es un String con una URL valida
      if (key === "image" && !isURL(param)) {
        return { error_400: `the URL parameter: "${param}"  is invalid` };
      }


      // El id es UUID
      if (key === "id" && !regexUUID.test(param)) {
        return { error_400: "ID parameter syntax is invalid" };
      }


      if (key === "types") {

        const errors = param.map((e) => {
          // El array de tipos solo contiene cadenas String
          if (typeof e !== "string")
            return {
              error_400: `The elements of the types parameter must be string`,
            };

          // El array de tipos solo contiene cadenas String que no contienen Numeros
          if (!regexText.test(e))
            return {
              error_400: `Types parameter elements can contain only letters`,
            };
        });
        return errors.find((e) => typeof e === "object");

      }

      return null;
    };
 
    // Si existe algun error, retorna el Error
    for (const [key, value] of Object.entries(request)) {
      let errors = await typeText(value, key);
      if (errors) return errors;
    }

    
    // Verifica que el ID de la solicitud PUT, coincida con algun pokemon de la base de datos
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


    // Verifica que eL nombre de la solicitud POST, no coincida con ningun nombre de pokemon de la base de datos
    const findDb = await Pokemon.findOne({
      where: {
        name: request.name,
      },
    });
    if (findDb !== null) {
      return { error_400: "Can't create two Pokemon with the same name" };
    }


    // Si no existe error, retorna status 200
    return { success_200: "success_200" };
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = { validateIsNumber, validateIsText };
