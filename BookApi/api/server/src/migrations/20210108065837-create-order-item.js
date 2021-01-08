'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('OrderItems', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      orderId: {
        type: Sequelize.INTEGER
      },
      bookId: {
        type: Sequelize.INTEGER
      },
      price: {
        type: Sequelize.REAL
      },
      supplierPrice: {
        type: Sequelize.REAL
      },
      discount: {
        type: Sequelize.REAL
      },
      itemStatus: {
        type: Sequelize.INTEGER,
        default: 1,
      },
      qty: {
        type: Sequelize.INTEGER,
        default: 1,
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
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('OrderItems');
  }
};