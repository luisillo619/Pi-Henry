const validate_type = async (types) => {
  if (!Array.isArray(types)) {
    return { error_400: "type must be an array" };
  }

  if (types.length < 1) {
    return { error_400: "type cannot be empty" };
  }

  //sin elementos vacios
  if (types.find((e) => e === "") === "") {
    return { error_400: "The type cannot be empty in any of its elements" };
  }

  //sin elementos repetidos
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
