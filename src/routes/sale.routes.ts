import express from 'express';
import * as SaleController from '../controllers/saleController';

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Sale:
 *       type: object
 *       properties:
 *         product:
 *           type: string
 *           description: ID del producto asociado a la venta.
 *           example: 64c11d2e5a9b4e001cdeabcd
 *         userId:
 *           type: string
 *           description: ID del usuario que realizó la venta.
 *           example: 64c11d2e5a9b4e001cde1234
 *         total:
 *           type: number
 *           description: Monto total de la venta.
 *           example: 150.75
 *         date:
 *           type: string
 *           format: date-time
 *           description: Fecha de la venta.
 *           example: 2024-08-11T12:00:00.000Z
 */

/**
 * @swagger
 * /api/sales:
 *   post:
 *     summary: Crear una nueva venta
 *     tags: [Sales]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Sale'
 *     responses:
 *       201:
 *         description: Venta creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Sale'
 *       500:
 *         description: Error al crear la venta
 */
router.post('/', SaleController.createSale);

/**
 * @swagger
 * /api/sales:
 *   get:
 *     summary: Obtener todas las ventas
 *     tags: [Sales]
 *     responses:
 *       200:
 *         description: Lista de ventas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Sale'
 *       500:
 *         description: Error al obtener las ventas
 */
router.get('/', SaleController.getAllSales);

/**
 * @swagger
 * /api/sales/{id}:
 *   get:
 *     summary: Obtener una venta por ID
 *     tags: [Sales]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la venta
 *     responses:
 *       200:
 *         description: Venta encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Sale'
 *       404:
 *         description: Venta no encontrada
 *       500:
 *         description: Error al obtener la venta
 */
router.get('/:id', SaleController.getSaleById);

/**
 * @swagger
 * /api/sales/{id}:
 *   put:
 *     summary: Actualizar una venta por ID
 *     tags: [Sales]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la venta
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Sale'
 *     responses:
 *       200:
 *         description: Venta actualizada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Sale'
 *       404:
 *         description: Venta no encontrada
 *       500:
 *         description: Error al actualizar la venta
 */
router.put('/:id', SaleController.updateSale);

/**
 * @swagger
 * /api/sales/{id}:
 *   delete:
 *     summary: Eliminar una venta por ID
 *     tags: [Sales]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la venta
 *     responses:
 *       200:
 *         description: Venta eliminada exitosamente
 *       404:
 *         description: Venta no encontrada
 *       500:
 *         description: Error al eliminar la venta
 */
router.delete('/:id', SaleController.deleteSale);

/**
 * @swagger
 * /api/sales/daily/{userId}:
 *   get:
 *     summary: Obtener las ventas del día de un usuario
 *     tags: [Sales]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Ventas del día obtenidas correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Sale'
 *       500:
 *         description: Error al obtener las ventas del día
 */
router.get('/daily/:userId', SaleController.getDailySales);

/**
 * @swagger
 * /api/sales/monthly/{userId}:
 *   get:
 *     summary: Obtener las ventas del mes de un usuario
 *     tags: [Sales]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Ventas del mes obtenidas correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Sale'
 *       500:
 *         description: Error al obtener las ventas del mes
 */
router.get('/monthly/:userId', SaleController.getMonthlySales);

/**
 * @swagger
 * /api/sales/user/{userId}:
 *   get:
 *     summary: Obtener todas las ventas de un usuario por su ID.
 *     tags: [Sales]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: ID del usuario para obtener sus ventas.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lista de ventas del usuario.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Sale'
 *       404:
 *         description: No se encontraron ventas para el usuario.
 *       500:
 *         description: Error al obtener las ventas.
 */
router.get('/user/:userId', SaleController.getSalesByUserId);

export default router;
