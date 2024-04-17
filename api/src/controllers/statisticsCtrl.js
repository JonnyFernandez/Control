const cartCtrl = require('../controllers/cartCtrl')
const prodCtrl = require('../controllers/productCtrl')

module.exports = {
    getStatistics: async () => {
        const aux = await cartCtrl.getCart()

        if (aux.length < 1) throw new Error('We have no registered orders, there are no sales statistics')

        const carts = await aux.map(item => item.products)

        let prodArr = carts.flat()

        // return prodArr
        const count = prodArr.reduce((acc, curr) => {
            if (curr.name in acc) {
                acc[curr.name]++;
            } else {
                acc[curr.name] = 1;
            }

            return acc;
        }, {});

        const repeated = [];
        for (let name in count) {
            if (count[name] >= 1) {
                repeated.push({ name, count: count[name] });
            }
        }
        // return repeated
        const prod = await prodCtrl.getAll()
        const productsWithLikesCount = prod.map(product => {
            const likesCount = product.likes.length;
            return {
                id: product.id,
                name: product.name,
                likes: likesCount
            };
        });

        return {
            moreSeller: repeated,
            moreLikes: productsWithLikesCount
        };
    },


    prodLikes: async () => {
        const prod = await prodCtrl.getAll()


    }


}