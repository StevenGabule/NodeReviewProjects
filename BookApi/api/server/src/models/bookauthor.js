"use strict";
module.exports = (sequelize, DataTypes) => {
  const BookAuthor = sequelize.define(
      "BookAuthor",
      {
        bookId: DataTypes.INTEGER,
        categoryId: DataTypes.INTEGER
      },
      {}
  );
  BookAuthor.associate = function (models) {
  };
  return BookAuthor;
};
