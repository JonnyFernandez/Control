const { Product, Review, Like, User } = require('../db')
const { Op, where } = require('sequelize')
const utils = require('../utils/loader_info');




module.exports = {
  create: async (name, image, description, brand, distributor, stock, cost, off, category, iva, iibb, others, gain, userId) => {
    let code = utils.codeProd(category)
    const newProd = await Product.create({ name, image, description, brand, distributor, stock, code, cost, off, category, iva, iibb, others, gain, user: userId });
    return newProd;
  },

  getAll: async (name) => {
    if (name) {
      const prod = await Product.findAll({
        where: {
          name: {
            [Op.iLike]: "%" + name + "%"
          },
        },
        include: [
          {
            model: Review,
            attributes: ["review",],
          },
          {
            model: Like,
            attributes: ["like", "id"],
          },
        ],
      })
      return prod.map(item => {

        return {
          id: item.id,
          name: item.name,
          image: item.image,
          description: item.description,
          brand: item.brand,
          distributor: item.distributor,
          status: item.status && item.stock >= 1 ? true : false,
          code: item.code,
          stock: item.stock,

          price: (parseFloat(item.price) * (1 - parseFloat(item.off))).toFixed(2),
          realPrice: (parseFloat(item.price)).toFixed(2),
          discount: item.off > 0 ? parseFloat(item.price * item.off).toFixed(2) : 0,

          off: item.off,
          category: item.category,
          user: item.user,
          iva: item.iva,
          iibb: item.iibb,
          others: item.others,
          gain: item.gain,
          reviews: item.Reviews.map(el => el.review),
          likes: item.Likes.map(item => { return { "like": item.like, "id": item.id } }),
          createdAt: item.createdAt
        }
      })
    } else {

      const aux = await Product.findAll({
        include: [
          {
            model: Review,
            attributes: ["review",],
          },
          {
            model: Like,
            attributes: ["like", "id"],
          },
        ],
      });


      return aux.map(item => {

        return {
          id: item.id,
          name: item.name,
          image: item.image,
          description: item.description,
          brand: item.brand,
          cost: Number(item.cost).toFixed(2),
          distributor: item.distributor,
          status: item.status && item.stock >= 1 ? true : false,
          code: item.code,
          stock: parseFloat(item.stock),

          price: (parseFloat(item.price) * (1 - parseFloat(item.off))).toFixed(2),
          realPrice: (parseFloat(item.price)).toFixed(2),
          discount: item.off > 0 ? parseFloat(item.price * item.off).toFixed(2) : 0,

          off: parseFloat(item.off),
          category: item.category,
          user: item.user,
          iva: parseFloat(item.iva),
          iibb: parseFloat(item.iibb),
          others: parseFloat(item.others),
          gain: parseFloat(item.gain),
          reviews: item.Reviews.map(el => el.review),
          likes: item.Likes.map(item => { return { "like": item.like, "id": item.id } }),
          createdAt: item.createdAt
        }
      })

    }
  },

  update: async (id, name, image, description, brand, distributor, stock, cost, off, category, iva, iibb, others, gain, user) => {
    const userDB = await User.findByPk(user)
    const matchProd = await Product.findByPk(id)

    if ((userDB.type !== "admin") && stock < matchProd.stock) {
      throw new Error('Only admins can reduce stock manually.')

    }

    matchProd.name = name || matchProd.name;
    matchProd.image = image || matchProd.image;
    matchProd.description = description || matchProd.description;
    matchProd.brand = brand || matchProd.brand;
    matchProd.distributor = distributor || matchProd.distributor;
    matchProd.stock = stock || matchProd.stock;
    matchProd.cost = cost || matchProd.cost;
    matchProd.off = off || matchProd.off;
    matchProd.category = category || matchProd.category;
    matchProd.iva = iva || matchProd.iva;
    matchProd.iibb = iibb || matchProd.iibb;
    matchProd.others = others || matchProd.others;
    matchProd.gain = gain || matchProd.gain;

    await matchProd.save()

    return matchProd

  },
  UpdateState: async (id) => {
    const Prod = await Product.findByPk(id)
    Prod.status = !Prod.status
    await Prod.save()
    return Prod.status ? `Codigo ${Prod.code} Activado` : `Codigo ${Prod.code} Pausado`

  },

  UpdateByCategory: async (off, category) => {
    const res = await Product.update({ off: off }, {
      where: {
        category: category
      }
    })
    return `category discount: ${res}`
  },
  AddPercentageToCost: async (category, percent) => {
    const products = await Product.findAll({
      where: {
        category: category
      }
    });
    // Itera sobre cada producto y actualiza su precio de compra
    for (let product of products) {
      // Calcula el nuevo precio de compra con el porcentaje agregado
      const newCost = product.cost * (1 + percent);

      // Actualiza el precio de compra del producto
      await product.update({ cost: newCost });
    }

    return products.length; // Devuelve el número de productos actualizados
  },
  delete: async (id) => {
    await Product.destroy({ where: { id } })
    return "Prod successfully deleted"
  },
  getCode: async (id) => {
    const aux = await Product.findOne({
      where: {
        id: id
      },
      include: [
        {
          model: Review,
          attributes: ["review",],
        },
        {
          model: Like,
          attributes: ["like", "id"],
        },
      ]
    })
    return {

      id: aux.id,
      name: aux.name,
      image: aux.image,
      description: aux.description,
      brand: aux.brand,
      cost: Number(aux.cost).toFixed(2),
      distributor: aux.distributor,
      status: aux.status && aux.stock >= 1 ? true : false,
      code: aux.code,
      stock: parseFloat(aux.stock),

      price: (parseFloat(aux.price) * (1 - parseFloat(aux.off))).toFixed(2),
      realPrice: (parseFloat(aux.price)).toFixed(2),
      discount: aux.off > 0 ? parseFloat(aux.price * aux.off).toFixed(2) : 0,

      off: parseFloat(aux.off),
      category: aux.category,
      user: aux.user,
      iva: parseFloat(aux.iva),
      iibb: parseFloat(aux.iibb),
      others: parseFloat(aux.others),
      gain: parseFloat(aux.gain),
      reviews: aux.Reviews.map(el => el.review),
      likes: aux.Likes.map(item => { return { "like": item.like, "id": item.id } }),
      createdAt: aux.createdAt,
      updatedAt: aux.updatedAt
    }



  },


};
