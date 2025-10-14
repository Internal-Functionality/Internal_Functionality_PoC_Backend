import { Router } from 'express';
import HealthRoutes from '../modules/health/health.routes';
import search from '../act-request-hu4/routes/search.routes';
import UserRoutes from '../act-request-hu4/routes/user.routes';
import JobRoutes from '../act-request-hu4/routes/job.route';

const router = Router();

router.use('/', search);
router.use('/', UserRoutes);
router.use('/', JobRoutes);
router.use('/api', HealthRoutes);

//..
router.use((req, res) => {
  console.log('Not found:', req.method, req.originalUrl);
  res.status(404).send({
    message: 'route not found',
  });
});

export default router;
