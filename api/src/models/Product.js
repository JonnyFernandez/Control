const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("Product", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    brand: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    distributor: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    code: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
    },
    cost: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
      defaultValue: 1.00
    },
    off: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
      defaultValue: 0.00
    },
    category: {
      type: DataTypes.ENUM,
      values: ['libreria', 'limpieza', 'otros', 'jugueteria', 'quimica', 'sueltos', 'piscina', 'bazar', 'plasticos', 'perfumeria', 'indumentaria']
    },
    user: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    iva: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
      defaultValue: 1.00
    },
    iibb: {
      type: DataTypes.DECIMAL(10, 3),
      allowNull: true,
      defaultValue: 1.00
    },
    others: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
      defaultValue: 1.00
    },
    gain: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
      defaultValue: 1.00
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),

      get() {
        return parseFloat(this.cost) * (1 + parseFloat(this.iva) + parseFloat(this.iibb) + parseFloat(this.others) + parseFloat(this.gain) - parseFloat(this.off) )
      },

    },
  }, {
    timestamps: true,
    freezeTableName: true,
  });
};
