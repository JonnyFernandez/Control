const server = require("./src/app");
const { conn } = require("./src/db.js");
require("dotenv").config;

const PORT = process.env.PORT || 3001;
const swagger = `Swagger: http://localhost:3001/api-docs/`



// Syncing all the models at once.
conn.sync({ alter: true }).then(() => {

  server.listen(3001, () => {
    console.log(`% listening at ${PORT} || Swagger url: ${swagger}`);
  });
});
