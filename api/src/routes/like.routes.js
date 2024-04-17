const { Router } = require('express')
const handle = require('../handlers/likeHandler')
const validateToken = require('../middlewares/validateToken')
const { likeSchema } = require('../schemas/like.schema')
const validateSchema = require('../middlewares/validator.Middleware')
const like = Router()


/**
 * @swagger
 * /api/like:
 *   post:
 *     summary: Like a Producto
 *     description: Like a Producto ingresando su id.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/likeSchema'
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
 *     likeSchema:
 *       type: object
 *       properties:
 *         prodId:
 *           type: number
 *           required: true
 */


like.post('/', [validateToken.authRequire], validateSchema(likeSchema), [handle.createLike])

/**
 * @swagger
 * /api/like/{id}:
 *   delete:
 *     summary: Eliminar Producto
 *     description: Elimina un Producto existente.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del Like a eliminar.
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
like.delete('/:id', [validateToken.authRequire], [handle.removeLike])


module.exports = like