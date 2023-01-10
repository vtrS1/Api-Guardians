"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Guardians extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Guardians.init(
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      matricula: DataTypes.INTEGER,
      numerotel: DataTypes.STRING,
      setor: DataTypes.STRING,
      cargo: DataTypes.STRING,
      filial: DataTypes.STRING,
      codigocargo: DataTypes.INTEGER,
      codigofilial: DataTypes.INTEGER,
      codigodosetor: DataTypes.INTEGER,
      valecredito: DataTypes.STRING,
      turno: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Guardians",
    }
  );
  return Guardians;
};
