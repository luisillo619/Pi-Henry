const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "type",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false, //El valor no puede ser nulo
      },
    },
    { timestamps: false }
  );
};
