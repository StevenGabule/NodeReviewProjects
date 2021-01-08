"use strict";
module.exports = (sequelize, DataTypes) => {
    const Book = sequelize.define(
        "Book",
        {
            title: DataTypes.STRING,
            price: DataTypes.REAL,
            supplierPrice: DataTypes.REAL,
            description: DataTypes.STRING,
            avatar: DataTypes.TEXT,
            userId: DataTypes.INTEGER,
            status: {
                type: DataTypes.INTEGER,
                defaultValue: 1
            },
            verifiedStatus: {
                type: DataTypes.BOOLEAN,
                defaultValue: false
            },
        },
        {}
    );
    Book.associate = function ({User}) {
        Book.belongsTo(User, {
            onDelete: "CASCADE",
            foreignKey: "userId"
        })
    };
    return Book;
};
