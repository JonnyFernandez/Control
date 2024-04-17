const { Router } = require("express")
const handler = require('../handlers/statisticsHandler')


const ProductStatistics = Router()
/**
 * @swagger
 * /api/productStatistics:
 *   get:
 *     summary: Obtener Estadisticas 
 *     description: Obtiene una lista con los prod mas vendidos y con mas likes.
 *     responses:
 *       200:
 *         description: Lista de personajes obtenida exitosamente
 *       401:
 *         description: No autorizado (Token no válido)
 */

ProductStatistics.get('/', [handler.statistics])

module.exports = ProductStatistics