const { Pokemon } = require("../db");

// Controlador para eliminar pokemon por ID, se verifica que el id sea un UUID
const deleteById = (id) => {
  if (
    !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
      id.toString()
    )
  ) {
    return { error_400: "ID syntax is invalid" };
  }

  return Pokemon.destroy({
    where: {
      id,
    },
  }).then((deleted) => {
    if (deleted === 0) {
      return { error_404: `Pokemon with ID N.${id} was not found` };
    }
    else return {
      success_200: `Pokemon with ID N.${id} has been successfully removed`,
    };
  });
};

module.exports = { deleteById };
