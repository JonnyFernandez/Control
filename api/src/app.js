const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const route = require("./routes/routes");
const { swaggerSpec, swaggerUi } = require('../src/utils/swagger');


const server = express();

server.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

server.use(express.json());
server.use(cookieParser());
server.use(morgan("dev"));
server.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
server.use("/api", route);

module.exports = server;
