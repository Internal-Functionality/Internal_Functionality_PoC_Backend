import { Router } from 'express';
import HealthRoutes from '../modules/health/health.routes';
import UserRoutes from '../act-requesters-hu6/routes/user.routes';

const router = Router();

router.use('/api', HealthRoutes);
router.use('/api', UserRoutes);

router.use((req, res) => {
  console.log('Not found:', req.method, req.originalUrl);
  res.status(404).send({
    message: 'route not found',
  });
});

export default router;
