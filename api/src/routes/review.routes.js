const { Router } = require("express");
const handle = require('../handlers/reviewHandle')
const validateToken = require('../middlewares/validateToken')
const validateSchema = require('../middlewares/validator.Middleware')
const { reviewSchema } = require('../schemas/review.schema')


const review = Router()
/**
 * @swagger
 * /api/review:
 *   post:
 *     summary:  Reviews
 *     description: Producto{"review":"string", "productId":number}, Page{"review":"string"}.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/reviewSchema'
 *     responses:
 *       200:
 *         description: Like registrado exitosamente
 *       400:
 *         description: Error en la solicitud o producto no encontrado
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     reviewSchema:
 *       type: object
 *       properties:
 *         review:
 *           type: string
 *         productId:
 *           type: number
 *           required: false
 */

review.post('/', [validateToken.authRequire], validateSchema(reviewSchema), [handle.createReview])

/**
 * @swagger
 * /api/review:
 *   get:
 *     summary: Obtener todas Reviews 
 *     description: Obtiene totas las reviews creadas.
 *     responses:
 *       200:
 *         description: Lista de personajes obtenida exitosamente
 *       401:
 *         description: No autorizado (Token no válido)
 */
review.get('/', [handle.getReview])

/**
 * @swagger
 * /api/review/{id}:
 *   delete:
 *     summary: Eliminar Review
 *     description: Elimina un Producto existente.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del Review a eliminar.
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
review.delete('/:id', [validateToken.authRequire], [handle.removeReview])




module.exports = review