import { Router } from 'express';
import * as ProductController from '../controllers/productController';

const router = Router();

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Obtiene todos los productos.
 *     responses:
 *       200:
 *         description: Una lista de productos.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   title:
 *                     type: string
 *                   description:
 *                     type: string
 *                   stock:
 *                     type: integer
 *                   image:
 *                     type: string
 *                   commissions:
 *                     type: array
 *                     items:
 *                       type: string
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 */
router.get('/', ProductController.getProducts);

/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: Obtiene un producto por ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID del producto a obtener.
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Un producto encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 title:
 *                   type: string
 *                 description:
 *                   type: string
 *                 stock:
 *                   type: integer
 *                 image:
 *                   type: string
 *                 commissions:
 *                   type: array
 *                   items:
 *                     type: string
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *       404:
 *         description: Producto no encontrado.
 */
router.get('/:id', ProductController.getProduct);

/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Crea un nuevo producto.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               stock:
 *                 type: integer
 *               image:
 *                 type: string
 *               commissions:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       201:
 *         description: Producto creado exitosamente.
 *       500:
 *         description: Error al crear el producto.
 */
router.post('/', ProductController.createNewProduct);

/**
 * @swagger
 * /api/products/{id}:
 *   put:
 *     summary: Actualiza un producto existente.
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID del producto a actualizar.
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               stock:
 *                 type: integer
 *               image:
 *                 type: string
 *               commissions:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Producto actualizado exitosamente.
 *       404:
 *         description: Producto no encontrado.
 *       500:
 *         description: Error al actualizar el producto.
 */
router.put('/:id', ProductController.updateExistingProduct);

/**
 * @swagger
 * /api/products/{id}:
 *   delete:
 *     summary: Elimina un producto.
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID del producto a eliminar.
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Producto eliminado exitosamente.
 *       404:
 *         description: Producto no encontrado.
 *       500:
 *         description: Error al eliminar el producto.
 */
router.delete('/:id', ProductController.deleteExistingProduct);

export default router;
