import { Router } from 'express';
const router = Router();

import newsRoutes from './newsRoutes.js';
import userRoutes from './userRoutes.js';
import searchRoutes from './searchRoutes.js'


router.use('/news', newsRoutes);
router.use('/users', userRoutes);
router.use('/search', searchRoutes);

export default router;