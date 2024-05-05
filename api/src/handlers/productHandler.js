const Ctrl = require("../controllers/productCtrl");

module.exports = {
  create: async (req, res) => {
    const { name, image, description, brand, distributor, stock, cost, off, category, iva, iibb, others, gain } = req.body;
    const userId = req.user.id;

    try {
      const newProd = await Ctrl.create(name, image, description, brand, distributor, stock, cost, off, category, iva, iibb, others, gain, userId);
      res.status(201).json(newProd);
    } catch (error) {
      res.status(400).json({ message: [error.message] });
    }
  },
  getAll: async (req, res) => {
    const { name } = req.query;
    try {
      const getProd = await Ctrl.getAll(name);
      res.status(201).json(getProd);
    } catch (error) {
      res.status(400).json({ message: [error.message] });
    }
  },
  update: async (req, res) => {
    const { id } = req.params;
    const { name, image, description, brand, distributor, stock, cost, off, category, iva, iibb, others, gain } = req.body;
    try {
      const updateProd = await Ctrl.update(id, name, image, description, brand, distributor, stock, cost, off, category, iva, iibb, others, gain, req.user.id)
      res.status(201).json(updateProd);
    } catch (error) {
      res.status(400).json({ message: [error.message] });
    }
  },
  updateByCategory: async (req, res) => {
    const { off, category } = req.body;

    try {
      const result = await Ctrl.UpdateByCategory(off, category)
      res.status(201).json(result);
    } catch (error) {
      res.status(400).json({ message: [error.message] });
    }
  },
  addPorcentToCost: async (req, res) => {
    const { category, percent } = req.body;
    try {
      const result = await Ctrl.AddPercentageToCost(category, percent)
      res.status(201).json(result);
    } catch (error) {
      res.status(400).json({ message: [error.message] });
    }
  },
  delete: async (req, res) => {
    const { id } = req.params;
    try {
      const updateProd = await Ctrl.delete(id);
      res.status(201).json(updateProd);
    } catch (error) {
      res.status(400).json({ message: [error.message] });
    }
  },
  getByCode: async (req, res) => {
    const { id } = req.params;
    try {
      const codeProd = await Ctrl.getCode(id);
      res.status(201).json(codeProd);
    } catch (error) {
      res.status(400).json({ message: [error.message] });
    }
  },
};
