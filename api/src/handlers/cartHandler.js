const Ctrl = require('../controllers/cartCtrl')


module.exports = {
    createCart: async (req, res) => {
        const { total, items } = req.body
        const user = req.user.id
        try {
            const newCart = await Ctrl.createCart(total, items, user)
            res.status(201).json(newCart);
        } catch (error) {
            res.status(400).json({ message: [error.message] });
        }
    },
    getCart: async (req, res) => {
        const { code } = req.query
        try {
            const aux = await Ctrl.getCart(code)
            res.status(201).json(aux);
        } catch (error) {
            res.status(400).json({ message: [error.message] });
        }
    },
    deleteCart: async (req, res) => {
        const { id } = req.params
        try {
            const aux = await Ctrl.deleteCart(id)
            res.status(201).json(aux);
        } catch (error) {
            res.status(400).json({ message: [error.message] });
        }
    },
    codeCart: async (req, res) => {
        const { code } = req.params
        try {
            const aux = await Ctrl.getCodeCart(code)
            res.status(201).json(aux);
        } catch (error) {
            res.status(400).json({ message: [error.message] });
        }
    },
}