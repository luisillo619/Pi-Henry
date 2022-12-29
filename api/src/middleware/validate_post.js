const { validate_type } = require("../helpers/validate_type");

const validate_POST = async (req) => {
  try {
    const { name, life, attack, defense, speed, height, weight, image, types } =
      req.body;

    if (
      !name ||
      !life ||
      !attack ||
      !defense ||
      !speed ||
      !height ||
      !weight ||
      !image ||
      !types
    ) {
      return { error_400: "Incomplete data in the body" };
    }

    if (Object.keys(req.body).length > 9) {
      return { error_400: "unnecessary extra data in the body" };
    }

    let validate = await validate_type(types);
    if (validate["error_400"]) return validate;

    return { success_200: "success_200" };
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = validate_POST;
