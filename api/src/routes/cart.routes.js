const { Router } = require("express");
const handlerCart = require('../handlers/cartHandler')
const validateToken = require('../middlewares/validateToken')
const { shoppingCartSchema } = require('../schemas/shoppingCart.schema')
const validateSchema = require('../middlewares/validator.Middleware')

const cart = Router()

/**
 * @swagger
 * /api/cart:
 *   post:
 *     summary: Crear un carrito de compras
 *     description: Crea un nuevo carrito de compras con los artículos proporcionados.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/shoppingCartSchema'
 *     responses:
 *       200:
 *         description: Carrito creado exitosamente
 *       400:
 *         description: Error en la solicitud o datos de carrito inválidos
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     shoppingCartSchema:
 *       type: object
 *       properties:
 *        
 *         items:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               id:
 *                 type: number
 *               count:
 *                 type: number
 *       required:
 *         - items
 *        
 */
cart.post('/', [validateToken.authRequire], validateSchema(shoppingCartSchema), [handlerCart.createCart])
/**
 * @swagger
 * /api/cart:
 *   get:
 *     summary: Shoppings Carts  
 *     description: Obtiene todos los cart creados.
 *     responses:
 *       200:
 *         description: Lista de personajes obtenida exitosamente
 *       401:
 *         description: No autorizado (Token no válido)
 */

cart.get('/', [validateToken.authRequire], [handlerCart.getCart])
/**
 * @swagger
 * /api/cart/{code}:
 *   get:
 *     summary: Obtener Shopping Cart por su Codigo
 *     description: Obtener Shopping Cart por su Codigo.
 *     parameters:
 *       - in: path
 *         name: code
 *         description: Identificador del personaje (puede ser número entero o cadena)
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Personaje obtenido exitosamente
 *       401:
 *         description: No autorizado (Token no válido)
 */
cart.get('/:code', [validateToken.authRequire], [handlerCart.codeCart])

/**
 * @swagger
 * /api/cart/{id}:
 *   delete:
 *     summary: Eliminar Shopping Cart
 *     description: Elimina una Shopping Cart existente.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del Producto a eliminar.
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Producto eliminado exitosamente
 *       400:
 *         description: Error en la solicitud o producto no encontrado
 *       401:
 *         description: No autorizado (Token no válido)
 */
cart.delete('/:id', [validateToken.authRequire], [handlerCart.deleteCart])



module.exports = cart