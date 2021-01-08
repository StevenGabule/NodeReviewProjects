'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Orders', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            customerId: {
                type: Sequelize.INTEGER
            },
            deliveryDate: {
                type: Sequelize.DATE
            },
            orderStatus: {
                type: Sequelize.INTEGER,
                default: 1,
                comments: "1-pending,2-ongoing,3-cancel,4-completed,5-hold"
            },
            voucherId: {
                type: Sequelize.INTEGER,
                allowNull: true,

            },
            paymentType: {
                type: Sequelize.INTEGER,
                default: 1,
            },
            streetId: {
                type: Sequelize.INTEGER,
                allowNull: true,
            },
            barangayId: {
                type: Sequelize.INTEGER,
                allowNull: true,
            },
            municipalityId: {
                type: Sequelize.INTEGER,
                allowNull: true,
            },
            supplierFee: {
                type: Sequelize.REAL,
                allowNull: true,
            },
            note: {
                type: Sequelize.TEXT
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
        await queryInterface.dropTable('Orders');
    }
};