const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const path = require('path');




const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Marelys API',
            version: '1.0.0',
            description: 'Descripción de tu API',
        },
    },

    apis: [
        path.join(__dirname, '../routes/auth.routes.js'),
        path.join(__dirname, '../routes/Product.routes.js'),
        path.join(__dirname, '../routes/review.routes.js'),
        path.join(__dirname, '../routes/like.routes.js'),
        path.join(__dirname, '../routes/cart.routes.js'),
        path.join(__dirname, '../routes/ProductStatistics.routes.js'),
    ],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = { swaggerSpec, swaggerUi };
