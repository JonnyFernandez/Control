const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('CartItem', {
        cantidad: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1 // Establece un valor predeterminado para la cantidad
        }
    });
};
