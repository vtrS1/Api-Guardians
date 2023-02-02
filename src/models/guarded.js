"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Guarded extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Guardians, {
        foreignKey: "guardiansid",
        as: "guardian",
      });
    }
  }
  Guarded.init(
    {
      name: DataTypes.STRING,
      matricula: DataTypes.INTEGER,
      numerotel: DataTypes.STRING,
      setor: DataTypes.STRING,
      cargo: DataTypes.STRING,
      filial: DataTypes.STRING,
      codigocargo: DataTypes.INTEGER,
      codigofilial: DataTypes.INTEGER,
      codigodosetor: DataTypes.INTEGER,
      turno: DataTypes.STRING,
      dtadmissao: DataTypes.DATE,
      uffilial: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Guarded",
    }
  );
  return Guarded;
};
