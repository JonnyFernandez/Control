const { Like, Product } = require('../db')

module.exports = {
    createLike: async (prodId, userId) => {
        // const pepe = '1e776af5-d83f-4397-9f83-10e7ca5a7f15'
        const prod = await Product.findByPk(prodId)
        if (!prod) throw new Error('Prod not found')

        const like = await Like.create({ like: userId })
        await like.setProduct(prod)
        return "Like successfully"






    },
    removeLike: async (likeId) => {
        const like = await Like.findByPk(likeId);

        if (!like) {
            throw new Error('Like not found'); // Manejar el caso en que el like no se encuentra
        }

        await like.destroy(); // Eliminar el like
        return 'Like removed successfully'; // Devolver un mensaje indicando que el like se eliminó correctamente
    }
}