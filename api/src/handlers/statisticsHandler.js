const Ctrl = require('../controllers/statisticsCtrl')

module.exports = {
    statistics: async (req, res) => {
        try {
            const aux = await Ctrl.getStatistics()
            res.status(201).json(aux);
        } catch (error) {
            res.status(400).json({ message: [error.message] });
        }
    }
}