
const { User, Review, Product } = require('../db');

module.exports = {
    createReview: async (userId, review) => {

        const user = await User.findByPk(userId);
        if (!user) throw new Error("User not found")

        const newReview = await Review.create({ review });

        await newReview.setUser(user)
        return newReview
    },
    createProdReview: async (userId, productId, review) => {

        // Buscar al usuario en la base de datos
        const user = await User.findByPk(userId);
        if (!user) {
            throw new Error('User do not exist');
        }

        // // Buscar el producto en la base de datos
        const product = await Product.findByPk(productId);
        if (!product) {
            throw new Error('Prod do not exist');
        }

        // // Crear la revisión asociada al usuario y al producto
        const newReview = await Review.create({ review });

        // // Asociar la revisión con el usuario y el producto
        await newReview.setUser(user);
        await newReview.setProduct(product);

        return newReview
    },
    getReview: async () => {
        const result = await Review.findAll({
            include: [{
                model: User,
                attributes: ['id', 'email',]
            }]
        })
        return result

    },
    removeReview: async (id) => {
        await Review.destroy({ where: { id } })
        return "successfully deleted review"
    },
}



