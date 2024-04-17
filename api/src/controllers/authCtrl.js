const { User } = require("../db");
const bcrypt = require("bcryptjs");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const transporter = require("../utils/mailer");

module.exports = {
  register: async (name, email, password, type) => {
    const userFound = await User.findOne({ where: { email } });

    if (userFound) throw new Error("the email already exist");
    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      email,
      password: passwordHash,
      name,
      type
    });
    //-----------------------------------------------------------------------------------

    await transporter.sendMail({
      from: '"Marelys" <arcancode@gmail.com>',
      to: email,
      subject: "¡Ditribuidora Marelys! ✔",
      html: `
          <html>
              <head>
                  <style>
                      body {
                          font-family: 'Arial', sans-serif;
                          background-color: #f0f0f0;
                          color: #333;
                      }
                      .container {
                          max-width: 600px;
                          margin: 20px auto;
                          padding: 20px;
                          background-color: #fff;
                          border-radius: 8px;
                          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                      }
                      h1 {
                          color: #4285f4;
                      }
                      p {
                          line-height: 1.6;
                      }
                  </style>
              </head>
              <body>
                  <div class="container">
                      <h1>¡Bienvenido a Distribuidora Marelys!</h1>
                      <p>Hola</p>
                      <p>Estamos emocionados de tenerte como parte de nuestra comunidad. Explora nuestra variedad de productos, Bueno Bonito Barato.</p>
                      <p>¡Gracias por unirte!</p>
                      <p>Atentamente,<br>Jonny Fernandez <br> LinkedIn: ${"https://www.linkedin.com/in/jonathan-fernandez-65a959277/"} <br> Github: ${"https://github.com/JonnyFernandez"} <br> Portfolio: ${"https://portfolio-t79v.vercel.app/"} </p>
                  </div>
              </body>
          </html>
      `,
    });

    //-----------------------------------------------------------------------------------




    return {
      id: newUser.id,
      email: newUser.email,
      username: newUser.username,
      createdAt: newUser.createdAt,
      updatedAt: newUser.updatedAt,
    };
  },
  login: async (email, password) => {
    const userFound = await User.findOne({ where: { email } });
    if (!userFound) throw new Error("User not found");
    const isMatch = await bcrypt.compare(password, userFound.password);
    if (!isMatch) throw new Error("Password incorrect");

    return {
      id: userFound.id,
      email: userFound.email,
      username: userFound.username,
      createdAt: userFound.createdAt,
      updatedAt: userFound.updatedAt,
    };
  },
  profile: async (id) => {
    const userFound = await User.findByPk(id);

    if (!userFound) throw new Error("user not found");

    return {
      id: userFound.id,
      username: userFound.username,
      email: userFound.email,
      type: userFound.type,
      createdAt: userFound.createdAt,
      updatedAt: userFound.updatedAt,
    };
  },
  verifyToken: async (token) => {
    jwt.verify(token, process.env.TOKEN_SECRET, async (err, user) => {
      if (err) throw new Error("Unauthorized");

      const userFound = await User.findByPk(user.id);

      if (!userFound) throw new Error("Unauthorized");
      return "hola";
    });
  },
  // charger: async () => {
  //   const { email, name, password, type } = process.env
  //   const passwordHash = bcrypt.hash(password, 10);

  //   await User.findOrCreate({
  //     where: { email }, // Especifica las opciones de búsqueda
  //     defaults: { name, email, password: passwordHash, type } // Especifica los valores a crear si no se encuentra ninguna coincidencia
  //   });
  //   return "User created successfully";
  // }

};
