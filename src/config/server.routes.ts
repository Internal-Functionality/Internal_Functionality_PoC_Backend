import { Router } from 'express';
import HealthRoutes from '../modules/health/health.routes';

const router = Router();

router.use('/api', HealthRoutes);

router.use((req, res) => {
  console.log('Not found:', req.method, req.originalUrl);
  res.status(404).send({
    message: 'route not found',
  });
});

export default router;
