import express from 'express';
import userRoutes from './user.routes';
import productRoutes from './product.routes';
import commissionRoutes from './commission.routes'
import saleRoutes from './sale.routes'

const router = express.Router();

router.use(`/users`, userRoutes);
router.use(`/products`, productRoutes);
router.use(`/commissions`, commissionRoutes);
router.use(`/sales`, saleRoutes);
export default router;