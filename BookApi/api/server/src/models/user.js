'use strict';
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define(
        "User", {
            firstName: DataTypes.STRING,
            middleName: DataTypes.STRING,
            lastName: DataTypes.STRING,
            email: DataTypes.STRING,
            password: DataTypes.STRING,
            contact_number: DataTypes.STRING,
            avatar: DataTypes.STRING,
            user_type: DataTypes.INTEGER
        },
        {}
    );
    User.association = function (models) {
    };
    return User;
};