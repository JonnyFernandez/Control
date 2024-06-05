const { Like, Product } = require('../db')

module.exports = {
    createLike: async (prodId, userId) => {
        const prod = await Product.findByPk(prodId)
        if (!prod) throw new Error('Prod not found')

        const like = await Like.create({ like: userId })
        await like.setProduct(prod)
        return "Like successfully"
    },
    removeLikeFromProduct: async (prodId, userId) => {
        const prod = await Product.findByPk(prodId);
        if (!prod) throw new Error('Product not found');

        const like = await Like.findOne({
            where: {
                like: userId,
                ProductId: prodId
            }
        });
        if (!like) {
            throw new Error('Like not found for this user and product');
        }
        await like.destroy();
        return 'Like removed successfully from the product';
    }
}





