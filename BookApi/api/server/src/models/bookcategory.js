"use strict";
module.exports = (sequelize, DataTypes) => {
  const BookCategory = sequelize.define(
      "BookCategory",
      {
        bookId: DataTypes.INTEGER,
        authorId: DataTypes.INTEGER
      },
      {}
  );
  BookCategory.associate = function (models) {
  };
  return BookCategory;
};
