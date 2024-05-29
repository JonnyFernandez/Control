require("dotenv").config();
const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");

const sequelize = new Sequelize(
  `postgres://${process.env.USER_DB}:${process.env.PASSWORD_DB}@localhost:5432/${process.env.DB}`,
  {
    logging: false, // establece a console.log para ver las consultas SQL en bruto
    native: false, // le indica a Sequelize que podemos usar pg-native para obtener ~30% más de velocidad
  }
);

const basename = path.basename(__filename);

const modelDefiners = [];

fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });

modelDefiners.forEach((model) => model(sequelize));
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

const { User, Review, Product, ShoppingCart, Like } = sequelize.models;
// console.log(sequelize.models);

ShoppingCart.belongsToMany(Product, { through: "CartItem" })
Product.belongsToMany(ShoppingCart, { through: "CartItem" })

Product.hasMany(Like)
Like.belongsTo(Product)

User.hasMany(Review);
Review.belongsTo(User);

Product.hasMany(Review)
Review.belongsTo(Product)

module.exports = {
  ...sequelize.models,
  conn: sequelize,
};
