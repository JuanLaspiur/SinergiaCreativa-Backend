import express from 'express';
import userRoutes from './user.routes';
import productRoutes from './product.routes';
import commissionRoutes from './commission.routes'

const router = express.Router();

router.use(`/users`, userRoutes);
router.use(`/products`, productRoutes);
router.use(`/commissions`, commissionRoutes)
export default router;