const { Router } = require("express");
const { registerSchema, loginSchema } = require("../schemas/auth.schema");
const validateSchema = require("../middlewares/validator.Middleware");
const handler = require("../handlers/authHandler");
const validateToken = require("../middlewares/validateToken");

require("../schemas/auth.schema");

const auth = Router();

// Esquema para la validación del registro de usuario
/**
 * @swagger
 * components:
 *   schemas:
 *     registerSchema:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *         password:
 *           type: string
 *         username:
 *           type: string
 *         type:
 *           type: string
 *       required:
 *         - email
 *         - password
 *         - username
 *         - type
 */

/**
 * @swagger
 * /api/register:
 *   post:
 *     summary: Registro de usuario
 *     description: Crea un nuevo usuario en la DB.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/registerSchema'
 *     responses:
 *       200:
 *         description: Usuario registrado exitosamente
 *       400:
 *         description: Error en la solicitud o usuario ya existente
 */

auth.post("/register", validateSchema(registerSchema), [handler.register]);
/**
 * @swagger
 * components:
 *   schemas:
 *     loginSchema:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *         password:
 *           type: string
 *       required:
 *         - email
 *         - password 
 */

/**
 * @swagger
 * /api/login:
 *   post:
 *     summary: Inicio de sesión
 *     description: Inicia sesión con las credenciales proporcionadas en el registro de usuarios.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/loginSchema'
 *     responses:
 *       200:
 *         description: Inicio de sesión exitoso
 *       401:
 *         description: Credenciales inválidas
 */

auth.post("/login", validateSchema(loginSchema), [handler.login]);

/**
 * @swagger
 * /api/logout:
 *   post:
 *     summary: Cierre de sesión
 *     description: Cierra la sesión del usuario actual.
 *     responses:
 *       200:
 *         description: Sesión cerrada exitosamente
 */
auth.post("/logout", [handler.logout]);

/**
 * @swagger
 * /api/profile:
 *   get:
 *     summary: Perfil de usuario
 *     description: Obtiene el perfil del usuario autenticado.
 *     responses:
 *       200:
 *         description: Perfil del usuario obtenido exitosamente
 *       401:
 *         description: No autorizado (Token no válido)
 */
auth.get("/profile", [validateToken.authRequire], [handler.profile]);

/**
 * @swagger
 * /api/verify:
 *   get:
 *     summary: Verificación de token
 *     description: Verifica la validez del token de autenticación.
 *     responses:
 *       200:
 *         description: Token válido
 *       401:
 *         description: Token no válido
 */
auth.get("/verify", [handler.verifyToken]);

module.exports = auth;
