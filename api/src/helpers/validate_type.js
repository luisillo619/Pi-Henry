
// Valida que los TIPOS dentro de la solicitud POST Y PUT, sean un array y cumplan con las caracteristicas necesarias.
const validate_type = async (types) => {
  // Es un array
  if (!Array.isArray(types)) {
    return { error_400: "type must be an array" };
  }

  // El array no esta vacio
  if (types.length < 1) {
    return { error_400: "type cannot be empty" };
  }

  // El array no tiene cadenas vacias
  if (types.find((e) => e === "") === "") {
    return { error_400: "The type cannot be empty in any of its elements" };
  }

  // El array no tiene elementos repetidos
  let repeated = types.map((e, index, arr) => {
    if (arr.indexOf(e) !== index) return true;
  });

  if (repeated.find((e) => e === true)) {
    return {
      error_400: "The type cannot be repeated in any of its elements",
    };
  }
  return { success_200: "success_200" };
};

module.exports = { validate_type };
