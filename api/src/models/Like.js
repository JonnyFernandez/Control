const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('Like', {

        like: {
            type: DataTypes.STRING,
            allowNull: true,
        },

    }, {
        timestamps: false,
        freezeTableName: true,
    })
}