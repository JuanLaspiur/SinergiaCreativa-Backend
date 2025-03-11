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
 *               commissions:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     number:
 *                       type: number
 *                     percentage:
 *                       type: number
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
 *               commissions:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     number:
 *                       type: number
 *                     percentage:
 *                       type: number
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
