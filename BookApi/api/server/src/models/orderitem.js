"use strict";
module.exports = (sequelize, DataTypes) => {
  const OrderItem = sequelize.define(
      "OrderItem",
      {
        orderId: DataTypes.INTEGER,
        bookId: DataTypes.INTEGER,
        price: DataTypes.REAL,
        supplierPrice: DataTypes.REAL,
        discount: DataTypes.REAL,
        itemStatus: {
          type: DataTypes.INTEGER,
          defaultValue: 1,
        },
        qty: {
          type: DataTypes.INTEGER,
          defaultValue: 1
        }
      },
      {}
  );
  OrderItem.associate = function (models) {
  };
  return OrderItem;
};
