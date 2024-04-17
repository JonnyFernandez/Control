const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('ShoppingCart', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        total: {
            type: DataTypes.FLOAT,
            allowNull: true
        },
        user: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        code: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    }, {
        timestamps: true,
        freezeTableName: true,
    })
}