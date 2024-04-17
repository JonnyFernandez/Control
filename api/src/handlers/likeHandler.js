const Ctrl = require('../controllers/likeCtrl')

module.exports = {
    createLike: async (req, res) => {
        const { prodId } = req.body;
        try {
            const aux = await Ctrl.createLike(prodId, req.user.id)
            res.status(201).json(aux)
        } catch (error) {
            res.status(400).json({ message: [error.message] });
        }
    },
    removeLike: async (req, res) => {
        const { id } = req.params;
        try {
            const aux = await Ctrl.removeLike(id)
            res.status(201).json(aux)
        } catch (error) {
            res.status(400).json({ message: [error.message] });
        }
    },
};