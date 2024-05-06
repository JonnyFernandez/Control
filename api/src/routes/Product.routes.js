const { Router } = require("express");
const handleProd = require("../handlers/productHandler");
const validateToken = require("../middlewares/validateToken");
const { postProdSchema, updateProdSchema } = require("../schemas/prod.schema");
const validateSchema = require("../middlewares/validator.Middleware");

const prod = Router();

// -----------------------------POST-CHAR----------------------------------------------------------
// Esquema para la validación creacion de personajes
/**
 * @swagger
 * components:
 *   schemas:
 *     postProdSchema:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         image:
 *           type: string
 *         description:
 *           type: string
 *         brand:
 *           type: string
 *         distributor:
 *           type: string
 *         stock:
 *           type: number
 *         cost:
 *           type: number
 *         off:
 *           type: number
 *         category:
 *           type: string
 *         iva:
 *           type: number
 *         iibb:
 *           type: number
 *         others:
 *           type: number
 *         gain:
 *           type: number
 *       required:
 *         - name
 *         - stock
 *         - cost
 *         - off
 *         - category
 *         - iva
 *         - iibb
 *         - others
 *         - gain
 */
/**
 * @swagger
 * /api/prod:
 *   post:
 *     summary: Ingresar Producto
 *     description: Ingresar Producto.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/postProdSchema'
 *     responses:
 *       200:
 *         description: Usuario registrado exitosamente
 *       400:
 *         description: Error en la solicitud o usuario ya existente
 */
prod.post("/", [validateToken.authRequire], validateSchema(postProdSchema), [handleProd.create]);
/**
 * @swagger
 * /api/prod:
 *   get:
 *     summary: Obtener todos los Productos o buscar por nombre
 *     description: Obtiene todos los Productos registrados o filtra por nombre si se proporciona un parámetro de query.
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Nombre del producto para buscar.
 *     responses:
 *       200:
 *         description: Lista de Productos obtenida exitosamente
 *       401:
 *         description: No autorizado (Token no válido)
 */
prod.get("/", [handleProd.getAll]);

/**
 * @swagger
 * /api/prod/{id}:
 *   get:
 *     summary: Obtener Producto por su Codigo
 *     description: Obtener Producto por su Codigo.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Ingrese codigo Identificador de Producto 
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Personaje obtenido exitosamente
 *       401:
 *         description: No autorizado (Token no válido)
 */

prod.get("/:id", [handleProd.getByCode]); //get prod by id
/**
 * @swagger
 * /api/prod/{id}:
 *   put:
 *     summary: Actualizar Producto
 *     description: Actualiza un Producto existente.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del Producto a actualizar.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/updateProdSchema'
 *     responses:
 *       200:
 *         description: Producto actualizado exitosamente
 *       400:
 *         description: Error en la solicitud o producto no encontrado
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     updateProdSchema:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         image:
 *           type: string
 *         description:
 *           type: string
 *         brand:
 *           type: string
 *         distributor:
 *           type: string
 *         stock:
 *           type: number
 *         cost:
 *           type: number
 *         off:
 *           type: number
 *         category:
 *           type: string
 *         iva:
 *           type: number
 *         iibb:
 *           type: number
 *         others:
 *           type: number
 *         gain:
 *           type: number
 *       required: []
 */
prod.put("/:id", [validateToken.authRequire], validateSchema(updateProdSchema), [handleProd.update]);

/**
 * @swagger
 * /api/prod/category/{id}:
 *   put:
 *     summary: Descuento Por Categoria
 *     description: Actualiza y aplica descuento a toda una categoria de productos.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: false
 *         description: ID cualquira y numerico
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               off:
 *                 type: number
 *               category:
 *                 type: string
 *             required:
 *               - off
 *               - category
 *     responses:
 *       200:
 *         description: Producto actualizado exitosamente
 *       400:
 *         description: Error en la solicitud o producto no encontrado
 */
/**
components:
  schemas:
    updateProdSchema:
      type: object
      properties:
        off:
          type: number
        category:
          type: string
      required:
        - off
        - category
*/
prod.put("/category/:id", [validateToken.authRequire], [handleProd.updateByCategory]);
/**
 * @swagger
 * /api/prod/addPorcent/{id}:
 *   put:
 *     summary: Agregar Porcentaje
 *     description: Agrega porcentaje al precio base de toda una categoria de productos.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: false
 *         description: ID cualquira y numerico
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               percent:
 *                 type: number
 *               category:
 *                 type: string
 *             required:
 *               - percent
 *               - category
 *     responses:
 *       200:
 *         description: Producto actualizado exitosamente
 *       400:
 *         description: Error en la solicitud o producto no encontrado
 */
/**
components:
  schemas:
    updateProdSchema:
      type: object
      properties:
        percent:
          type: number
        category:
          type: string
      required:
        - percent
        - category
*/
prod.put("/addPorcent/:id", [validateToken.authRequire], [handleProd.addPorcentToCost]);
/**
 * @swagger
 * /api/prod/{id}:
 *   delete:
 *     summary: Eliminar Producto
 *     description: Elimina un Producto existente.
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
prod.delete("/:id", [validateToken.authRequire], [handleProd.delete]);



/**
 * @swagger
 * /api/prod/status/{id}:
 *   put:
 *     summary: Cambiar Estado
 *     description: Cambiar el estado de un producto.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Ingrese codigo Identificador de Producto 
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Personaje obtenido exitosamente
 *       401:
 *         description: No autorizado (Token no válido)
 */
prod.put("/status/:id", [validateToken.authRequire], [handleProd.updateStatus]);

module.exports = prod;
