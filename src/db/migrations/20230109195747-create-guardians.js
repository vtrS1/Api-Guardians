'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Guardians', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      matricula: {
        type: Sequelize.INTEGER
      },
      numerotel: {
        type: Sequelize.STRING
      },
      setor: {
        type: Sequelize.STRING
      },
      cargo: {
        type: Sequelize.STRING
      },
      filial: {
        type: Sequelize.STRING
      },
      codigocargo: {
        type: Sequelize.INTEGER
      },
      codigofilial: {
        type: Sequelize.INTEGER
      },
      codigodosetor: {
        type: Sequelize.INTEGER
      },
      valecredito: {
        type: Sequelize.STRING
      },
      turno: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Guardians');
  }
};