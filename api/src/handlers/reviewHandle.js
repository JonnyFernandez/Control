const Ctrl = require('../controllers/reviewCtrl')

module.exports = {
    createReview: async (req, res) => {
        const { review, productId } = req.body
        const userId = req.user.id

        try {
            const aux = productId
                ? await Ctrl.createProdReview(userId, productId, review)
                : await Ctrl.createReview(userId, review)
            res.json(aux)
        } catch (error) {
            res.status(400).json({ message: [error.message] })
        }
    },
    getReview: async (req, res) => {
        try {
            const aux = await Ctrl.getReview()
            res.json(aux)
        } catch (error) {
            res.status(400).json({ message: [error.message] })
        }
    },
    removeReview: async (req, res) => {
        const { id } = req.params

        try {
            const aux = await Ctrl.removeReview(id)
            res.json(aux)
        } catch (error) {
            res.status(400).json({ message: [error.message] })
        }

    },
}