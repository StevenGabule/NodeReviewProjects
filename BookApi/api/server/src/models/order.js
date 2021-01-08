"use strict";
module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define(
      "Order",
      {
        customerId: DataTypes.INTEGER,
        deliveryDate: DataTypes.DATE,
        orderStatus: {
          type: DataTypes.INTEGER,
          defaultValue: 1,
        },
        voucherId: {
          type: DataTypes.INTEGER,
          defaultValue: null
        },
        paymentType: {
          type: DataTypes.INTEGER,
          defaultValue: 1,
        },
        streetId: {
          type: DataTypes.INTEGER,
          defaultValue: null
        },
        barangayId: {
          type: DataTypes.INTEGER,
          defaultValue: null
        },
        municipalityId: {
          type: DataTypes.INTEGER,
          defaultValue: null
        },
        supplierFee: {
          type: DataTypes.REAL,
          defaultValue: 0,
        },
        note: {
          type: DataTypes.TEXT,
          allowNull: true
        }
      },
      {}
  );
  Order.associate = function (models) {
  };
  return Order;
};
