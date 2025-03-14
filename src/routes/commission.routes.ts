import express from 'express';
import * as CommissionController from '../controllers/commissionController';  

const router = express.Router();

/**
 * @swagger
 * /commissions:
 *   post:
 *     summary: Create a new commission
 *     description: Create a new commission in the system.
 *     tags:
 *       - Commissions
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               number:
 *                 type: number
 *                 description: The commission number.
 *                 example: 123
 *               percentage:
 *                 type: number
 *                 description: The commission percentage.
 *                 example: 5
 *     responses:
 *       201:
 *         description: Commission created successfully
 *       400:
 *         description: Bad request, invalid data
 *       500:
 *         description: Internal server error
 */
router.post('/', CommissionController.createCommission);

/**
 * @swagger
 * /commissions:
 *   get:
 *     summary: Get all commissions
 *     description: Retrieve all the commissions from the system.
 *     tags:
 *       - Commissions
 *     responses:
 *       200:
 *         description: A list of commissions
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   number:
 *                     type: number
 *                     description: Commission number.
 *                   percentage:
 *                     type: number
 *                     description: Commission percentage.
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     description: The timestamp when the commission was created.
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *                     description: The timestamp when the commission was last updated.
 *       500:
 *         description: Internal server error
 */
router.get('/', CommissionController.getAllCommissions);

/**
 * @swagger
 * /commissions/{id}:
 *   get:
 *     summary: Get a commission by ID
 *     description: Retrieve a commission based on its ID.
 *     tags:
 *       - Commissions
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the commission to fetch
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The commission
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 number:
 *                   type: number
 *                 percentage:
 *                   type: number
 *       404:
 *         description: Commission not found
 *       500:
 *         description: Internal server error
 */
router.get('/:id', CommissionController.getCommissionById);

/**
 * @swagger
 * /commissions/{id}:
 *   put:
 *     summary: Update a commission by ID
 *     description: Update the details of an existing commission.
 *     tags:
 *       - Commissions
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the commission to update
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
 *               number:
 *                 type: number
 *                 description: The commission number.
 *                 example: 123
 *               percentage:
 *                 type: number
 *                 description: The commission percentage.
 *                 example: 5
 *     responses:
 *       200:
 *         description: Commission updated successfully
 *       400:
 *         description: Invalid commission data
 *       404:
 *         description: Commission not found
 *       500:
 *         description: Internal server error
 */
router.put('/:id', CommissionController.updateCommission);

/**
 * @swagger
 * /commissions/{id}:
 *   delete:
 *     summary: Delete a commission by ID
 *     description: Delete a commission from the system.
 *     tags:
 *       - Commissions
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the commission to delete
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Commission deleted successfully
 *       404:
 *         description: Commission not found
 *       500:
 *         description: Internal server error
 */
router.delete('/:id', CommissionController.deleteCommission);

export default router;
