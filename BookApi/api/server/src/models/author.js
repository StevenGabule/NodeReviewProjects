"use strict";
module.exports = (sequelize, DataTypes) => {
    const Author = sequelize.define(
        "Author",
        {
            name: DataTypes.STRING,
            description: DataTypes.TEXT,
            penName: DataTypes.STRING,
            avatar: DataTypes.STRING,
            birthday: DataTypes.DATE,
            graduateAt: DataTypes.STRING
        },
        {}
    );
    Author.associate = function (models) {
    };
    return Author;
};
