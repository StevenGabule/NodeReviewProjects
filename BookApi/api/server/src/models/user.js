'use strict';
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define(
        "User", {
            name: DataTypes.STRING,
            email: DataTypes.STRING,
            password: DataTypes.STRING,
            contact_number: DataTypes.STRING,
            avatar: {
                type: DataTypes.STRING,
                defaultValue: null
            },
            user_type: {
                type: DataTypes.INTEGER,
                defaultValue: 1
            },
            street_id: {
                type: DataTypes.INTEGER,
                defaultValue: null
            },
            barangay_id: {
                type: DataTypes.INTEGER,
                defaultValue: null
            },
            municipality_id: {
                type: DataTypes.INTEGER,
                defaultValue: null
            },
            gender: {
                type: DataTypes.INTEGER,
                defaultValue: 1
            },
            birthday: {
                type: DataTypes.DATE,
                allowNull: true,
            },
        },
        {}
    );
    User.association = function (models) {
    };
    return User;
};