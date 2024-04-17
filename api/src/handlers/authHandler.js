const { createAccesToken } = require("../utils/jwt");
const auth = require("../controllers/authCtrl");
// const { authRequire } = require("../middlewares/validateToken");
const jwt = require("jsonwebtoken");
const { User } = require("../db");
require("dotenv").config();

module.exports = {
  register: async (req, res) => {
    try {
      const { username, email, password, type } = req.body;
      const aux = await auth.register(username, email, password, type);

      const token = await createAccesToken({ id: aux.id });
      res.cookie("token", token);
      res.status(200).json(aux);
    } catch (error) {
      res.status(409).json({ message: [error.message] });
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const aux = await auth.login(email, password);
      if (aux.id) {
        const token = await createAccesToken({ id: aux.id });
        res.cookie("token", token);
        res.status(200).json(aux);
      }
    } catch (error) {
      res.status(401).json({ error: [error.message] });
    }
  },
  logout: (req, res) => {
    res.cookie("toke", "", {
      expires: new Date(0),
    });
    return res.status(200).send("Logout");
  },
  profile: async (req, res) => {
    try {
      const aux = await auth.profile(req.user.id);
      return res.status(200).json(aux);
    } catch (error) {
      return res.status(500).json({ message: [error.message] });
    }
  },
  verifyToken: async (req, res) => {
    const { token } = req.cookies;
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    jwt.verify(token, process.env.TOKEN_SECRET, async (err, user) => {
      if (err) return res.status(401).json({ message: "Unauthorized" });

      const userFound = await User.findByPk(user.id);
      if (!userFound) return res.status(401).json({ message: "Unauthorized" });

      return res.json({
        id: userFound.id,
        username: userFound.name,
        email: userFound.email,
      });
    });
  },
};
