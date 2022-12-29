const { validate_type } = require("../helpers/validate_type");

const validate_PUT = async (req) => {
  try {
    const {name,life,attack, defense, speed, height, weight,image,types,id} = req.body;
    if (
      !name ||
      !life ||
      !attack ||
      !defense ||
      !speed ||
      !height ||
      !weight ||
      !image ||
      !types ||
      !id
    ) {
      return { error_400: "Incomplete data in the body" };
    }

    if (Object.keys(req.body).length > 10) {
      return { error_400: "unnecessary extra data in the body" };
    }

    let validate = await validate_type(types);
    if (validate["error_400"]) return validate;

    return { success_200: "success_200" };

   
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = validate_PUT
