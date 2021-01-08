"use strict";
module.exports = (sequelize, DataTypes) => {
  const Cart = sequelize.define(
      "Cart",
      {
        customerId: DataTypes.INTEGER,
        bookId: DataTypes.INTEGER,
        qty: DataTypes.INTEGER
      },
      {}
  );

  Cart.associate = function ({User, Book}) {
    Cart.belongsTo(User,{
      onDelete: "CASCADE",
      foreignKey: "customerId"
    });
    Cart.belongsTo(Book,{
      onDelete: "CASCADE",
      foreignKey: "bookId"
    });
  };
  return Cart;
};