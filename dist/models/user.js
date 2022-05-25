"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        email: {
            type: DataTypes.String(30),
            allowNull: true,
            unique: true,
        },
        nickname: {
            type: DataTypes.STRING(30),
            allowNull: true,
        },
        password: {
            type: DataTypes.STRING(100),
            allowNull: false,
        }
    }, {
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
    });
    return User;
    // User.association = (db) => {
    //
    //
    // }
};
