'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Filial extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Filial.init({
    filialcode: DataTypes.INTEGER,
    namefilial: DataTypes.STRING,
    uffilial: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Filial',
  });
  return Filial;
};