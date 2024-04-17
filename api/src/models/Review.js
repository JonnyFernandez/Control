const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

    sequelize.define('Review', {

        review: {
            type: DataTypes.TEXT,
            allowNull: true,
            validate: {
                isNotfake(value) {
                    if (value.toLowerCase().includes('gabi')) { throw new Error(`no puedes incluir ${value} en la review`) }
                    if (value.toLowerCase().includes('dulce')) { throw new Error(`no puedes incluir ${value} en la review`) }
                    if (value.toLowerCase().includes('jonny')) { throw new Error(`no puedes incluir ${value} en la review`) }
                    if (value.toLowerCase().includes('andres')) { throw new Error(`no puedes incluir ${value} en la review`) }
                    if (value.toLowerCase().includes('juan')) { throw new Error(`no puedes incluir ${value} en la review`) }
                    if (value.toLowerCase().includes('sergio')) { throw new Error(`no puedes incluir ${value} en la review`) }
                    if (value.toLowerCase().includes('sol')) { throw new Error(`no puedes incluir ${value} en la review`) }
                }
            }
        },
    }, { timestamps: true, freezeTableName: true },)
};