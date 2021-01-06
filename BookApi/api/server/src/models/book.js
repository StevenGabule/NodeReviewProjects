"use strict";
module.exports = (sequelize, DataTypes) => {
    const Book = sequelize.define(
        "Book",
        {
            title: DataTypes.STRING,
            price: DataTypes.STRING,
            description: DataTypes.STRING,
            avatar: DataTypes.TEXT,
        },
        {}
    );
    Book.associate = function (models) {
    };
    return Book;
};
